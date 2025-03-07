import React, { useEffect, useRef, useState } from 'react';
import AppEntryPoint from './src/AppEntryPoint';
import 'react-native-gesture-handler';
import { useAuthStore } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import SplashScreenComponent from './src/screens/SplashScreen';
import io from "socket.io-client";
import { SERVER_URL } from './src/lib/api';
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'default_channel_id',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

const showForegroundNotification = async (title: string, message: string) => {
  await notifee.displayNotification({
    title,
    body: message,
    android: {
      channelId: 'default_channel_id',
      pressAction: {
        id: 'default',
      },
    },
  });
};

const App = () => {
  const { loadUserFromStorage, accessToken, isLoading, role, userTempId, user, status } = useAuthStore();
  const socketRef = useRef<any>(null);

  async function requestPermissions() {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log('User denied notifications');
    } else {
      console.log('Notification permission granted:', settings);
    }
  }

  useEffect(() => {
    const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DELIVERED:
          console.log('Notification Delivered:', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User Pressed Notification:', detail.notification);
          break;
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log("remoteMessage", remoteMessage)
        }
      })
    messaging()
      .setBackgroundMessageHandler(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("remoteMessage setBackgroundMessageHandler", remoteMessage)
        }
      })

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log("remoteMessage unsubscribe", remoteMessage)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    requestPermissions();
    setupNotificationChannel();
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    if (!accessToken || !user?._id) return;

    if (!socketRef.current) {
      socketRef.current = io(SERVER_URL, {
        transports: ['websocket'],
        auth: { token: accessToken },
      });

      socketRef.current.on("kycStatusUpdated", (notification: Notification) => {
        if (user) {
          loadUserFromStorage();
          showForegroundNotification(notification.title, notification.message);
        }
        console.log("kycStatusUpdated", notification);
      });
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [accessToken, user]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return <AppEntryPoint user={user} userTempId={userTempId ?? ""} status={status ?? ""} role={role ?? ""} />;
};

export default App;
