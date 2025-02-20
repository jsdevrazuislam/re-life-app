import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { imamStyles } from '../styles/imamHomeStyles';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { Colors } from '../configs/colors';
import globalStyles from '../styles/global.style';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import PeopleTab from '../components/screens/PoorPeopleTab';
import CommitteeTab from '../components/screens/CommitteTab';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/store';
import ApiStrings from '../lib/apis_string';
import { showToast } from '../utils/toast';
import { baseURLPhoto } from '../lib/api';

const Tab = createMaterialTopTabNavigator();





const DashboardScreen = () => {
  const [people, setPeople] = useState<PoorPeopleResponse[]>([]);
  const [committees, setCommittees] = useState<CommitteeResponse[]>([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<ImamHomeScreenRouteProp>();
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 'Poor People');
  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const { request, loading } = useApi();
  const { logout, user } = useAuthStore()
  const [total, setTotal] = useState({
    totalPeople:0,
    totalCommittees: 0
  })

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleAddPerson = () => {
    navigation.navigate('AddPoorPeopleScreen')
  };
  const handleLogout = async () => {
    toggleMenu()
    await request('get', ApiStrings.LOGOUT);
    logout()
    showToast('success', 'Logout Successfully')
  }

  useEffect(() => {
    (async () => {
      if (user?.kycStatus === 'verified') {
        const { data } = await request('get', ApiStrings.GET_MASJID_DETAILS(user?.masjid?._id || ''));
        setTotal({ ...total, totalPeople: data?.totalPoorPeople, totalCommittees: data?.totalCommittees})
        setCommittees(data?.committees)
        setPeople(data?.poorPeople)
      }
    })()
  }, [user])

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params?.activeTab]);


  return (
    <SafeAreaWrapper bg={Colors.light}>
      <View style={globalStyles.container}>
        <View style={imamStyles.header}>
          <View>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{getGreeting()},</Paragraph>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{user?.fullName}</Paragraph>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            {user?.profileUrl ? <Image source={{ uri: baseURLPhoto(user?.profileUrl ?? "") }} style={imamStyles.profileAvatar} /> : <EvilIcons name='user' />}
          </TouchableOpacity>
          <Modal
            visible={isMenuVisible}
            transparent
            animationType="fade"
            onRequestClose={toggleMenu}
          >
            <TouchableOpacity style={imamStyles.overlay} onPress={toggleMenu} />
            <View style={imamStyles.menu}>
              <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                toggleMenu()
                navigation.navigate('ProfileScreen')
              }}>
                <Feather name="user" size={20} color="#333" />
                <Text style={imamStyles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                toggleMenu()
                navigation.navigate('ImamSettingsScreen')
              }}>
                <Feather name="settings" size={20} color="#333" />
                <Text style={imamStyles.menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={imamStyles.menuItem} onPress={handleLogout}>
                <Feather name="log-out" size={20} color="red" />
                <Text style={[imamStyles.menuText, { color: "red" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={imamStyles.statsContainer}>
          <View style={imamStyles.statCard}>
            <Icon name="people" size={32} color={Colors.primary} />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>Total People</Paragraph>
            <Heading level={5} weight='Bold' style={imamStyles.statValue}>{people?.length}</Heading>
          </View>
          <View style={imamStyles.statCard}>
            <Icon name="groups" size={32} color="#4CAF50" />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>Committees</Paragraph>
            <Heading level={5} weight='Bold' style={imamStyles.statValue}>{committees?.length}</Heading>
          </View>
        </View>

        <Tab.Navigator
          initialRouteName={activeTab}
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: Colors.black },
            tabBarStyle: { backgroundColor: "transparent", elevation: 0 },
          }}>
          <Tab.Screen name="Poor People">
            {() => <PeopleTab loading={loading} data={people} onAdd={handleAddPerson} />}
          </Tab.Screen>
          <Tab.Screen name="Committee">
            {() => <CommitteeTab loading={loading} data={committees} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaWrapper>
  );
};


export default DashboardScreen;