import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { getToken, messaging } from "../../config/firebaseConfig";
import { signInWithEmail } from "../../services/authAPI";
import { loginWithEmail } from "../../services/userSettingsAPI";
import { TokenService } from "../../services/tokenService";
import CustomModal from "../common/CustomModal";

type RootStackParamList = {
  Login: undefined;
  EnterEmail: undefined;
  SignupName: undefined;
  Home: undefined;
  Detail: undefined;
  Search: undefined;
  Setting: undefined;
  Alert: undefined;
  Scrap: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const { width, height } = Dimensions.get("window");

// 반응형 크기 계산 함수
const responsiveWidth = (percent: number) => (width * percent) / 100;
const responsiveHeight = (percent: number) => (height * percent) / 100;
const responsiveFontSize = (size: number) => Math.min(size, width * (size / 400));

export default function LoginMain() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });

  const showModal = (title: string, message: string, type: "success" | "error" | "info" | "warning") => {
    setModalConfig({ title, message, type });
    setModalVisible(true);
  };

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("../../assets/fonts/Pretendard-ExtraBold.ttf"),
    "Pretendard-ExtraLight": require("../../assets/fonts/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("../../assets/fonts/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  // Firebase FCM 토큰 받기 함수
  const getFirebaseFCMToken = async () => {
    try {
      const vapidKey =
        "BBErLdE9tOoJ6FSI-89EIuR2MFdssTlXuzjp2jb3fVsOeAloxpSHrlvNcbiwjGXHs37vd467Pkqtkh_54psXoHU";

      const token = await getToken(messaging, { vapidKey });

      if (token) {
        console.log("Firebase FCM 토큰:", token);
        setFcmToken(token);
        return token;
      } else {
        console.log("FCM 토큰을 가져올 수 없습니다. 알림 권한을 확인하세요.");
        showModal(
          "알림 권한 필요",
          "푸시 알림을 받으려면 브라우저에서 알림 권한을 허용해주세요.",
          "warning"
        );
      }
    } catch (error) {
      console.error("FCM 토큰 가져오기 실패:", error);
      showModal(
        "오류",
        `FCM 토큰을 가져오는 중 오류가 발생했습니다.`,
        "error"
      );
    }
  };

  useEffect(() => {
    if (Platform.OS === "web") {
      getFirebaseFCMToken();
    }
  }, []);

  if (!fontsLoaded) return null;

  const handleLogin = async () => {
    let isValid = true;
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
      isValid = false;
    } else if (!email.endsWith("@inu.ac.kr")) {
      setEmailError("학교 이메일(@inu.ac.kr)을 사용해주세요.");
      isValid = false;
    }
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      // 1. 백엔드 이메일/비밀번호 로그인
      const backendResult = await loginWithEmail(email, password, fcmToken || undefined);

      if (backendResult.success && backendResult.data) {
        // 토큰 저장
        if (backendResult.data.idToken) {
          await TokenService.saveToken(backendResult.data.idToken);
          console.log("Backend 토큰 저장 완료");
        }
        // 사용자 정보 저장
        if (backendResult.data.user) {
          await TokenService.saveUserInfo(backendResult.data.user);
          console.log("사용자 정보 저장 완료:", backendResult.data.user);
        }
        navigation.navigate("Home");
      } else {
        showModal("로그인 실패", "이메일 또는 비밀번호가 올바르지 않습니다.", "error");
      }
    } catch (error: any) {
      console.error("로그인 오류:", error);
      showModal("로그인 실패", "이메일 또는 비밀번호가 올바르지 않습니다.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    console.log("회원가입 화면으로 이동");
    navigation.navigate("SignupName");
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
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
        />

        {/* 이메일 입력칸 */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>이메일</Text>
          <TextInput
            style={[styles.input, emailError && styles.inputError]}
            placeholder="이메일을 입력하세요"
            placeholderTextColor="#AAAAAA"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (text) setEmailError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}
        </View>

        {/* 비밀번호 입력칸 */}
        <View style={[styles.inputContainer, { marginBottom: responsiveHeight(3) }]}>
          <Text style={styles.label}>비밀번호</Text>
          <TextInput
            style={[styles.input, passwordError && styles.inputError]}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="#AAAAAA"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text) setPasswordError("");
            }}
            secureTextEntry
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
        </View>

        {/* 시작하기 버튼 */}
        <TouchableOpacity
          onPress={handleLogin}
          disabled={isLoading}
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.loginButtonText}>시작하기</Text>
          )}
        </TouchableOpacity>

        {/* 계정 생성 안내 */}
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>아직 계정이 없으신가요?{"  "}</Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signupLink}>회원가입</Text>
          </TouchableOpacity>
        </View>

        {/* 하단 문구 */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>INU Announcement Notification App</Text>
          <Text style={styles.footerCopyright}>ⓒ DAON</Text>
        </View>
      </View>

      <CustomModal
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={() => setModalVisible(false)}
      />
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
  inputContainer: {
    marginBottom: responsiveHeight(2),
    width: "100%",
  },
  label: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: responsiveFontSize(14),
    color: "#333333",
    marginBottom: responsiveHeight(1),
  },
  input: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(14),
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.5),
    backgroundColor: "#FAFAFA",
    width: "100%",
    textAlign: "left",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    fontFamily: "Pretendard-Regular",
    color: "red",
    fontSize: responsiveFontSize(12),
    marginTop: responsiveHeight(0.5),
  },
  loginButton: {
    backgroundColor: "#3366FF",
    borderRadius: 10,
    paddingVertical: responsiveHeight(1.8),
    alignItems: "center",
    marginBottom: responsiveHeight(2.5),
    width: "100%",
  },
  loginButtonDisabled: {
    backgroundColor: "#99BBFF",
  },
  loginButtonText: {
    fontFamily: "Pretendard-Bold",
    fontSize: responsiveFontSize(16),
    color: "#FFFFFF",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(14),
    color: "#666666",
  },
  signupLink: {
    fontFamily: "Pretendard-Bold",
    fontSize: responsiveFontSize(14),
    color: "#3366FF",
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
  footerCopyright: {
    fontFamily: "Pretendard-Regular",
    fontSize: responsiveFontSize(12),
    color: "#AAAAAA",
    textAlign: "center",
  },
});
