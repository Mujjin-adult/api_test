import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Notice, searchNotices } from "../../services/crawlerAPI";

export default function Search() {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Notice[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchText.trim()) {
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    try {
      const result = await searchNotices(searchText.trim());
      if (result.success) {
        setSearchResults(result.data);
      } else {
        console.error("검색 실패:", result.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("검색 오류:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleNoticePress = (notice: Notice) => {
    (navigation as any).navigate("detail", { notice });
  };

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 15 }}>
      {/* 검색 인풋 박스 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#BDBDBD",
          paddingHorizontal: 15,
          paddingVertical: 10,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/images/search.png")} // 검색 아이콘
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            tintColor: "#999",
          }}
        />
        <TextInput
          style={{
            flex: 1,
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            color: "#000",
          }}
          placeholder="공지사항, 대학교 정보 검색"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText("")}>
            <Image
              source={require("../../assets/images/close.png")} // X 아이콘
              style={{
                width: 15,
                height: 15,
              }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* 검색 결과 영역 */}
      {isSearching ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#3366FF" />
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginTop: 10,
              color: "#666",
            }}
          >
            검색 중...
          </Text>
        </View>
      ) : !hasSearched ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
          }}
        >
          <Text
            style={{
              fontFamily: "Pretendard-Light",
              fontSize: 16,
              color: "#999",
            }}
          >
            검색어를 입력해주세요
          </Text>
        </View>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {searchResults.length > 0 ? (
            <>
              <Text
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: 14,
                  color: "#666",
                  marginBottom: 15,
                }}
              >
                검색 결과 {searchResults.length}개
              </Text>

              {searchResults.map((notice) => (
                <TouchableOpacity
                  key={notice.id}
                  onPress={() => handleNoticePress(notice)}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    marginBottom: 10,
                    elevation: 2,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: 15,
                      color: "#000000",
                      marginBottom: 8,
                    }}
                    numberOfLines={2}
                  >
                    {notice.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: 12,
                        color: "#666",
                      }}
                    >
                      {new Date(
                        notice.date || notice.publishedAt
                      ).toLocaleDateString("ko-KR")}
                    </Text>
                    {notice.category && (
                      <Text
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: 11,
                          color: "#ffffff",
                          marginLeft: 8,
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                          backgroundColor: "#8e8e8e",
                        }}
                      >
                        {notice.category}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 100,
              }}
            >
              <Text
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: 16,
                  color: "#999",
                }}
              >
                "{searchText}"에 대한 검색 결과가 없습니다
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}
