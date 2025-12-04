import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

// 메인 콘텐츠
import Alert from "@/components/maincontents/alert";
import MainContents from "@/components/maincontents/mainAll";

// 상단 탭바
import All from "@/components/topmenu/all";
import Header from "@/components/topmenu/header";

// 하단 탭바
import BottomBar from "@/components/bottombar/bottombar";

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<number>(0); // 0: 공지사항, 1: 관심공지
  const [selectedCategory, setSelectedCategory] = useState<string>("학사"); // 선택된 카테고리
  const [availableCategories, setAvailableCategories] = useState<string[]>([]); // 실제 존재하는 카테고리
  const [isAlertOpen, setIsAlertOpen] = useState(false); // 알림 모달 상태

  const toggleAlert = () => {
    setIsAlertOpen(!isAlertOpen);
  };

  const handleTabPress = (index: number) => {
    setActiveTab(index);

    // 탭 인덱스에 따라 다른 화면으로 네비게이션
    switch (index) {
      case 0: // 공지사항
        // 이미 Home 화면이므로 아무것도 하지 않음
        break;
      case 1: // 관심공지
        navigation.navigate("Scrap");
        break;
      case 2: // AI 챗봇
        // TODO: AI 챗봇 화면 추가
        console.log("AI 챗봇 - 준비 중");
        break;
      case 3: // 검색
        navigation.navigate("Search");
        break;
      case 4: // 메뉴
        navigation.navigate("Setting");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header onAlertToggle={toggleAlert} isAlertOpen={isAlertOpen} />
      <All
        onCategoryChange={setSelectedCategory}
        availableCategories={availableCategories}
      />
      <MainContents
        category={selectedCategory}
        onCategoriesExtracted={setAvailableCategories}
      />
      <BottomBar onTabPress={handleTabPress} activeTab={0} />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isAlertOpen}
        onRequestClose={toggleAlert}
      >
        <TouchableWithoutFeedback onPress={toggleAlert}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Alert />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden", // 자식 컴포넌트가 부모 경계를 넘지 않도록
  },
});
