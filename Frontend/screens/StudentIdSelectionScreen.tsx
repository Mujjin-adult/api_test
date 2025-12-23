import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../App";
import { useFonts } from "expo-font";
import Header from "@/components/topmenu/header";
import BottomBar from "@/components/bottombar/bottombar";
import { useSignup } from "@/context/SignupContext";

type StudentIdSelectionNavigationProp = NativeStackNavigationProp<RootStackParamList, "StudentIdSelection">;
type StudentIdSelectionRouteProp = RouteProp<RootStackParamList, "StudentIdSelection">;

export default function StudentIdSelectionScreen() {
  const navigation = useNavigation<StudentIdSelectionNavigationProp>();
  const route = useRoute<StudentIdSelectionRouteProp>();
  const { setStudentId: setContextStudentId } = useSignup();
  const [studentId, setStudentId] = useState("");
  const [activeTab, setActiveTab] = useState<number>(4);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    switch (index) {
      case 0:
        navigation.navigate('Home');
        break;
      case 1:
        navigation.navigate('Scrap');
        break;
      case 2:
        navigation.navigate('Chatbot');
        break;
      case 3:
        navigation.navigate('Search');
        break;
      case 4:
        navigation.navigate('Setting');
        break;
    }
  };

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = () => {
    if (studentId.trim()) {
      setContextStudentId(studentId.trim());
      if (route.params?.onSelect) {
        route.params.onSelect(studentId.trim());
      }
    }
    navigation.goBack();
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />

      <View style={styles.content}>
        <Text style={styles.title}>학번 입력</Text>

        <Text style={styles.label}>학번</Text>
        <TextInput
          style={styles.input}
          placeholder="예: 202301601"
          value={studentId}
          onChangeText={setStudentId}
          keyboardType="number-pad"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>저장하기</Text>
        </TouchableOpacity>
      </View>

      <BottomBar onTabPress={handleTabPress} activeTab={4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  label: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 30,
  },
  saveButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "#3478F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});
