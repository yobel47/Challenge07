/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import App from './src/App';
import { name as appName } from './app.json';

PushNotification.configure({
  onNotification() {
    // console.log('NOTIFICATION:', notification);
  },
  // eslint-disable-next-line no-undef
  requestPermissions: Platform.OS === 'ios',
});

messaging().setBackgroundMessageHandler(async () => {
  // console.log('Message handled in the background!', remoteMessage);
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
