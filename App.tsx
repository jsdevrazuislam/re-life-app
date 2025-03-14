import React, { useEffect } from 'react';
import AppEntryPoint from './src/AppEntryPoint';
import 'react-native-gesture-handler';
import { useAuthStore } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import SplashScreenComponent from './src/screens/SplashScreen';
import notifee, { AndroidImportance, AndroidStyle, AuthorizationStatus, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useSocketStore } from './src/hooks/useSocketStore';

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
      style: {
        type: AndroidStyle.BIGTEXT, 
        text: message,
      },
    },
  });
};

const App = () => {
  const { loadUserFromStorage, logout, isFirstTime, isLoading, role, userTempId, user, status } = useAuthStore();
  const { initializeSocket, disconnectSocket, socket } = useSocketStore();

  useEffect(() => {
    initializeSocket();
    return () => {
      disconnectSocket();
    };
  }, [user]);;



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
    socket?.on("kycStatusUpdated", (notification: Notification) => {
      if (user) {
        loadUserFromStorage();
        showForegroundNotification(notification.title, notification.message);
      }
    })
  }, [socket]);

  useEffect(() => {
    socket?.on("USER_BLOCKED", (notification: { message:string, title:string }) => {
      if (user) {
        logout()
        loadUserFromStorage();
        showForegroundNotification(notification.title, notification.message);
      }
    })
  }, [socket]);

  useEffect(() => {
    socket?.on("USER_DELETE", (notification: { message:string, title:string }) => {
        logout()
        loadUserFromStorage();
        showForegroundNotification(notification.title, notification.message);
    })
  }, [socket]);

  useEffect(() => {
    socket?.on("REQUEST_NOTIFICATION", (notification: { message:string, title:string }) => {
        loadUserFromStorage();
        showForegroundNotification(notification.title, notification.message);
    })
  }, [socket]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return <AppEntryPoint isFirstTime={isFirstTime} user={user} userTempId={userTempId ?? ""} status={status ?? ""} role={role ?? ""} />;
};

export default App;
