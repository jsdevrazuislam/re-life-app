import {
  View,
  Animated,
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
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';



const HomeScreen = () => {
  const { t } = useTranslation();
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [masjids, setMasjids] = useState<HomeSearchResultDatas[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchInput, setSearchInput] = useState('');


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setMasjids([]);
    setCurrentPage(1);
    setErrorMessage('');
    fetchMasjids(1, searchInput);
    setRefreshing(false);
  }, [searchInput]);

  const fetchMasjids = async (page = 1, idCardNumber = '') => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await api.get(`${ApiStrings.GET_MASJIDS}`, {
        params: {
          page,
          limit: 10,
          idCardNumber: idCardNumber.trim() || undefined,
        },
      });

      if (data.data.data?.length === 0) {
        setErrorMessage(t('noResultsFound'));
      } else {
        setErrorMessage('');
      }

      setMasjids(page === 1 ? data.data.data : [...masjids, ...data.data.data]);
      setCurrentPage(data.data.page);

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


  const getSearchResult = () => {
    setIsSearch(true);
    setMasjids([]);
    setCurrentPage(1);
    setErrorMessage('');
    fetchMasjids(1, searchInput);

  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    const isNearBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 100;

    if (isNearBottom && !isLoading) {
      fetchMasjids(currentPage + 1);
    }
  };

  return (
    <SafeAreaWrapper>
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
              placeholder={t('homeSearchPlaceholder')}
              placeholderTextColor={Colors.placeholder}
              keyboardType="numeric"
              value={searchInput}
              onChangeText={setSearchInput}
            />

          </View>
          <TouchableOpacity onPress={() => navigation.navigate('FaceScanScreen')} style={homeStyles.button}>
            <Ionicons name="scan-outline" size={ms(16)} color={Colors.white} />
            <Paragraph style={homeStyles.buttonText} level='Small' weight='Medium'>
              {t('findBigger')}
            </Paragraph>
          </TouchableOpacity>

          <AppButton style={{ marginTop: 20 }} text={t('searchPlaceholder')} onPress={getSearchResult} />

          {masjids.length > 0 ? (
            <Animated.View style={[homeStyles.viewArea, { opacity: fadeAnim }]}>
              {masjids.map((item, index) => (
                <FokirCard key={index} data={item} />
              ))}
            </Animated.View>
          ) : (
            !isLoading && isSearch || errorMessage && <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>{errorMessage || t('noResultsFound')}</Paragraph>
          )}

          {isLoading && 
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonPlaceholder key={index}>
                <View style={[homeStyles.flexLayout, { width: '100%', padding: 0, marginTop: 20}]}>
                  <View style={[homeStyles.image, { borderRadius: 5 }]} />
                  <View style={homeStyles.textContainer}>
                    <View style={{ maxWidth: '90%', width: '100%' }}>
                      <View style={homeStyles.skeletonText} />
                      <View style={homeStyles.skeletonText} />
                      <View style={homeStyles.skeletonText} />
                    </View>
                    <View style={homeStyles.skeletonButton} />
                  </View>
                </View>
              </SkeletonPlaceholder>
            ))
          }

        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
