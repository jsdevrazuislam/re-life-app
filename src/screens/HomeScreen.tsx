import { View, Text, Animated, ActivityIndicator } from 'react-native';
import React, { useState, useRef } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Paragraph from '../components/ui/Paragraph';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../styles/global.style';
import homeStyles from '../styles/home.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppLogo from '../components/ui/AppLogo';
import AreaSelector from '../components/AreaSelector';
import { useTranslation } from '../hooks/useTranslation';
import { informations } from '../data/dump';
import AppButton from '../components/ui/AppButton';
import FokirCard from '../components/FokirCard';
import { Colors } from '../configs/colors';

const HomeScreen = () => {
  const { t } = useTranslation();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [selectedUnion, setSelectedUnion] = useState<string>('');
  const [selectedVillage, setSelectedVillage] = useState<string>('');
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getDropdownData = (key: 'district' | 'upazila' | 'union' | 'village') => {
    return Array.from(new Set(informations.map(item => item.location[key])))
      .map(value => ({ label: value, value }));
  };

  const handleValueChange = (value: string, type: string) => {
    switch (type) {
      case 'District':
        setSelectedDistrict(value);
        break;
      case 'Upazila':
        setSelectedUpazila(value);
        break;
      case 'Union':
        setSelectedUnion(value);
        break;
      case 'Village':
        setSelectedVillage(value);
        break;
      default:
        break;
    }
  };

  const getSearchResult = () => {
    setLoading(true);
    setTimeout(() => {
      const results = informations.filter(item =>
        (!selectedDistrict || item.location.district === selectedDistrict) &&
        (!selectedUpazila || item.location.upazila === selectedUpazila) &&
        (!selectedUnion || item.location.union === selectedUnion) &&
        (!selectedVillage || item.location.village === selectedVillage)
      );

      setFilteredData(results);
      setLoading(false);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={homeStyles.headerSection}>
            <AppLogo />
            <Paragraph level="Medium">{t('searchMasjid')}</Paragraph>
            <Icon name="user-circle" size={24} />
          </View>

          <AreaSelector
            label="District"
            data={getDropdownData('district')}
            onChange={(value) => handleValueChange(value, 'District')}
          />
          <AreaSelector
            label="Upazila"
            data={getDropdownData('upazila')}
            onChange={(value) => handleValueChange(value, 'Upazila')}
          />
          <AreaSelector
            label="Union"
            data={getDropdownData('union')}
            onChange={(value) => handleValueChange(value, 'Union')}
          />
          <AreaSelector
            label="Village"
            data={getDropdownData('village')}
            onChange={(value) => handleValueChange(value, 'Village')}
          />

          <AppButton
            style={{ marginTop: 30 }}
            text={t('homeButton')}
            onPress={getSearchResult}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
          ) : filteredData.length > 0 ? (
            <Animated.View style={[homeStyles.viewArea, { opacity: fadeAnim }]}>
              {filteredData.map((item, index) => (
                <FokirCard key={index} data={item} />
              ))}
            </Animated.View>
          ) : (
            <Paragraph level='Small' style={{ textAlign: 'center', marginTop: 20 }}>
              {t('noResultsFound')}
            </Paragraph>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;
