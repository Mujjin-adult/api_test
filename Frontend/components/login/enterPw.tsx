import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { registerUserToBackend } from "../../services/authAPI";

type RootStackParamList = {
  Login: undefined;
  EnterEmail: undefined;
  EnterPw: { email: string; name: string; studentId: string };
  EmailVerification: { email: string };
  Home: undefined;
  Detail: undefined;
  Search: undefined;
  Setting: undefined;
  Alert: undefined;
  Scrap: undefined;
};

type EnterPwScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EnterPw"
>;

type EnterPwScreenRouteProp = RouteProp<RootStackParamList, "EnterPw">;

export default function EnterPw() {
  const navigation = useNavigation<EnterPwScreenNavigationProp>();
  const route = useRoute<EnterPwScreenRouteProp>();
  const { email, name, studentId } = route.params;
  const { width } = Dimensions.get("window");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text.length > 0 && text.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }
    // Also validate the confirm password if it's not empty
    if (confirmPassword) {
      if (text !== confirmPassword) {
        setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (password !== text) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleContinue = async () => {
    // Manually trigger validation one last time before submitting
    let isPasswordValid = false;
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
      isPasswordValid = true;
    }

    let isConfirmPasswordValid = false;
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    } else {
      setConfirmPasswordError("");
      isConfirmPasswordValid = true;
    }

    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }

    setIsLoading(true);

    try {
      // Backend API 호출 - Firebase + DB 모두 처리
      const result = await registerUserToBackend(
        name,
        studentId,
        email,
        password,
        "미지정" // department - 추후 입력 가능
      );

      if (!result.success) {
        Alert.alert("회원가입 실패", result.message || "회원가입에 실패했습니다.");
        setIsLoading(false);
        return;
      }

      console.log("회원가입 성공:", result.data);
      Alert.alert(
        "회원가입 완료",
        "회원가입이 완료되었습니다. 로그인해주세요.",
        [
          {
            text: "확인",
            onPress: () => navigation.navigate("Login"),
          },
        ]
      );
    } catch (error) {
      console.error("회원가입 오류:", error);
      Alert.alert("오류", "회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 30,
        paddingTop: 60,
      }}
    >
      {/* 타이틀 */}
      <Text
        style={{
          fontFamily: "Pretendard-ExtraBold",
          fontSize: 20,
          color: "#000000",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        띠링인캠퍼스
      </Text>

      {/* 로고 이미지 */}
      <Image
        source={require("../../assets/images/Logo.png")}
        style={{
          width: 120,
          height: 120,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 50,
        }}
      />

      {/* 비밀번호 설정 텍스트 */}
      <Text
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: 24,
          color: "#333333",
          marginBottom: 40,
        }}
      >
        비밀번호 설정
      </Text>

      {/* 비밀번호 입력칸 */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: 14,
            color: "#333333",
            marginBottom: 8,
          }}
        >
          비밀번호
        </Text>
        <TextInput
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            borderWidth: 1,
            borderColor: passwordError ? "red" : "#DDDDDD",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: "#FAFAFA",
          }}
          placeholder="비밀번호를 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{passwordError}</Text>
        ) : null}
      </View>

      {/* 비밀번호 확인 입력칸 */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: 14,
            color: "#333333",
            marginBottom: 8,
          }}
        >
          비밀번호 확인
        </Text>
        <TextInput
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            borderWidth: 1,
            borderColor: confirmPasswordError ? "red" : "#DDDDDD",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: "#FAFAFA",
          }}
          placeholder="비밀번호를 다시 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          secureTextEntry
        />
        {confirmPasswordError ? (
          <Text style={{ color: "red", marginTop: 5 }}>
            {confirmPasswordError}
          </Text>
        ) : null}
      </View>

      {/* 회원가입 버튼 */}
      <TouchableOpacity
        onPress={handleContinue}
        disabled={isLoading}
        style={{
          backgroundColor: isLoading ? "#99BBFF" : "#3366FF",
          borderRadius: 10,
          paddingVertical: 15,
          alignItems: "center",
          marginBottom: 20,
          marginTop: 10,
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
            회원가입
          </Text>
        )}
      </TouchableOpacity>

      {/* 하단 문구 */}
      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          fontSize: width * 0.035,
          color: "#AAAAAA",
          textAlign: "center",
          position: "absolute",
          bottom: 70,
          width: "100%",
          alignSelf: "center",
        }}
      >
        INU Announcement Notification App
      </Text>

      <Text
        style={{
          fontFamily: "Pretendard-Regular",
          fontSize: width * 0.03,
          color: "#AAAAAA",
          textAlign: "center",
          position: "absolute",
          bottom: 40,
          width: "100%",
          alignSelf: "center",
        }}
      >
        ⓒ Team name
      </Text>
    </View>
  );
}
