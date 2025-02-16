import React, { useEffect } from 'react'
import AppEntryPoint from './src/AppEntryPoint'
import 'react-native-gesture-handler';
import { useAuthStore } from './src/store/store';
import SplashScreen from 'react-native-splash-screen'



const App = () => {

  useEffect(() => {
    loadUserFromStorage()
    setTimeout(() => {
      SplashScreen.hide(); 
    }, 2000);
  }, []);


  const { loadUserFromStorage } = useAuthStore()

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <AppEntryPoint />
  )
}

export default App