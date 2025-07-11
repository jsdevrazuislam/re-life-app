import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { stackNavigationOptions } from '../../configs/navigation';
import HomeScreen from '../../screens/HomeScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import LoginScreen from '../../screens/LoginScreen';
import OpeningScreen from '../../screens/OpeningScreen';
import { AppRoutes } from '../../constants/route';
import SignupScreen from '../../screens/SignupScreen';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import HomeViewDetailsInfoScreen from '../../screens/HomeViewDetailsInfoScreen';
import OtpScreen from '../../screens/OtpScreen';
import ImamHomeScreen from '../../screens/ImamHomeScreen';
import AddCommitteeScreen from '../../screens/AddCommitteeScreen';
import KYCVerifyScreen from '../../screens/KycStartedScreen';
import KycScreen from '../../screens/KycScreen';
import AddPeopleScreen from '../../screens/AddPoorPeopleScreen';
import SettingsScreen from '../../screens/ImamSettingsScreen';
import ImamPendingScreen from '../../screens/ImamPendingScreen';
import UpdateEmailScreen from '../../screens/UpdateEmailScreen';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import NotificationsScreen from '../../screens/NotificationScreen';
import FaceScanScreen from '../../screens/FaceScanScreen';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from '../../screens/InternetConnectionScreen';
import RequestAccessViewScreen from '../../screens/RequestAccessViewScreen';
import EditPeopleScreen from '../../screens/EditPoorPeopleScreen';
import MarkDonationScreen from '../../screens/MarkDonationScreen';
import DonationHistoryScreen from '../../screens/DonationHistoryScreen';
import RehabilitationScreen from '../../screens/RehabilitationScreen';
import { RehabilitationTabsNavigator } from '../screens/rehabilitation-tabs-navigator';
import RehabilitationDetailsScreen from '../screens/rehabilitation-details';
import AddFollowUpScreen from '../../screens/AddFollowUpScreen';
import StatusScreen from '../../screens/StatusScreen';



const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();
const AppNavigator = ({ role, status, userTempId, user, isFirstTime }: { role: string, user: IUser | null, status: string, userTempId: string, isFirstTime:boolean }) => {

  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  if (!isConnected) {
    return <NoInternetScreen />;
  }


  if (status === 'otp_pending') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AppRoutes.OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={AppRoutes.KYC_VERIFY_SCREEN} component={KYCVerifyScreen} />
        <Stack.Screen name={AppRoutes.KYC_SCREEN} component={KycScreen} />
      </Stack.Navigator>
    );
  }

  if (userTempId && status === 'kyc_pending') {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={AppRoutes.KYC_VERIFY_SCREEN} component={KYCVerifyScreen} />
        <Stack.Screen name={AppRoutes.KYC_SCREEN} component={KycScreen} />
        <Stack.Screen name={AppRoutes.IMAM_PENDING_SCREEN} component={ImamPendingScreen} />
      </Stack.Navigator>
    );
  }

  if (!role) {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        {!isFirstTime && <Stack.Screen name={AppRoutes.OPENING_SCREEN} component={OpeningScreen} />}
        <Stack.Screen name={AppRoutes.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={AppRoutes.FACE_SCAN_SCREEN} component={FaceScanScreen} />
        <Stack.Screen name={AppRoutes.LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={AppRoutes.SIGNUP_SCREEN} component={SignupScreen} />
        <Stack.Screen name={AppRoutes.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
        <Stack.Screen name={AppRoutes.HOME_VIEW_DETAILS_INFO} component={HomeViewDetailsInfoScreen} />
        <Stack.Screen name={AppRoutes.OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={AppRoutes.KYC_VERIFY_SCREEN} component={KYCVerifyScreen} />
        <Stack.Screen name={AppRoutes.KYC_SCREEN} component={KycScreen} />
        <Stack.Screen name={AppRoutes.IMAM_PENDING_SCREEN} component={ImamPendingScreen} />
        <Stack.Screen name={AppRoutes.RESET_PASSWORD_SCREEN} component={ResetPasswordScreen} />
      </Stack.Navigator>
    );
  }

  if (['imam', 'moderator'].includes(role)) {
    return (
      <Stack.Navigator screenOptions={stackNavigationOptions}>
        {["pending", "rejected"].includes(user?.kycStatus ?? '') && <Stack.Screen name={AppRoutes.IMAM_PENDING_SCREEN} component={ImamPendingScreen} />}
        <Stack.Screen name={AppRoutes.IMAM_HOME_SCREEN} component={ImamHomeScreen} />
        <Stack.Screen name={AppRoutes.REQUEST_ACCESS_VIEW} component={RequestAccessViewScreen} />
        <Stack.Screen name={AppRoutes.REHABILITATION_SCREEN} component={RehabilitationScreen} />
        <Stack.Screen name={AppRoutes.REHABILITATION_DASHBOARD} component={RehabilitationTabsNavigator} />
        <Stack.Screen name={AppRoutes.ADD_FOLLOW_UP_SCREEN} component={AddFollowUpScreen} />
        <Stack.Screen name={AppRoutes.EDIT_POOR_PERSON} component={EditPeopleScreen} />
        <Stack.Screen name={AppRoutes.ADD_COMMITTEE_SCREEN} component={AddCommitteeScreen} />
        <Stack.Screen name={AppRoutes.PROFILE_SCREEN} component={ProfileScreen} />
        <Stack.Screen name={AppRoutes.IMAM_SETTING_SCREEN} component={SettingsScreen} />
        <Stack.Screen name={AppRoutes.ADD_POOR_PEOPLE_SCREEN} component={AddPeopleScreen} />
        <Stack.Screen name={AppRoutes.UPDATE_EMAIL} component={UpdateEmailScreen} />
        <Stack.Screen name={AppRoutes.CHANGE_PASSWORD} component={ChangePasswordScreen} />
        <Stack.Screen name={AppRoutes.NOTIFICATION_SCREEN} component={NotificationsScreen} />
        <Stack.Screen name={AppRoutes.OTP_SCREEN} component={OtpScreen} />
        <Stack.Screen name={AppRoutes.KYC_VERIFY_SCREEN} component={KYCVerifyScreen} />
        <Stack.Screen name={AppRoutes.KYC_SCREEN} component={KycScreen} />
        <Stack.Screen name={AppRoutes.HOME_VIEW_DETAILS_INFO} component={HomeViewDetailsInfoScreen} />
        <Stack.Screen name={AppRoutes.MARK_AS_COMPLETE} component={StatusScreen} />
        <Stack.Screen name={AppRoutes.MARK_DONATION_SCREEN} component={MarkDonationScreen} />
        <Stack.Screen name={AppRoutes.DONATION_HISTORY_SCREEN} component={DonationHistoryScreen} />
        <Stack.Screen 
        name={AppRoutes.REHABILITATION_DETAILS} 
        component={RehabilitationDetailsScreen} 
      />
      </Stack.Navigator>
    );
  }
};

export default AppNavigator;
