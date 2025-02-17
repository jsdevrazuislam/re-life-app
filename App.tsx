import React, { useEffect, useState } from 'react';
import AppEntryPoint from './src/AppEntryPoint';
import 'react-native-gesture-handler';
import { useAuthStore } from './src/store/store';
import SplashScreen from 'react-native-splash-screen';
import SplashScreenComponent from './src/screens/SplashScreen';

const App = () => {
  const { loadUserFromStorage, isLoading, role, user } = useAuthStore();

  useEffect(() => {
    loadUserFromStorage();
  }, []);


  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isLoading]);

  if (isLoading) {
    return <SplashScreenComponent />;
  }

  return <AppEntryPoint user={user} role={role ?? ""} />;
};

export default App;
