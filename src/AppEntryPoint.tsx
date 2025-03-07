import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './components/wrapper/AppNavigator';
import Toast from "react-native-toast-message";
import { Host } from 'react-native-portalize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const AppEntryPoint = ({ role, user, status, userTempId }: { role: string, user: IUser | null, status: string, userTempId: string }) => {

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Host>
          <AppNavigator role={role} user={user} status={status} userTempId={userTempId} />
          <Toast />
        </Host>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default AppEntryPoint;
