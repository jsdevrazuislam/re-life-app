import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/wrapper/AppNavigator';
import Toast from "react-native-toast-message";
import { useApi } from './hooks/useApi';
import { useAuthStore } from './store/store';
import ApiStrings from './lib/apis_string';


const AppEntryPoint = () => {

  const { request, } = useApi()
  const { setUserInfo, accessToken } = useAuthStore()

  useEffect(() => {
    (async () => {
      if(accessToken){
        const { data } = await request('get', ApiStrings.ME);
        setUserInfo(data)
      }
    })()
  }, [accessToken])

  return (
    <NavigationContainer>
      <AppNavigator />
      <Toast />
    </NavigationContainer>
  );
};

export default AppEntryPoint;
