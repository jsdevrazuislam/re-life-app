import { View, Animated, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
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

const HomeScreen = () => {
  const { t } = useTranslation();
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
  });

  const fetchMasjids = async (page = 1, newFilters = filters) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({ ...newFilters, page: page.toString(), limit: "10" }).toString();
      const { data } = await api.get(`${ApiStrings.GET_MASJIDS}?${query}`);

      setMasjids(page === 1 ? data.data.masjids : [...masjids, ...data.data.masjids]);
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type.toLowerCase()]: value,
    }));
  };

  const getSearchResult = () => {
    setMasjids([]); 
    setCurrentPage(1);
    fetchMasjids(1, filters);
  };

  const loadMoreMasjids = () => {
    if (currentPage < totalPages && !isLoading) {
      fetchMasjids(currentPage + 1, filters);
    }
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
        <View style={globalStyles.container}>
          <View style={homeStyles.headerSection}>
            <AppLogo />
            <Paragraph level="Medium">{t('searchMasjid')}</Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Icon name="user-circle" size={24} />
            </TouchableOpacity>
          </View>

          <AreaSelector
            label="District"
            data={districts}
            onChange={(value) => handleValueChange(value, 'District')}
          />
          <AreaSelector
            label="Upazila"
            data={upazilas}
            onChange={(value) => handleValueChange(value, 'Upazila')}
          />
          <AreaSelector
            label="Union"
            data={unions}
            onChange={(value) => handleValueChange(value, 'Union')}
          />
          <AreaSelector
            label="Village"
            data={villages}
            onChange={(value) => handleValueChange(value, 'Village')}
          />

          <AppButton
            style={{ marginTop: 30 }}
            text={t('homeButton')}
            onPress={getSearchResult}
          />

          {isLoading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
          ) : masjids.length > 0 ? (
            <Animated.View style={[homeStyles.viewArea, { opacity: fadeAnim }]}>
              <FlatList
                data={masjids}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <FokirCard data={item} />}
                onEndReached={loadMoreMasjids}
                onEndReachedThreshold={0.5} 
              />
            </Animated.View>
          ) : (
            <Paragraph level='Small' style={{ textAlign: 'center', marginTop: 20 }}>
              {t('noResultsFound')}
            </Paragraph>
          )}
        </View>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
