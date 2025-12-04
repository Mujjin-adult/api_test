import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

// 메인 콘텐츠
import Detail from "@/components/maincontents/detail";

// 상단 탭바
import All from "@/components/topmenu/all";
import Header from "@/components/topmenu/header";
import Scrap from "@/components/topmenu/scrap";

// 하단 탭바
import BottomBar from "@/components/bottombar/bottombar";

type DetailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAlertToggle = () => {
    navigation.navigate('Alert');
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onAlertToggle={handleAlertToggle} onBackPress={handleBackPress} />
      {activeTab === 1 ? <Scrap /> : <All />}
      <Detail />
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
