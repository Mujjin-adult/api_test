import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type RootStackParamList = {
  Login: undefined;
  EnterEmail: undefined;
  EnterPw: { email: string; name: string; studentId: string };
  Home: undefined;
  Detail: undefined;
  Search: undefined;
  Setting: undefined;
  Alert: undefined;
  Scrap: undefined;
};

type EnterEmailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EnterEmail"
>;

export default function EnterEmail() {
  const navigation = useNavigation<EnterEmailScreenNavigationProp>();
  const { width } = Dimensions.get("window");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [nameError, setNameError] = useState("");
  const [studentIdError, setStudentIdError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const validateName = (text: string) => {
    if (!text) {
      setNameError("이름을 입력해주세요.");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateStudentId = (text: string) => {
    if (!text) {
      setStudentIdError("학번을 입력해주세요.");
      return false;
    }
    setStudentIdError("");
    return true;
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!text || !emailRegex.test(text)) {
      setEmailError("유효한 이메일 주소를 입력해주세요.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleContinue = () => {
    const isNameValid = validateName(name);
    const isStudentIdValid = validateStudentId(studentId);
    const isEmailValid = validateEmail(email);

    if (!isNameValid || !isStudentIdValid || !isEmailValid) {
      return;
    }

    // 데이터를 다음 화면으로 전달
    navigation.navigate("EnterPw", { email, name, studentId });
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

      {/* 회원가입 텍스트 */}
      <Text
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: 24,
          color: "#333333",
          marginBottom: 30,
        }}
      >
        회원가입
      </Text>

      {/* 이름 입력칸 */}
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: 14,
            color: "#333333",
            marginBottom: 8,
          }}
        >
          이름
        </Text>
        <TextInput
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            borderWidth: 1,
            borderColor: nameError ? "red" : "#DDDDDD",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: "#FAFAFA",
          }}
          placeholder="이름을 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateName(text);
          }}
        />
        {nameError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{nameError}</Text>
        ) : null}
      </View>

      {/* 학번 입력칸 */}
      <View style={{ marginBottom: 15 }}>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: 14,
            color: "#333333",
            marginBottom: 8,
          }}
        >
          학번
        </Text>
        <TextInput
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            borderWidth: 1,
            borderColor: studentIdError ? "red" : "#DDDDDD",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: "#FAFAFA",
          }}
          placeholder="학번을 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={studentId}
          onChangeText={(text) => {
            setStudentId(text);
            validateStudentId(text);
          }}
          keyboardType="number-pad"
        />
        {studentIdError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{studentIdError}</Text>
        ) : null}
      </View>

      {/* 이메일 입력칸 */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: 14,
            color: "#333333",
            marginBottom: 8,
          }}
        >
          이메일
        </Text>
        <TextInput
          style={{
            fontFamily: "Pretendard-Regular",
            fontSize: 16,
            borderWidth: 1,
            borderColor: emailError ? "red" : "#DDDDDD",
            borderRadius: 10,
            paddingHorizontal: 15,
            paddingVertical: 12,
            backgroundColor: "#FAFAFA",
          }}
          placeholder="이메일을 입력하세요"
          placeholderTextColor="#AAAAAA"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateEmail(text);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? (
          <Text style={{ color: "red", marginTop: 5 }}>{emailError}</Text>
        ) : null}
      </View>

      {/* 계속하기 버튼 */}
      <TouchableOpacity
        onPress={handleContinue}
        style={{
          backgroundColor: "#3366FF",
          borderRadius: 10,
          paddingVertical: 15,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: 16,
            color: "#FFFFFF",
          }}
        >
          계속하기
        </Text>
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
