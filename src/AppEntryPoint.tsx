import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './components/wrapper/AppNavigator';

const AppEntryPoint = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default AppEntryPoint;
