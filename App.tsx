import React, { useEffect } from 'react'
import AppEntryPoint from './src/AppEntryPoint'
import 'react-native-gesture-handler';
import { useAuthStore } from './src/store/store';


const App = () => {

  const { loadUserFromStorage } = useAuthStore()

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  return (
    <AppEntryPoint />
  )
}

export default App