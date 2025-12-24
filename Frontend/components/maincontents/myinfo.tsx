import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMyInfo, updateStudentId, updateDepartment } from "../../services/userSettingsAPI";
import CustomModal from "../common/CustomModal";

type MyInfoNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MyInfo() {
  const navigation = useNavigation<MyInfoNavigationProp>();
  const isFocused = useIsFocused();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStudentId, setUserStudentId] = useState("");
  const [userDepartment, setUserDepartment] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Regular": require("../../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  useEffect(() => {
    if (isFocused) loadUserInfo();
  }, [isFocused]);

  const loadUserInfo = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const response = await getMyInfo(token);
        if (response.success && response.data) {
          const data = response.data;
          setUserName(data.name || "");
          setUserEmail(data.email || "");
          setUserStudentId(data.studentId || "");
          setUserDepartment(data.department?.name || "");
        }
      }
    } catch (error) {
      console.error("사용자 정보 로드 오류:", error);
    }
  };

  const showModal = (title: string, message: string, type: "success" | "error" | "info" | "warning") => {
    setModalConfig({ title, message, type });
    setModalVisible(true);
  };

  const handleUpdateStudentId = async (selectedId: string) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const studentIdNum = selectedId.replace("학번", "");
        await updateStudentId(studentIdNum, token);
        setUserStudentId(studentIdNum);
        showModal("완료", "학번이 변경되었습니다.", "success");
      }
    } catch (error) {
      console.error("학번 수정 오류:", error);
      showModal("오류", "학번 수정에 실패했습니다.", "error");
    }
  };

  const handleUpdateDepartment = async (selectedDept: string) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        await updateDepartment(selectedDept, token);
        setUserDepartment(selectedDept);
        showModal("완료", "학과가 변경되었습니다.", "success");
      }
    } catch (error) {
      console.error("학과 수정 오류:", error);
      showModal("오류", "학과 수정에 실패했습니다.", "error");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ padding: 20 }}>
        <Text
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          내 정보
        </Text>

        {/* 이메일 */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginBottom: 8,
              color: "#666",
            }}
          >
            이메일
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 16,
              color: "#BDBDBD",
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
            }}
          >
            {userEmail}
          </Text>
        </View>

        {/* 학과 */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginBottom: 8,
              color: "#666",
            }}
          >
            학과
          </Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
            }}
            onPress={() => navigation.navigate("DepartmentSelection", {
              onSelect: handleUpdateDepartment
            })}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 16,
                color: "#000",
              }}
            >
              {userDepartment}
            </Text>
            <Text style={{ fontSize: 20, color: "#666" }}>›</Text>
          </TouchableOpacity>
        </View>

        {/* 학번 */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginBottom: 8,
              color: "#666",
            }}
          >
            학번
          </Text>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 16,
              color: "#BDBDBD",
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
            }}
          >
            {userStudentId}
          </Text>
        </View>

        {/* 이름 */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginBottom: 8,
              color: "#666",
            }}
          >
            이름
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 16,
                color: "#000",
              }}
            >
              {userName}
            </Text>
            <Text style={{ fontSize: 20, color: "#666" }}>›</Text>
          </View>
        </View>

        {/* 비밀번호 */}
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: 14,
              marginBottom: 8,
              color: "#666",
            }}
          >
            비밀번호
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              paddingHorizontal: 15,
              backgroundColor: "#F5F5F5",
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: 16,
                color: "#000",
              }}
            >
              ••••••••
            </Text>
            <Text style={{ fontSize: 20, color: "#666" }}>›</Text>
          </View>
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
