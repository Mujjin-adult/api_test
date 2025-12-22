import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import Header from "@/components/topmenu/header";
import MyInfo from "@/components/maincontents/myinfo";

type MyInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "MyInfo">;

export default function MyInfoScreen() {
  const navigation = useNavigation<MyInfoScreenNavigationProp>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} onBackPress={handleBackPress} />
      <MyInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
