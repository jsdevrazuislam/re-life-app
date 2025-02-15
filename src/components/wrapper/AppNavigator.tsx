import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from '../../configs/navigation';
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
import OtpScreen from '../../screens/OtpScreen';
import ImamHomeScreen from '../../screens/ImamHomeScreen';
import AddCommitteeScreen from '../../screens/AddCommitteeScreen';
import { useAuthStore } from '../../store/store';
import LoadingScreen from '../../screens/LoadingScreen';


const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Admin" component={AdminStackNavigator} />
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

  const { role, loadUserFromStorage, isLoading } = useAuthStore()

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  if (isLoading) {
    return <LoadingScreen />;
  }



  if (!role) {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        <Stack.Screen name={AppRoutes.OPENING_SCREEN} component={OpeningScreen} />
        <Stack.Screen name={AppRoutes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={AppRoutes.SIGNUP_SCREEN} component={SignupScreen} />
        <Stack.Screen name={AppRoutes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        <Stack.Screen name={AppRoutes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={AppRoutes.HOME_VIEW_DETAILS_INFO} component={HomeViewDetailsInfoScreen} />
        <Stack.Screen name={AppRoutes.POOR_PEOPLE_VIEW} component={PoorPeopleViewScreen} />
        <Stack.Screen name={AppRoutes.OTP_SCREEN} component={OtpScreen} />
      </Stack.Navigator>
    );
  }

  if (role === 'imam') {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        <Stack.Screen name={AppRoutes.IMAM_HOME_SCREEN} component={ImamHomeScreen} />
        <Stack.Screen name={AppRoutes.ADD_COMMITTEE_SCREEN} component={AddCommitteeScreen} />
        <Stack.Screen name={AppRoutes.PROFILE_SCREEN} component={ProfileScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
