import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  AllUserScreen,
  ChatScreen,
  DashboardScreen,
  ForgotPasswordScreen, LoginScreen, ProfileScreen, RegisterScreen, SplashScreen, UpdateProfile,
} from '../pages';
import { navigate, navigationRef } from './RootNavigation';

const Stack = createNativeStackNavigator();

function Router() {
  const [initialRoute, setInitialRoute] = useState('SplashScreen');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
      navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );
          // console.log('remoteMessage.data.type : ', remoteMessage.data.type);
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  return loading ? (null) : (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AllUserScreen"
          component={AllUserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DashboardScreen"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default Router;
