import {
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  NativeSyntheticEvent, NativeScrollEvent,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Paragraph from '../components/ui/Paragraph';
import globalStyles from '../styles/global.style';
import homeStyles from '../styles/home.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLogo from '../components/ui/AppLogo';
import AreaSelector from '../components/AreaSelector';
import { useTranslation } from '../hooks/useTranslation';
import { districts, unions, upazilas, villages } from '../data/dump';
import AppButton from '../components/ui/AppButton';
import FokirCard from '../components/FokirCard';
import { Colors } from '../configs/colors';
import ApiStrings from '../lib/apis_string';
import api from '../lib/api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { useAuthStore } from '../store/store';

const HomeScreen = () => {
  const { t } = useTranslation();
  const { masjids: masjidsNameList } = useAuthStore();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [masjids, setMasjids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    district: '',
    upazila: '',
    union: '',
    village: '',
    name: '',
  });

  const [hasMore, setHasMore] = useState(true);

  const fetchMasjids = async (page = 1, newFilters = filters) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        ...newFilters,
        page: page.toString(),
        limit: '10',
      }).toString();
      const { data } = await api.get(`${ApiStrings.GET_MASJIDS}?${query}`);

      if (data.data.masjids.length < 10) {
        setHasMore(false);
      }

      setMasjids(
        page === 1 ? data.data.masjids : [...masjids, ...data.data.masjids],
      );
      setCurrentPage(data.data.currentPage);
      setTotalPages(data.data.totalPages);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error fetching masjids:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (value: string, type: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type.toLowerCase()]: value,
    }));
  };

  const getSearchResult = () => {
    setMasjids([]);
    setCurrentPage(1);
    fetchMasjids(1, filters);
  };


  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;

    if (isNearBottom && !isLoading) {
      fetchMasjids(currentPage + 1, filters);
    }
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View style={globalStyles.container}>
          <View style={homeStyles.headerSection}>
            <AppLogo />
            <Paragraph level="Medium">{t('searchMasjid')}</Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Icon name="user-circle" size={24} />
            </TouchableOpacity>
          </View>

          <AreaSelector label="Masjid Name" placeholder="Select Masjid Name" data={masjidsNameList || []} onChange={value => handleValueChange(value, 'name')} />
          <AreaSelector label="District" placeholder="Select District" data={districts} onChange={value => handleValueChange(value, 'district')} />
          <AreaSelector label="Upazila" placeholder="Select Upazila" data={upazilas} onChange={value => handleValueChange(value, 'upazila')} />
          <AreaSelector label="Union" placeholder="Select Union" data={unions} onChange={value => handleValueChange(value, 'union')} />
          <AreaSelector label="Village" placeholder="Select Village" data={villages} onChange={value => handleValueChange(value, 'village')} />

          <AppButton style={{ marginTop: 30 }} text={t('homeButton')} onPress={getSearchResult} />

          {masjids.length > 0 ? (
            <Animated.View style={[homeStyles.viewArea, { opacity: fadeAnim }]}>
              {masjids.map((item, index) => (
                <FokirCard key={index} data={item} />
              ))}
            </Animated.View>
          ) : (
            !isLoading && <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>{t('noResultsFound')}</Paragraph>
          )}

          {isLoading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
