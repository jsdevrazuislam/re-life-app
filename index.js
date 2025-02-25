/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background Event:', type, detail);

  if (type === EventType.PRESS) {
    console.log('User pressed the notification:', detail.notification);
  }
});

AppRegistry.registerComponent(appName, () => App);
