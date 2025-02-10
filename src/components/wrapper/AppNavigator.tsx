import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {UserRoles} from '../../types/roles';
import {stackNavigationOptions} from '../../configs/navigation';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import LoginScreen from '../../screens/LoginScreen';
import AdminPanelScreen from '../../screens/AdminPanelScreen';
import AdminSettingsScreen from '../../screens/AdminSettingsScreen';
import OpeningScreen from '../../screens/OpeningScreen';
import { AppRoutes } from '../../constants/route';
import SignupScreen from '../../screens/SignupScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import HomeViewDetailsInfoScreen from '../../screens/HomeViewDetailsInfoScreen';
import PoorPeopleViewScreen from '../../screens/PoorPeopleViewScreen';

const userRole = 'user' as UserRoles;

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    {userRole === 'admin' && (
      <Tab.Screen name="Admin" component={AdminStackNavigator} />
    )}
  </Tab.Navigator>
);

const AdminStack = createStackNavigator();
const AdminStackNavigator = () => (
  <AdminStack.Navigator initialRouteName="AdminPanel">
    <AdminStack.Screen name="AdminPanel" component={AdminPanelScreen} />
    <AdminStack.Screen name="AdminSettings" component={AdminSettingsScreen} />
  </AdminStack.Navigator>
);

const Stack = createStackNavigator();
const AppNavigator = () => {
  if (!userRole || userRole === 'user') {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        <Stack.Screen name={AppRoutes.OPENING_SCREEN} component={OpeningScreen} />
        <Stack.Screen name={AppRoutes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={AppRoutes.SIGNUP_SCREEN} component={SignupScreen} />
        <Stack.Screen name={AppRoutes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        <Stack.Screen name={AppRoutes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={AppRoutes.HOME_VIEW_DETAILS_INFO} component={HomeViewDetailsInfoScreen} />
        <Stack.Screen name={AppRoutes.POOR_PEOPLE_VIEW} component={PoorPeopleViewScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
