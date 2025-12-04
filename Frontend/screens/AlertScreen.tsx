import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

// 메인 콘텐츠
import Alert from "@/components/maincontents/alert";

// 상단 탭바
import Header from "@/components/topmenu/header";

// 하단 탭바
import BottomBar from "@/components/bottombar/bottombar";

type AlertScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Alert'>;

export default function AlertScreen() {
  const navigation = useNavigation<AlertScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />
      <Alert />
      <BottomBar onTabPress={handleTabPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
