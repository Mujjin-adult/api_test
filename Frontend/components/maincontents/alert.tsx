import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert as RNAlert, Platform, ActivityIndicator } from "react-native";
import { getToken, messaging } from "../../config/firebaseConfig";
import { updateUserKeywords } from "../../services/userAPI";
import { api } from "../../services/apiClient";

export default function Alert() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const categories = [
    "학사",
    "학점교류",
    "일반/행사/모집",
    "장학금",
    "등록금 납부",
    "교육시험",
    "봉사",
    "채용정보",
  ];

  const subCategories = [
    ["전체"],
    ["전체"],
    ["전체", "일반", "행사", "모집"],
    ["국가장학금", "교외장학금", "기타","국가근로장학금","교내 봉사장학금"],
    ["전체"],
    ["전체"],
    ["전체"],
    ["전체","모집중","마감"],
  ];

  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // FCM 토큰 가져오기
  useEffect(() => {
    if (Platform.OS === "web") {
      getFirebaseFCMToken();
    }
  }, []);

  const getFirebaseFCMToken = async () => {
    try {
      const vapidKey = "BBErLdE9tOoJ6FSI-89EIuR2MFdssTlXuzjp2jb3fVsOeAloxpSHrlvNcbiwjGXHs37vd467Pkqtkh_54psXoHU";
      const token = await getToken(messaging, { vapidKey });
      if (token) {
        console.log("FCM 토큰:", token);
        setFcmToken(token);
      }
    } catch (error) {
      console.error("FCM 토큰 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getAllCategories();
        console.log("Fetched Categories:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const toggleSubCategory = (categoryIndex: number, subCategory: string) => {
    const uniqueKey = `${categoryIndex}-${subCategory}`;
    setSelectedSubCategories((prev) =>
      prev.includes(uniqueKey)
        ? prev.filter((c) => c !== uniqueKey)
        : [...prev, uniqueKey]
    );
  };

  const handleSave = async () => {
    if (!fcmToken) {
      RNAlert.alert("오류", "FCM 토큰을 가져올 수 없습니다. 알림 권한을 확인해주세요.");
      return;
    }

    if (selectedSubCategories.length === 0) {
      RNAlert.alert("알림", "최소 하나 이상의 키워드를 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 선택된 키워드를 서버에 맞는 형식으로 변환
      const keywords = selectedSubCategories.map(key => {
        const [categoryIndex, subCategory] = key.split("-");
        return `${categories[parseInt(categoryIndex)]}-${subCategory}`;
      });

      console.log("저장할 키워드:", keywords);
      console.log("FCM 토큰:", fcmToken);

      const result = await updateUserKeywords(fcmToken, keywords);

      if (result.success) {
        RNAlert.alert("성공", result.message);
      } else {
        RNAlert.alert("실패", result.message);
      }
    } catch (error) {
      console.error("키워드 저장 오류:", error);
      RNAlert.alert("오류", "키워드 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#ffffffff",
      }}
    >
      <Text
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: 15,
          textAlign: "center",
          paddingVertical: 15,
          borderColor: "#D1D1D1",
          borderBottomWidth: 1,
        }}
      >
        알림 키워드 설정
      </Text>

      <View style={{ flex: 1 }}>
        {categories.map((category, index) => (
          <View
            key={index}
            style={{
              borderBottomWidth: 1,
              borderColor: "#D1D1D1",
            }}
          >
            <View style={{ padding: 15 }}>
              <Text
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize:23,
                  color: "black",
                  marginBottom: 5,
                }}
              >
                {category}
              </Text>
              <View style={{ 
                flexDirection: "row", 
                flexWrap: "wrap", 
                marginTop: 10,
                gap: 15,
              }}>
                {subCategories[index].map((subCategory, subIndex) => {
                  const uniqueKey = `${index}-${subCategory}`;
                  return (
                    <TouchableOpacity
                      key={subIndex}
                      onPress={() => toggleSubCategory(index, subCategory)}
                      style={{
                        backgroundColor: selectedSubCategories.includes(uniqueKey) ? "#3366FF" : "#ffffff",
                        paddingHorizontal: 5,
                        paddingVertical: 2,
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: "#D1D1D1",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Pretendard-Regular",
                          fontSize: 17,
                          color: selectedSubCategories.includes(uniqueKey) ? "#ffffff" : "#555",
                        }}
                      >
                        {subCategory}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        ))}
      </View>

      {/* 저장 버튼 */}
      <View style={{
        padding: 20,
        backgroundColor: "#ffffff",
        borderTopWidth: 1,
        borderColor: "#D1D1D1",
      }}>
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? "#99BBFF" : "#3366FF",
            borderRadius: 10,
            paddingVertical: 15,
            alignItems: "center",
          }}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 16,
                color: "#FFFFFF",
              }}
            >
              저장
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
