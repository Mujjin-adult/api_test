import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, View, ScrollView, Alert as RNAlert, Platform, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, messaging } from "../../config/firebaseConfig";
import { updateUserKeywords } from "../../services/userAPI";
import { api } from "../../services/apiClient";
import {
  getDetailCategories,
  updateDetailCategorySubscriptions,
  DetailCategoryResponse,
  DetailCategorySubscription,
} from "../../services/preferenceAPI";

export default function Alert() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const [detailCategories, setDetailCategories] = useState<DetailCategoryResponse[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingCategories, setIsFetchingCategories] = useState(true);

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

  // 상세 카테고리 불러오기
  useEffect(() => {
    loadDetailCategories();
  }, []);

  const loadDetailCategories = async () => {
    try {
      setIsFetchingCategories(true);
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        RNAlert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      const response = await getDetailCategories(token);
      if (response.success && response.data) {
        setDetailCategories(response.data);
        // 이미 구독된 카테고리 ID 설정
        const subscribedIds = response.data
          .filter((cat) => cat.subscribed)
          .map((cat) => cat.id);
        setSelectedCategoryIds(subscribedIds);
      }
    } catch (error) {
      console.error("상세 카테고리 불러오기 오류:", error);
      RNAlert.alert("오류", "카테고리 정보를 불러올 수 없습니다.");
    } finally {
      setIsFetchingCategories(false);
    }
  };

  const toggleCategory = (categoryId: number) => {
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        RNAlert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      // 모든 카테고리에 대해 구독 상태 설정
      const subscriptions: DetailCategorySubscription[] = detailCategories.map((cat) => ({
        detailCategoryId: cat.id,
        enabled: selectedCategoryIds.includes(cat.id),
      }));

      const response = await updateDetailCategorySubscriptions(subscriptions, token);

      if (response.success) {
        RNAlert.alert("성공", "알림 설정이 저장되었습니다.");
        // 최신 상태로 다시 로드
        await loadDetailCategories();
      } else {
        RNAlert.alert("실패", response.message || "알림 설정 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("알림 설정 저장 오류:", error);
      RNAlert.alert("오류", "알림 설정 저장 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) return null;

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
        알림 카테고리 설정
      </Text>

      {isFetchingCategories ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 50,
          }}
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
            카테고리 불러오는 중...
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {detailCategories.length === 0 ? (
            <View
              style={{
                padding: 20,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: 14,
                  color: "#999",
                }}
              >
                사용 가능한 카테고리가 없습니다.
              </Text>
            </View>
          ) : (
            detailCategories.map((category) => (
              <View
                key={category.id}
                style={{
                  borderBottomWidth: 1,
                  borderColor: "#D1D1D1",
                  padding: 15,
                }}
              >
                <TouchableOpacity
                  onPress={() => toggleCategory(category.id)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: 17,
                      color: "#333",
                      flex: 1,
                    }}
                  >
                    {category.name}
                  </Text>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 4,
                      borderWidth: 2,
                      borderColor: selectedCategoryIds.includes(category.id)
                        ? "#3366FF"
                        : "#D1D1D1",
                      backgroundColor: selectedCategoryIds.includes(category.id)
                        ? "#3366FF"
                        : "#ffffff",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {selectedCategoryIds.includes(category.id) && (
                      <Text style={{ color: "#ffffff", fontSize: 16 }}>✓</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      )}

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
