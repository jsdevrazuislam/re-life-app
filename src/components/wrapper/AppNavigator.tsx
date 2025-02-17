import React from 'react';
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
import KYCVerifyScreen from '../../screens/KycStartedScreen';
import KycScreen from '../../screens/KycScreen';
import AddPeopleScreen from '../../screens/AddPoorPeopleScreen';
import SettingsScreen from '../../screens/ImamSettingsScreen';
import ImamPendingScreen from '../../screens/ImamPendingScreen';


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
const AppNavigator = ({ role, user } : { role:string, user:IUser | null }) => {

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
        <Stack.Screen name={AppRoutes.KYC_VERIFY_SCREEN} component={KYCVerifyScreen} />
        <Stack.Screen name={AppRoutes.KYC_SCREEN} component={KycScreen} />
        <Stack.Screen name={AppRoutes.IMAM_PENDING_SCREEN} component={ImamPendingScreen} />
      </Stack.Navigator>
    );
  }

  if (role === 'imam' && (user?.kycStatus === 'pending' || user?.kycStatus === 'rejected')) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AppRoutes.IMAM_PENDING_SCREEN} component={ImamPendingScreen} />
      </Stack.Navigator>
    );
  }

  if (role === 'imam') {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        <Stack.Screen name={AppRoutes.IMAM_HOME_SCREEN} component={ImamHomeScreen} />
        <Stack.Screen name={AppRoutes.ADD_COMMITTEE_SCREEN} component={AddCommitteeScreen} />
        <Stack.Screen name={AppRoutes.PROFILE_SCREEN} component={ProfileScreen} />
        <Stack.Screen name={AppRoutes.IMAM_SETTING_SCREEN} component={SettingsScreen} />
        <Stack.Screen name={AppRoutes.ADD_POOR_PEOPLE_SCREEN} component={AddPeopleScreen} />
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
