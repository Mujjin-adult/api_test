import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

// 메인 콘텐츠
import Setting from "@/components/maincontents/setting";

// 상단 탭바
import Header from "@/components/topmenu/header";

type SettingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Setting"
>;

export default function SettingScreen() {
  const navigation = useNavigation<SettingScreenNavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />
      <Setting />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
