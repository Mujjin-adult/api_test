import { useFonts } from "expo-font";
import React from "react";
import { Image, Text, View } from "react-native";

export default function EmptyScrap() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/images/empty.png")}
        style={{ width: 40, height: 47, marginBottom: 20 }}
      />
      <Text
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: 25,
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 15,
        }}
      >
        저장한 공지가 없습니다
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          fontSize: 20,
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 5,
        }}
      >
        관심 있는 공지를 스크랩하여
      </Text>
      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          fontSize: 20,
          marginLeft: 50,
          marginRight: 50,
          marginBottom: 150,
        }}
      >
        언제든지 공지를 편하게 열람하세요!
      </Text>
    </View>
  );
}
