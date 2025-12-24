import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { useFonts } from "expo-font";

type SignupStudentIdNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignupStudentId">;
type SignupStudentIdRouteProp = RouteProp<RootStackParamList, "SignupStudentId">;

const { width, height } = Dimensions.get("window");

// 반응형 크기 계산 함수
const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (size: number) => Math.min(size, width * (size / 400));

export default function SignupStudentIdScreen() {
  const navigation = useNavigation<SignupStudentIdNavigationProp>();
  const route = useRoute<SignupStudentIdRouteProp>();
  const { name } = route.params;
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  if (!fontsLoaded) return null;

  const handleContinue = () => {
    if (!studentId.trim()) {
      setError("학번을 입력해주세요.");
      return;
    }
    setError("");
    navigation.navigate("SignupDepartment", { name, studentId: studentId.trim() });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* 타이틀 */}
        <Text style={styles.title}>띠링인캠퍼스</Text>

        {/* 로고 이미지 */}
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
        />

        {/* 학번 입력 */}
        <Text style={styles.sectionTitle}>학번</Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="예: 202301601"
          placeholderTextColor="#AAAAAA"
          value={studentId}
          onChangeText={(text) => {
            setStudentId(text);
            if (text.trim()) setError("");
          }}
          keyboardType="number-pad"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* 계속하기 버튼 */}
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>계속하기</Text>
        </TouchableOpacity>

        {/* 하단 문구 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>INU Announcement Notification App</Text>
          <Text style={styles.footerSubText}>© DAON</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: responsiveWidth(8),
    paddingTop: responsiveHeight(6),
    paddingBottom: responsiveHeight(4),
    minHeight: height,
  },
  title: {
    fontFamily: "Pretendard-ExtraBold",
    fontSize: responsiveFontSize(20),
    color: "#000000",
    textAlign: "center",
    marginBottom: responsiveHeight(2),
  },
  logo: {
    width: Math.min(responsiveWidth(30), 120),
    height: Math.min(responsiveWidth(30), 120),
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: responsiveHeight(5),
  },
  sectionTitle: {
    fontFamily: "Pretendard-Bold",
    fontSize: responsiveFontSize(18),
    color: "#333333",
    marginBottom: responsiveHeight(2),
  },
  input: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(16),
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: "#FAFAFA",
    marginBottom: responsiveHeight(1),
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    fontFamily: "Pretendard-Regular",
    color: "red",
    fontSize: responsiveFontSize(13),
    marginBottom: responsiveHeight(1),
  },
  button: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.8),
    alignItems: "center",
    marginTop: responsiveHeight(1),
    width: "100%",
  },
  buttonText: {
    fontFamily: "Pretendard-Bold",
    fontSize: responsiveFontSize(16),
    color: "#FFFFFF",
  },
  footer: {
    position: "absolute",
    bottom: responsiveHeight(5),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(14),
    color: "#AAAAAA",
    textAlign: "center",
    marginBottom: responsiveHeight(1),
  },
  footerSubText: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(12),
    color: "#AAAAAA",
    textAlign: "center",
  },
});
