import React, { useState } from 'react';
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

const Tab = createMaterialTopTabNavigator();

const mockPeopleData = [
  { id: 1, name: 'John Doe', age: 35, needs: 'Food, Medicine' },
  { id: 2, name: 'Jane Smith', age: 28, needs: 'Clothing, Shelter' },
];

const mockCommitteeData = [
  { id: 1, name: 'Community Center', members: 15, location: 'Downtown' },
  { id: 2, name: 'Health Clinic', members: 8, location: 'Suburbs' },
];



const DashboardScreen = () => {
  const [people, setPeople] = useState(mockPeopleData);
  const [committees, setCommittees] = useState(mockCommitteeData);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const toggleMenu = () => setMenuVisible(!isMenuVisible);

  // Dynamic greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleAddPerson = () => {/* Add logic */ };
  const handleAddCommittee = () => {/* Add logic */ };
  const handleEdit = (id: number) => {/* Add logic */ };
  const handleDelete = (id: number) => {/* Add logic */ };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <View style={globalStyles.container}>
        <View style={imamStyles.header}>
          <View>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{getGreeting()},</Paragraph>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>Admin</Paragraph>
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
                navigation.navigate('ProfileScreen')
                toggleMenu()
              }}>
                <Feather name="user" size={20} color="#333" />
                <Text style={imamStyles.menuText}>Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={imamStyles.menuItem} onPress={() => console.log("Settings clicked")}>
                <Feather name="settings" size={20} color="#333" />
                <Text style={imamStyles.menuText}>Settings</Text>
              </TouchableOpacity>

              <TouchableOpacity style={imamStyles.menuItem} onPress={() => console.log("Logout clicked")}>
                <Feather name="log-out" size={20} color="red" />
                <Text style={[imamStyles.menuText, { color: "red" }]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={imamStyles.statsContainer}>
          <View style={imamStyles.statCard}>
            <Icon name="people" size={32} color="#3F51B5" />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>Total People</Paragraph>
            <Heading level={5} weight='Bold' style={imamStyles.statValue}>1,234</Heading>
          </View>
          <View style={imamStyles.statCard}>
            <Icon name="groups" size={32} color="#4CAF50" />
            <Text style={imamStyles.statLabel}>Committees</Text>
            <Text style={imamStyles.statValue}>45</Text>
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