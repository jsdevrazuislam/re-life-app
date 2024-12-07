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
import routes from '../../routes/routes_name';
import OpeningScreen from '../../screens/OpeningScreen';

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

const AdminStack = createStackNavigator({
  screens: {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
});
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
        <Stack.Screen name={routes.openingScreen} component={OpeningScreen} />
        <Stack.Screen name={routes.login} component={LoginScreen} />
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
