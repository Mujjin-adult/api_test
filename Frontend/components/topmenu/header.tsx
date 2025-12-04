import { useFonts } from "expo-font";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Alert: undefined;
  [key: string]: any;
};

interface HeaderProps {
  showBackButton?: boolean;
  onAlertToggle?: () => void;
  onBackPress?: () => void;
  isAlertOpen?: boolean;
}

export default function Header({
  showBackButton = false,
  onAlertToggle,
  onBackPress,
  isAlertOpen = false,
}: HeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
  });

  const handleBellClick = () => {
    if (onAlertToggle) {
      onAlertToggle();
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {/* 헤더 영역 */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          backgroundColor: "#3366FF",
          paddingTop: 60,
          paddingBottom: 10,
          justifyContent: "space-between",
          paddingHorizontal: 30,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {showBackButton ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={{
                padding: 10,
                marginLeft: -20,
              }}
            >
              <Image
                source={require("../../assets/images/back.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
          <TouchableOpacity
            onPress={handleBellClick}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            style={{
              padding: 10,
            }}
          >
            <Image
              source={
                isAlertOpen
                  ? require("../../assets/images/종2.png")
                  : require("../../assets/images/종.png")
              }
              style={{
                marginRight: -20,
                width: 20,
                height: 25,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            color: "#FFFFFF",
            fontFamily: "Pretendard-SemiBold",
            fontSize: 20,
            textAlign: "center",
          }}
          pointerEvents="none"
        >
          띠링인캠퍼스
        </Text>
      </View>
    </View>
  );
}
