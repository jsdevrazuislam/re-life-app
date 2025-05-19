import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { baseURLPhoto } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from '../components/ui/Image';
import CustomTabs from '../components/CustomTabs';
import { convertNumber } from '../utils/helper';
import { StatsSkeleton } from '../components/screens/rehabilitation-list';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ApiStrings from '../lib/apis_string';
import AppButton from '../components/ui/AppButton';





const DashboardScreen = () => {
  const { t } = useTranslation();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<ImamHomeScreenRouteProp>();
  const { loading, request, error } = useApi();
  const { logout, user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('beggers');
  const [people, setPeople] = useState<PoorPeople[]>([])
  const [committees, setCommittee] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEndReached, setIsEndReached] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);



  const toggleMenu = useCallback(() => {
    setMenuVisible(prev => !prev);
  }, []);

  const handleAddPerson = useCallback(() => {
    navigation.navigate('AddPoorPeopleScreen');
  }, [navigation]);

  const handleLogout = async () => {
    toggleMenu();
    await logout();
  };

  useEffect(() => {
    if (route.params?.activeTab) {
      setActiveTab(route.params.activeTab);
    }
  }, [route.params?.activeTab]);

  const memoizedPeople = useMemo(() => people ?? [], [people]);
  const memoizedCommittees = useMemo(() => committees ?? [], [committees]);

  const tabs = useMemo(() => [
    { key: 'beggers', label: t('beggers') },
    ...(user?.role === 'imam' ? [{ key: 'committees', label: t('committees') }] : []),
  ], [t, user?.role]);

  const fetchData = async (pageNum: number = 1, isRefresh: boolean = false) => {
    if(!user) return;
    try {
      if (!isRefresh && (loadingMore || pageNum > totalPages)) return;

      setLoadingMore(true);
      setIsEndReached(true);

      const { data } = await request(
        user?.role === 'imam' ? 'get' : 'post',
        user?.role === 'imam' ? ApiStrings.GET_MASJID_DETAILS(`${user?.masjid._id ?? ''}?page=${pageNum}`) : `${ApiStrings.GET_MASJID_DETAILS_FOR_MODERATOR}?page=${pageNum}`, { masjids: user?.masjids?.map((masjid) => masjid._id) }
      );

      setCommittee(data?.committees)
      setPeople(data?.poorPeople)
      setStats({
        totalCommittees: data?.totalCommittees,
        totalPoorPeople: data?.totalPoorPeople
      });
      setTotalPages(data?.pagination?.totalPage || 1);

      if (pageNum === 1) {
        setPeople(data?.poorPeople)
      } else {
        setPeople(prevData => [...prevData, ...data?.poorPeople]);
      }

      setPage(pageNum);
    } finally {
      setLoadingMore(false);
      setTimeout(() => setIsEndReached(false), 1000);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchData(1);
    };
    loadInitialData();
  }, [user]);


  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(1, true);
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (loadingMore || isEndReached || page >= totalPages) return;
    await fetchData(page + 1);
  };

  const renderError = () => (
    <View style={imamStyles.errorContainer}>
      <MaterialIcons name="error-outline" size={40} color={Colors.danger} />
      <Text style={imamStyles.errorText}>{error}</Text>
      <AppButton
        text="পুনরায় চেষ্টা করুন"
        onPress={onRefresh}
      />
    </View>
  );

  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        {/* Header */}
        <View style={imamStyles.header}>
          <View>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{t('greeting')},</Paragraph>
            <Paragraph level='Medium' weight='Bold' style={imamStyles.greeting}>{user?.fullName}</Paragraph>
          </View>
          <TouchableOpacity onPress={toggleMenu}>
            {user?.profileUrl ? (
              <ImageComponent imageStyle={{ borderRadius: 40 }} source={baseURLPhoto(user?.profileUrl ?? "")} style={imamStyles.profileAvatar} />
            ) : (
              <EvilIcons name='user' />
            )}
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        {stats ? (
          <>
            <View style={imamStyles.statsContainer}>
              <View style={imamStyles.statCard}>
                <Icon name="people" size={32} color={Colors.primary} />
                <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>{t("totalBeggers")}</Paragraph>
                <Heading level={5} weight='Bold' style={imamStyles.statValue}>{convertNumber(stats.totalPoorPeople ?? 0)}</Heading>
              </View>
              {user?.role === 'imam' && (
                <View style={imamStyles.statCard}>
                  <Icon name="groups" size={32} color={Colors.primary} />
                  <Paragraph level='Small' weight='Medium' style={imamStyles.statLabel}>{t("totalCommittees")}</Paragraph>
                  <Heading level={5} weight='Bold' style={imamStyles.statValue}>{convertNumber(stats?.totalCommittees ?? 0)}</Heading>
                </View>
              )}
            </View>
          </>
        ) : (
          <StatsSkeleton />
        )}


        {/* Tabs & Content */}
        {error ? renderError() : <View style={{ flex: 1, marginTop: 20 }}>
          <CustomTabs tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />
          {activeTab === 'beggers' && <PeopleTab refreshing={refreshing} onRefresh={onRefresh} loadMore={loadMore} loadingMore={loadingMore} page={page} totalPages={totalPages} loading={loading} data={memoizedPeople} onAdd={handleAddPerson} />}
          {user?.role === 'imam' && activeTab === 'committees' && <CommitteeTab loading={loading} data={memoizedCommittees} />}
        </View>}

        {/* Lazy Loaded Menu Modal */}
        {isMenuVisible && (
          <Modal visible={isMenuVisible} transparent animationType="fade" onRequestClose={toggleMenu}>
            <TouchableOpacity style={imamStyles.overlay} onPress={toggleMenu} />
            <View style={imamStyles.menu}>
              {user?.role === 'imam' && (
                <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                  toggleMenu();
                  navigation.navigate('ProfileScreen');
                }}>
                  <Feather name="user" size={20} color={Colors.black} />
                  <Text style={imamStyles.menuText}>{t('profileTitle')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={imamStyles.menuItem} onPress={() => {
                toggleMenu();
                navigation.navigate('ImamSettingsScreen');
              }}>
                <Feather name="settings" size={20} color={Colors.black} />
                <Text style={imamStyles.menuText}>{t('settingsTitle')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={imamStyles.menuItem} onPress={handleLogout}>
                <Feather name="log-out" size={20} color="red" />
                <Text style={[imamStyles.menuText, { color: "red" }]}>{t('logout')}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaWrapper>
  );
};


export default DashboardScreen;