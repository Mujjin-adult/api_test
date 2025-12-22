import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { useNotification } from "../context/NotificationContext";

// 메인 콘텐츠
import Alert from "@/components/maincontents/alert";
import NotificationList from "@/components/maincontents/notificationList";

// 상단 탭바
import Header from "@/components/topmenu/header";

// 하단 탭바
import BottomBar from "@/components/bottombar/bottombar";

type AlertScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Alert'>;

export default function AlertScreen() {
  const navigation = useNavigation<AlertScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [alertTab, setAlertTab] = useState<number>(0); // 0: 받은 알림, 1: 알림 설정
  const { notificationNotices } = useNotification();

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />

      {/* 알림 탭 메뉴 */}
      <View style={styles.alertTabContainer}>
        <TouchableOpacity
          style={[styles.alertTab, alertTab === 0 && styles.activeAlertTab]}
          onPress={() => setAlertTab(0)}
        >
          <Text style={[styles.alertTabText, alertTab === 0 && styles.activeAlertTabText]}>
            받은 알림 ({notificationNotices.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.alertTab, alertTab === 1 && styles.activeAlertTab]}
          onPress={() => setAlertTab(1)}
        >
          <Text style={[styles.alertTabText, alertTab === 1 && styles.activeAlertTabText]}>
            알림 설정
          </Text>
        </TouchableOpacity>
      </View>

      {alertTab === 0 ? <NotificationList /> : <Alert />}
      <BottomBar onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  alertTabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#D1D1D1",
    backgroundColor: "#fff",
  },
  alertTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeAlertTab: {
    borderBottomColor: "#3366FF",
  },
  alertTabText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 14,
    color: "#999",
  },
  activeAlertTabText: {
    fontFamily: "Pretendard-Bold",
    color: "#3366FF",
  },
});
