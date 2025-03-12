import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
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
import { showToast } from '../utils/toast';
import { baseURLPhoto } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from '../components/ui/Image';
import CustomTabs from '../components/CustomTabs';
import { convertNumber } from '../utils/helper';






const DashboardScreen = () => {
  const { t } = useTranslation()
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<ImamHomeScreenRouteProp>();
  const toggleMenu = () => setMenuVisible(!isMenuVisible);
  const { loading } = useApi();
  const { logout, user, people, committees } = useAuthStore()
  const [activeTab, setActiveTab] = useState('beggers');

  const tabs = [
    { key: 'beggers', label: t('beggers') },
    { key: 'committees', label: t('committees') },
  ];

  const handleAddPerson = () => {
    navigation.navigate('AddPoorPeopleScreen')
  };

  const handleLogout = async () => {
    toggleMenu()
    await logout()
    showToast('success', 'Logout Successfully')
  }

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params?.activeTab]);


  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <View style={imamStyles.header}>
          <View>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{t('greeting')},</Paragraph>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{user?.fullName}</Paragraph>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            {user?.profileUrl ? <ImageComponent imageStyle={{ borderRadius: 40 }} source={baseURLPhoto(user?.profileUrl ?? "")} style={imamStyles.profileAvatar} /> : <EvilIcons name='user' />}
          </TouchableOpacity>
          <Modal
            visible={isMenuVisible}
            transparent
            animationType="fade"
            onRequestClose={toggleMenu}
          >
            <TouchableOpacity style={imamStyles.overlay} onPress={toggleMenu} />
            <View style={imamStyles.menu}>
              {
                user?.role === 'imam' && <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                  toggleMenu()
                  navigation.navigate('ProfileScreen')
                }}>
                  <Feather name="user" size={20} color={Colors.black} />
                  <Text style={imamStyles.menuText}>{t('profileTitle')}</Text>
                </TouchableOpacity>
              }

              <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                toggleMenu()
                navigation.navigate('ImamSettingsScreen')
              }}>
                <Feather name="settings" size={20} color={Colors.black} />
                <Text style={imamStyles.menuText}>{t('settingsTitle')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={imamStyles.menuItem} onPress={handleLogout}>
                <Feather name="log-out" size={20} color="red" />
                <Text style={[imamStyles.menuText, { color: "red" }]}>
                  {t('logout')}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={imamStyles.statsContainer}>
          <View style={imamStyles.statCard}>
            <Icon name="people" size={32} color={Colors.primary} />
            <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>{t("totalBeggers")}</Paragraph>
            <Heading level={5} weight='Bold' style={imamStyles.statValue}>{convertNumber(people?.length)}</Heading>
          </View>
          {
            user?.role === 'imam' && <View style={imamStyles.statCard}>
              <Icon name="groups" size={32} color={Colors.primary} />
              <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>{t("totalCommittees")}</Paragraph>
              <Heading level={5} weight='Bold' style={imamStyles.statValue}>{convertNumber(committees?.length)}</Heading>
            </View>
          }
        </View>
        <View style={{ flex: 1, marginTop: 20 }}>
          <CustomTabs tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />
          {activeTab === 'beggers' && <PeopleTab loading={loading} data={people} onAdd={handleAddPerson} />}
          {activeTab === 'committees' && <CommitteeTab loading={loading} data={committees} />}
        </View>
      </View>
    </SafeAreaWrapper>
  );
};


export default DashboardScreen;