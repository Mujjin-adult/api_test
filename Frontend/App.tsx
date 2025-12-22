import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookmarkProvider } from './context/BookmarkContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Alert from './components/maincontents/alert';

// 화면 컴포넌트 import
import LoginScreen from './screens/LoginScreen';
import EnterEmailScreen from './screens/EnterEmailScreen';
import EnterPwScreen from './screens/EnterPwScreen';
import EmailVerificationScreen from './screens/EmailVerificationScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import SearchScreen from './screens/SearchScreen';
import SettingScreen from './screens/SettingScreen';
import AlertScreen from './screens/AlertScreen';
import ScrapScreen from './screens/ScrapScreen';
import ChatbotScreen from './screens/ChatbotScreen';
import MyInfoScreen from './screens/MyInfoScreen';
import DepartmentSelectionScreen from './screens/DepartmentSelectionScreen';
import StudentIdSelectionScreen from './screens/StudentIdSelectionScreen';
import NotificationSettingsScreen from './screens/NotificationSettingsScreen';
import KeywordSettingsScreen from './screens/KeywordSettingsScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';

export type RootStackParamList = {
  Login: undefined;
  EnterEmail: undefined;
  EnterPw: undefined;
  EmailVerification: { email: string };
  Home: undefined;
  Detail: undefined;
  Search: undefined;
  Setting: undefined;
  Alert: undefined;
  Scrap: undefined;
  Chatbot: undefined;
  MyInfo: undefined;
  DepartmentSelection: { onSelect?: (department: string) => void } | undefined;
  StudentIdSelection: { onSelect?: (studentId: string) => void } | undefined;
  NotificationSettings: undefined;
  KeywordSettings: undefined;
  DeleteAccount: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const { isAlertOpen, toggleAlert } = useNotification();

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
            <Stack.Screen name="EnterPw" component={EnterPwScreen} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Scrap" component={ScrapScreen} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />
            <Stack.Screen name="MyInfo" component={MyInfoScreen} />
            <Stack.Screen name="DepartmentSelection" component={DepartmentSelectionScreen} />
            <Stack.Screen name="StudentIdSelection" component={StudentIdSelectionScreen} />
            <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
            <Stack.Screen name="KeywordSettings" component={KeywordSettingsScreen} />
            <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="Setting" component={SettingScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>

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

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotificationProvider>
        <BookmarkProvider>
          <AppContent />
        </BookmarkProvider>
      </NotificationProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
});
