import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Paragraph from './ui/Paragraph';
import { Colors } from '../configs/colors';
import { useRoute } from '@react-navigation/native';
import ImageComponent from './ui/Image';
import ImageView from 'react-native-image-zoom-viewer';
import { useTranslation } from '../hooks/useTranslation';
import { styles } from './PersonalScreen'
import Heading from './ui/Heading';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const HousingScreen = () => {

  const route = useRoute<ImamHomeScreenRouteProp>();
  const data = route.params?.data as HomeSearchResultDatas;
  const housingInfo = data.poorPeopleInformations.homeDetails;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { t } = useTranslation()

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  const housingDetails = [
    { icon: 'home', label: t('hasHouse'), value: housingInfo.hasHouse },
    { icon: 'home-roof', label: t('houseType'), value: housingInfo.houseType },
    { icon: 'map-marker', label: t('hasLand'), value: housingInfo.hasLand },
    { icon: 'earth', label: t('isOwnLand'), value: housingInfo.isOwnLand },
    { icon: 'ruler-square', label: t('landSize'), value: housingInfo.landSize },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Heading level={5} weight='Bold'>{t("homeDetailsTitle1")}</Heading>

      <View style={styles.detailsContainer}>
        {housingDetails.map((item, index) => (
          item.value && (
            <View key={index} style={styles.detailItem}>
              <MaterialIcons
                name={item.icon}
                size={ms(20)}
                color={Colors.primary}
                style={styles.icon}
              />
              <View style={styles.textContainer}>
                <Paragraph level='Small' weight='Bold' style={styles.label}>{item.label}</Paragraph>
                <Paragraph level='Small' weight='Medium' style={styles.value}>{item.value}</Paragraph>
              </View>
            </View>
          )
        ))}
      </View>
      <Paragraph level='Large' weight='Bold' style={styles.label}>{t('beggarHouseImages')}</Paragraph>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {housingInfo.houseImages?.map((item, index) => (
          <View
            key={item._id || index}
            style={styles.masjidImage}
          >
            <ImageComponent
              source={item?.url}
              style={{ width: Dimensions.get('window').width / 3.2, height: 120, borderRadius: 10 }}
            />
            <TouchableOpacity style={styles.expanded} onPress={() => openImage(item.url)}>
              <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(12)} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
        <ImageView renderHeader={() => (
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        )} imageUrls={[{ url: selectedImage }]} onCancel={() => setVisible(false)} enableSwipeDown />
      </Modal>
    </ScrollView>
  );
};

export default HousingScreen;
