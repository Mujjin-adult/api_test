import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface AllProps {
  onCategoryChange?: (category: string) => void;
  availableCategories?: string[]; // 실제 존재하는 카테고리 목록
}

export default function All({ onCategoryChange, availableCategories }: AllProps) {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  // 기본 카테고리 목록
  const defaultCategories = [
    "학사",
    "학점교류",
    "일반/행사/모집",
    "장학금",
    "등록금 납부",
    "교육시험",
    "봉사",
    "채용정보",
  ];

  // 항상 기본 카테고리를 표시 (API에서 추가 카테고리가 있으면 병합)
  const categories = defaultCategories;

  const [selected, setSelected] = useState(categories[0]);

  // 카테고리 목록이 변경되면 첫 번째 카테고리 선택
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selected)) {
      setSelected(categories[0]);
      onCategoryChange?.(categories[0]);
    }
  }, [categories]);

  const handleCategoryPress = (category: string) => {
    setSelected(category);
    onCategoryChange?.(category);
  };

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        width: "100%",
        height: 49,
        backgroundColor: "white",
      }}
    >

      {/* 탭 바 (크기 고정) */}
      <View
        style={{
          width: "100%",
          height: 49, // 탭 바 높이
          backgroundColor: "#ffffff",
          borderBottomWidth: 1,
          borderBottomColor: "#bababa",
        }}
      >
        {/* 탭 바 안 카테고리 */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              height: 50, // 내부 row
            }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
              >
                <View
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                    borderBottomWidth: selected === category ? 4 : 0,
                    borderBottomColor: "#bababa",
                  }}
                >
                  <Text
                    style={{
                      fontFamily:
                        selected === category
                          ? "Pretendard-Bold"
                          : "Pretendard-Light",
                      color: selected === category ? "black" : "#555",
                      fontSize: 15,
                    }}
                  >
                    {category}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
