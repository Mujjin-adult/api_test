import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BookmarkProvider } from './context/BookmarkContext';

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
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BookmarkProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="EnterEmail" component={EnterEmailScreen} />
            <Stack.Screen name="EnterPw" component={EnterPwScreen} />
            <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
            <Stack.Screen name="Alert" component={AlertScreen} />
            <Stack.Screen name="Scrap" component={ScrapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BookmarkProvider>
    </GestureHandlerRootView>
  );
}
