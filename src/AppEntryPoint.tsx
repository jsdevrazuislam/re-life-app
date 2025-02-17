import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/wrapper/AppNavigator';
import Toast from "react-native-toast-message";


const AppEntryPoint = ({ role, user } : { role:string, user:IUser | null }) => {

  return (
    <NavigationContainer>
      <AppNavigator role={role} user={user} />
      <Toast />
    </NavigationContainer>
  );
};

export default AppEntryPoint;
