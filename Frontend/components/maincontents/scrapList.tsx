import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React from "react";
import {
  Image,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useBookmark } from "../../context/BookmarkContext";
import { Notice } from "../../services/crawlerAPI";

export default function ScrapList() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const navi = useNavigation();
  const { bookmarkedNotices, isBookmarked, toggleBookmark } = useBookmark();

  const handleTitlePress = (notice: Notice) => {
    (navi as any).navigate("Detail", { notice });
  };

  const handleBookmark = async (notice: Notice) => {
    try {
      const wasBookmarked = isBookmarked(notice.id);
      await toggleBookmark(notice);
      alert(wasBookmarked ? "북마크에서 제거되었습니다." : "북마크에 추가되었습니다.");
    } catch (error) {
      console.error("북마크 처리 중 오류:", error);
    }
  };

  const handleShare = async (title: string) => {
    try {
      await Share.share({
        message: `${title}\n\n띠링인캠퍼스에서 확인하세요!`,
        title: title,
      });
    } catch (error) {
      console.error("공유 오류:", error);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: 16,
            marginTop: 15,
            marginBottom: 10,
            marginLeft: 15,
          }}
        >
          저장한 공지 ({bookmarkedNotices.length})
        </Text>

        <View
          style={{
            gap: 10,
            paddingHorizontal: 15,
          }}
        >
          {bookmarkedNotices.map((notice) => (
            <TouchableOpacity
              key={notice.id}
              onPress={() => handleTitlePress(notice)}
            >
              <View
                style={{
                  width: "100%",
                  height: 80,
                  backgroundColor: "#ffffff",
                  borderRadius: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  elevation: 4,
                  marginHorizontal: 2,
                  marginVertical: 2,
                }}
              >
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {notice.isImportant && (
                      <Text
                        style={{
                          fontFamily: "Pretendard-Bold",
                          fontSize: 12,
                          color: "#FF3B30",
                          marginRight: 4,
                        }}
                      >
                        [중요]
                      </Text>
                    )}
                    <Text
                      style={{
                        color: "#000000",
                        fontFamily: "Pretendard-Light",
                        fontSize: 15,
                        flex: 1,
                      }}
                      numberOfLines={1}
                    >
                      {notice.title}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: 10,
                      }}
                    >
                      {new Date(
                        notice.publishedAt || notice.date || new Date()
                      ).toLocaleDateString("ko-KR")}
                    </Text>
                    {(notice.categoryCode || notice.category) && (
                      <Text
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: 12,
                          color: "#ffffff",
                          marginLeft: 8,
                          paddingHorizontal: 4,
                          paddingTop: 1,
                          paddingBottom: 1,
                          lineHeight: 14,
                          borderRadius: 5,
                          backgroundColor: "#8e8e8e",
                        }}
                      >
                        {notice.categoryCode || notice.category}
                      </Text>
                    )}
                  </View>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleBookmark(notice);
                    }}
                    style={{ padding: 5 }}
                  >
                    <Image
                      source={
                        isBookmarked(notice.id)
                          ? require("../../assets/images/bookmark2.png")
                          : require("../../assets/images/bookmark.png")
                      }
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      handleShare(notice.title);
                    }}
                    style={{ padding: 5, marginLeft: 5 }}
                  >
                    <Image
                      source={require("../../assets/images/export.png")}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
