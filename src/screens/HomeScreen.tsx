import {
  View,
  Animated,
  ActivityIndicator,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ScrollView,
  RefreshControl,
  TextInput
} from 'react-native';
import React, { useState, useCallback } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Paragraph from '../components/ui/Paragraph';
import globalStyles from '../styles/global.style';
import homeStyles from '../styles/home.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLogo from '../components/ui/AppLogo';
import { useTranslation } from '../hooks/useTranslation';
import AppButton from '../components/ui/AppButton';
import FokirCard from '../components/FokirCard';
import { Colors } from '../configs/colors';
import ApiStrings from '../lib/apis_string';
import api from '../lib/api';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ms } from 'react-native-size-matters';


const HomeScreen = () => {
  const { t } = useTranslation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [masjids, setMasjids] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [filters, setFilters] = useState({
    district: '',
    upazila: '',
    union: '',
    village: '',
    name: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onRefresh = useCallback(() => {
    console.log("run app")
  }, []);

  const fetchMasjids = async (page = 1, newFilters = filters) => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(Object.entries(newFilters).filter(([_, value]) => value))
      ).toString();

      const { data } = await api.get(`${ApiStrings.GET_MASJIDS}?${query}&page=${page}&limit=10`);


      if (data.data.masjids.length === 0) {
        setErrorMessage(t('noResultsFound'));
      } else {
        setErrorMessage('');
      }

      setMasjids(page === 1 ? data.data.masjids : [...masjids, ...data.data.masjids]);
      setCurrentPage(data.data.currentPage);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error('Error fetching masjids:', error);
      setErrorMessage(t('errorFetchingData'));
    } finally {
      setIsLoading(false);
      setIsSearch(false);
    }
  };

  const handleValueChange = (value: string, type: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type.toLowerCase()]: value,
    }));
  };

  const getSearchResult = () => {
    setIsSearch(true);
    setMasjids([]);
    setCurrentPage(1);
    setErrorMessage('');
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
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={globalStyles.container}>
          <View style={homeStyles.headerSection}>
            <AppLogo />
            <Paragraph level="Medium">{t('searchButton')}</Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Icon name="user-circle" size={24} />
            </TouchableOpacity>
          </View>

          <View style={homeStyles.inputContainer}>
            <Ionicons name="card-outline" size={ms(24)} color={Colors.placeholder} />
            <TextInput
              style={homeStyles.input}
              placeholder="Enter ID number"
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
            />

          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FaceScanScreen')} style={homeStyles.button}>
            <Ionicons name="scan-outline" size={ms(16)} color={Colors.white} />
            <Paragraph style={homeStyles.buttonText} level='Small' weight='Medium'>
              {t('findBigger')}
            </Paragraph>
          </TouchableOpacity>

          {masjids.length > 0 ? (
            <Animated.View style={[homeStyles.viewArea, { opacity: fadeAnim }]}>
              {masjids.map((item, index) => (
                <FokirCard key={index} data={item} />
              ))}
            </Animated.View>
          ) : (
            !isLoading && isSearch || errorMessage && <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>{errorMessage || t('noResultsFound')}</Paragraph>
          )}

          {isLoading && <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
