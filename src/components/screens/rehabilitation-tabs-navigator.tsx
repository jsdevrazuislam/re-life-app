import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RehabilitationListScreen from './rehabilitation-list';
import RehabilitationReportScreen from './rehabilitation-report';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../configs/colors';
import { Platform, StyleSheet, View } from 'react-native';


const Tab = createBottomTabNavigator();

export const RehabilitationTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.label,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.dark,
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="RehabilitationList" 
        component={RehabilitationListScreen}
        options={{
          tabBarLabel: 'তালিকা',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <MaterialIcons 
                name="list-alt" 
                size={24} 
                color={color}
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          )
        }}
      />
      <Tab.Screen
        name="RehabilitationReport"
        component={RehabilitationReportScreen}
        options={{
          tabBarLabel: 'রিপোর্ট',
          tabBarIcon: ({ color, focused }) => (
            <View style={focused ? styles.activeIcon : null}>
              <MaterialCommunityIcons 
                name="chart-box" 
                size={24} 
                color={color}
                style={styles.icon}
              />
              {focused && <View style={styles.activeIndicator} />}
            </View>
          )
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: Platform.select({
      ios: 80,
      android: 60
    }),
    paddingHorizontal: 16,
    borderTopWidth: 0,
    backgroundColor: Colors.white,
    elevation: 0,
    shadowOpacity: 0, 
  },
  tabItem: {
    height: '100%',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: Platform.select({
      ios: 6,
      android: 2
    }),
  },
  icon: {
    marginBottom: 4,
  },
  activeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIndicator: {
    position: 'absolute',
    right: -8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
});