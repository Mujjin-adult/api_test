import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { useFonts } from "expo-font";
import Header from "@/components/topmenu/header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserKeywords } from "../services/userAPI";

type KeywordSettingsNavigationProp = NativeStackNavigationProp<RootStackParamList, "KeywordSettings">;

export default function KeywordSettingsScreen() {
  const navigation = useNavigation<KeywordSettingsNavigationProp>();
  const [keyword, setKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);

  const [fontsLoaded] = useFonts({
    "Pretendard-Bold": require("../assets/fonts/Pretendard-Bold.ttf"),
    "Pretendard-Regular": require("../assets/fonts/Pretendard-Regular.ttf"),
    "Pretendard-SemiBold": require("../assets/fonts/Pretendard-SemiBold.ttf"),
  });

  useEffect(() => {
    loadKeywords();
  }, []);

  const loadKeywords = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) return;

      // TODO: API에서 키워드 가져오기
      const saved = await AsyncStorage.getItem("userKeywords");
      if (saved) {
        setKeywords(JSON.parse(saved));
      }
    } catch (error) {
      console.error("키워드 불러오기 오류:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddKeyword = () => {
    if (!keyword.trim()) {
      Alert.alert("알림", "키워드를 입력해주세요.");
      return;
    }

    if (keywords.includes(keyword.trim())) {
      Alert.alert("알림", "이미 등록된 키워드입니다.");
      return;
    }

    if (keywords.length >= 10) {
      Alert.alert("알림", "키워드는 최대 10개까지 등록할 수 있습니다.");
      return;
    }

    const newKeywords = [...keywords, keyword.trim()];
    setKeywords(newKeywords);
    setKeyword("");
    saveKeywords(newKeywords);
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    const newKeywords = keywords.filter((k) => k !== keywordToRemove);
    setKeywords(newKeywords);
    saveKeywords(newKeywords);
  };

  const saveKeywords = async (keywordList: string[]) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (!token) {
        Alert.alert("오류", "로그인이 필요합니다.");
        return;
      }

      // 로컬 저장
      await AsyncStorage.setItem("userKeywords", JSON.stringify(keywordList));

      // 백엔드 저장
      const response = await updateUserKeywords(keywordList, token);
      if (!response.success) {
        Alert.alert("오류", "키워드 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("키워드 저장 오류:", error);
      Alert.alert("오류", "키워드 저장 중 오류가 발생했습니다.");
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />

      <View style={styles.content}>
        <Text style={styles.title}>키워드 설정</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="키워드를 입력하세요"
            value={keyword}
            onChangeText={setKeyword}
            placeholderTextColor="#999"
            returnKeyType="done"
            onSubmitEditing={handleAddKeyword}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddKeyword}>
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>• 최대 10개까지 등록 가능합니다</Text>
          <Text style={styles.infoText}>• 등록된 키워드가 포함된 공지사항을 알림으로 받습니다</Text>
        </View>

        <View style={styles.keywordHeader}>
          <Text style={styles.keywordHeaderText}>등록된 키워드 ({keywords.length}/10)</Text>
        </View>

        <ScrollView style={styles.keywordList}>
          {keywords.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>등록된 키워드가 없습니다</Text>
            </View>
          ) : (
            keywords.map((kw, index) => (
              <View key={index} style={styles.keywordItem}>
                <Text style={styles.keywordText}>{kw}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveKeyword(kw)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </ScrollView>
      </View>
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
  inputContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  input: {
    flex: 1,
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 10,
  },
  addButton: {
    backgroundColor: "#3478F6",
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  infoContainer: {
    backgroundColor: "#F8F9FA",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  keywordHeader: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 10,
  },
  keywordHeaderText: {
    fontFamily: "Pretendard-SemiBold",
    fontSize: 15,
    color: "#000",
  },
  keywordList: {
    flex: 1,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#999",
  },
  keywordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    marginBottom: 10,
  },
  keywordText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 15,
    color: "#000",
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FF5252",
    justifyContent: "center",
    alignItems: "center",
  },
  removeButtonText: {
    fontFamily: "Pretendard-Bold",
    fontSize: 20,
    color: "#fff",
    marginTop: -2,
  },
});
