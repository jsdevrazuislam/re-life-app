import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/wrapper/AppNavigator';
import Toast from "react-native-toast-message";


const AppEntryPoint = ({ role, user, status, userTempId } : { role:string, user:IUser | null, status:string, userTempId:string }) => {

  return (
    <NavigationContainer>
      <AppNavigator role={role} user={user} status={status} userTempId={userTempId} />
      <Toast />
    </NavigationContainer>
  );
};

export default AppEntryPoint;
