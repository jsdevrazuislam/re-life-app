import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { useApi } from '../hooks/useApi';
import { useAuthStore } from '../store/store';
import ApiStrings from '../lib/apis_string';
import { showToast } from '../utils/toast';

const Tab = createMaterialTopTabNavigator();





const DashboardScreen = () => {
  const [people, setPeople] = useState<PoorPeopleResponse[]>([]);
  const [committees, setCommittees] = useState<CommitteeResponse[]>([]);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const { request } = useApi();
  const { logout, user } = useAuthStore()

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
  const handleLogout = async () =>{
    toggleMenu()
    await request('get', ApiStrings.LOGOUT);
    logout()
    showToast('success', 'Logout Successfully')
  }
  const handleEdit = (id: string) => {/* Add logic */ };
  const handleDelete = (id: string) => {/* Add logic */ }

  useEffect(() =>{
    (async() =>{
      const { data } = await request('get', ApiStrings.GET_COMMITTEE(user?.masjid || ''));
      const { data: poorPeopleData } = await request('get', ApiStrings.GET_POOR_PEOPLE(user?.masjid || ''));
      setCommittees(data)
      setPeople(poorPeopleData)
    })()
  } ,[user])
  

  if (user?.kycStatus === 'pending' || user?.kycStatus === 'rejected') {
    return (
      <SafeAreaWrapper bg={'#DDEBFE'}>
        <View style={imamStyles.kycContainer}>
          <Icon
            name={user?.kycStatus === 'pending' ? 'hourglass-empty' : 'error-outline'}
            size={60}
            color={user?.kycStatus === 'pending' ? Colors.secondary : Colors.danger}
          />
          <Heading level={5} weight='Bold' style={imamStyles.kycTitle}>
            {user?.kycStatus === 'pending' ? 'KYC Verification Pending' : 'KYC Verification Rejected'}
          </Heading>
          <Paragraph level='Small' weight='SemiBold' style={imamStyles.kycDescription}>
            {user?.kycStatus === 'pending'
              ? 'Your KYC verification is under review. Please wait for approval.'
              : 'Your KYC verification was rejected. Please contact support for further assistance.'}
          </Paragraph>

          {user?.kycStatus === 'rejected' && (
            <TouchableOpacity style={imamStyles.supportButton}>
              <Text style={imamStyles.supportButtonText}>Contact Support</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaWrapper>
    );
  }


  return (
    <SafeAreaWrapper bg={Colors.light}>
      <View style={globalStyles.container}>
        <View style={imamStyles.header}>
          <View>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{getGreeting()},</Paragraph>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{user?.fullName}</Paragraph>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            <Image source={{ uri: "https://images.pexels.com/photos/30140435/pexels-photo-30140435/free-photo-of-moody-forest-in-heavy-fog.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" }} style={imamStyles.infoPhoto} />
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
            <Icon name="people" size={32} color="#3F51B5" />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>Total People</Paragraph>
            <Heading level={5} weight='Bold' style={imamStyles.statValue}>{people?.length}</Heading>
          </View>
          <View style={imamStyles.statCard}>
            <Icon name="groups" size={32} color="#4CAF50" />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>Committees</Paragraph>
            <Heading level={5} weight='Bold'  style={imamStyles.statValue}>{committees?.length}</Heading>
          </View>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarIndicatorStyle: { backgroundColor: Colors.black },
            tabBarStyle: { backgroundColor: "transparent", elevation: 0 },
          }}>
          <Tab.Screen name="Poor People">
            {() => <PeopleTab data={people} onAdd={handleAddPerson} onEdit={handleEdit} onDelete={handleDelete} />}
          </Tab.Screen>
          <Tab.Screen name="Committee">
            {() => <CommitteeTab data={committees} onEdit={handleEdit} onDelete={handleDelete} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </SafeAreaWrapper>
  );
};


export default DashboardScreen;