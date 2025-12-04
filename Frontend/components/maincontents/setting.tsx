import { useFonts } from "expo-font";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Setting() {
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const userName = "홍길동";
  const userMajor = "컴퓨터공학과";
  const userStID = "25학번";
  const userEmail = "s6452@inu.ac.kr";
  const category = ["계정", "앱 설정", "이용 안내", "기타"];
  const images = [
    require("../../assets/images/person.png"),
    require("../../assets/images/setting.png"),
    require("../../assets/images/paper.png"),
    require("../../assets/images/plus.png"),
  ];
  const accont = ["1. 내 정보", "2. 로그아웃", "3. 회원 탈퇴"];
  const appSetting = ["1. 나만의 공지 텝 설정", "2. 화면모드", "3. 알림 설정"];
  const guide = ["1. 서비스 이용 약관", "2. 문의하기", "3. 앱 소개"];
  const plus = ["1. 개인정보 처리 방침", "앱 버전"];

  const subArrays = [accont, appSetting, guide, plus];

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={{ flex: 1 }}>
      {/* 상단 유저 정보 요약 */}
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 2,
          borderColor: "#BDBDBD",
          paddingBottom: 20,
          marginBottom: 10,
        }}
      >
        <Image
          source={require("../../assets/images/ID_card.png")}
          style={{
            width: 50,
            height: 50,
            resizeMode: "contain",
            marginRight: 15,
          }}
        />
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: 20,
                color: "#000",
              }}
            >
              {userName}
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                color: "#BDBDBD",
                fontSize: 20,
                marginHorizontal: 10,
              }}
            >
              |
            </Text>
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                color: "#BDBDBD",
                fontSize: 15,
              }}
            >
              {userMajor} {userStID}
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              marginLeft: 10,
              color: "#BDBDBD",
              fontSize: 15,
            }}
          >
            {userEmail}
          </Text>
        </View>
      </View>

      {/* 설정 카테고리 리스트 */}
      <View style={{ padding: 10, paddingBottom: 100 }}>
        {category.map((categoryItem, index) => (
          <View key={index} style={{ marginBottom: 30 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 15,
                paddingLeft: 10,
              }}
            >
              {images[index] && (
                <Image
                  source={images[index]}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    marginRight: 15,
                  }}
                />
              )}
              <Text
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: 15,
                  color: "#000000",
                }}
              >
                {categoryItem}
              </Text>
            </View>

            {/* 하위 항목들을 항상 표시 */}
            <View style={{}}>
              {subArrays[index].map((subItem, subIndex) => (
                <TouchableOpacity
                  key={subIndex}
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  onPress={() =>
                    console.log(`${categoryItem} - ${subItem} 클릭됨`)
                  }
                >
                  <Text
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: 13,
                      color: "#000000",
                      flex: 1,
                    }}
                  >
                    {subItem}
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "#000000",
                      marginRight: 10,
                    }}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
