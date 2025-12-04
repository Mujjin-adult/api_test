import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Notice } from "../services/crawlerAPI";

interface BookmarkContextType {
  bookmarkedNotices: Notice[];
  bookmarkedIds: string[];
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (notice: Notice) => Promise<void>;
  addBookmark: (notice: Notice) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const BOOKMARK_STORAGE_KEY = "bookmarkedNotices";

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarkedNotices, setBookmarkedNotices] = useState<Notice[]>([]);

  // 앱 시작 시 저장된 북마크 불러오기
  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const saved = await AsyncStorage.getItem(BOOKMARK_STORAGE_KEY);
      if (saved) {
        setBookmarkedNotices(JSON.parse(saved));
      }
    } catch (error) {
      console.error("북마크 불러오기 오류:", error);
    }
  };

  const saveBookmarks = async (notices: Notice[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(notices));
    } catch (error) {
      console.error("북마크 저장 오류:", error);
    }
  };

  const bookmarkedIds = bookmarkedNotices.map((n) => n.id);

  const isBookmarked = (id: string) => {
    return bookmarkedIds.includes(id);
  };

  const toggleBookmark = async (notice: Notice) => {
    if (isBookmarked(notice.id)) {
      await removeBookmark(notice.id);
    } else {
      await addBookmark(notice);
    }
  };

  const addBookmark = async (notice: Notice) => {
    if (!isBookmarked(notice.id)) {
      const updated = [...bookmarkedNotices, notice];
      setBookmarkedNotices(updated);
      await saveBookmarks(updated);
    }
  };

  const removeBookmark = async (id: string) => {
    const updated = bookmarkedNotices.filter((n) => n.id !== id);
    setBookmarkedNotices(updated);
    await saveBookmarks(updated);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarkedNotices,
        bookmarkedIds,
        isBookmarked,
        toggleBookmark,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error("useBookmark must be used within a BookmarkProvider");
  }
  return context;
}
