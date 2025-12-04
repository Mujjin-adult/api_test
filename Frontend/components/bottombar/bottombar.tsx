import { useFonts } from "expo-font";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface BottomBarProps {
  onTabPress?: (index: number) => void;
  activeTab?: number;
}

export default function BottomBar({ onTabPress, activeTab = 0 }: BottomBarProps) {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  const navItems = [
    { type: "image", src: require("../../assets/images/file.png") },
    { type: "image", src: require("../../assets/images/scrap.png") },
    {
      type: "image",
      src: require("../../assets/images/Logo.png"),
    },
    { type: "image", src: require("../../assets/images/search.png") },
    { type: "image", src: require("../../assets/images/menu2.png") },
  ];

  const reverseNavItems = [
    { type: "image", src: require("../../assets/images/file2.png") },
    {
      type: "image",
      src: require("../../assets/images/scrap2.png"),
    },
    {
      type: "image",
      src: require("../../assets/images/Logo.png"),
    },
    { type: "image", src: require("../../assets/images/search2.png") },
    { type: "image", src: require("../../assets/images/menu.png") },
  ];

  const itemNames = ["공지사항", "관심공지", "AI 챗봇", "검색", "메뉴"];

  if (!fontsLoaded) return null;
  return (
    <View style={{ flex: 0, backgroundColor: "white" }}>
      {/* 하단 탭바 */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          backgroundColor: "#3366FF",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {/* 탭바 안 메뉴들 */}
        {navItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => {
            onTabPress?.(index);
          }}>
            {item.type === "image" && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={
                    activeTab === index && reverseNavItems[index]
                      ? reverseNavItems[index].src
                      : item.src
                  }
                  style={{
                    width: index === 2 ? 40 : 30, // 로고만 40, 나머진 30
                    height: 30,
                    resizeMode: "contain",
                    shadowColor: "#000",
                    shadowOffset: { width: 3, height: 3 },
                    shadowOpacity: 0.25,
                    shadowRadius: 1,
                  }}
                />
                <Text
                  style={{
                    fontFamily: "Pretendard-Regular",
                    color: activeTab === index ? "#000000" : "#ffffff",
                    fontSize: 10,
                    textAlign: "center",
                    marginTop: 2,
                  }}
                >
                  {itemNames[index]}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
