import { View, TouchableOpacity, Dimensions, Modal } from 'react-native';
import React, { useRef, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../styles/global.style';
import BackButton from '../components/BackButton';
import homeViewDetailsStyles from '../styles/homeViewDetails.styles';
import { useTranslation } from '../hooks/useTranslation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../configs/colors';
import HorizontalCardList from '../components/HorizontalCardList';
import Carousel from 'react-native-reanimated-carousel';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { baseURLPhoto } from '../lib/api';
import ImageView from 'react-native-image-zoom-viewer';
import ImageComponent from '../components/ui/Image';

const HomeViewDetailsInfoScreen = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<HomeViewDetailsInfoRouteProp>();
  const singleData = route?.params?.item as Masjids;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleSnapToItem = (index: number) => {
    setActiveIndex(index);
  };

  const handleDotPress = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ index });
    }
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={homeViewDetailsStyles.headerSection}>
            <BackButton />
            <Paragraph level="Medium" weight="Bold" style={homeViewDetailsStyles.headerTitle}>
              {t('details')}
            </Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Icon name="user-circle" size={24} />
            </TouchableOpacity>
          </View>
          <View style={homeViewDetailsStyles.mainContent}>
            {/* Masjid Image */}
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(singleData?.masjidProfile);
                setVisible(true);
              }}
            >
              <ImageComponent
                source={singleData?.masjidProfile}
                style={homeViewDetailsStyles.masjidImage}
                imageStyle={{ borderRadius: 10 }}
              />
            </TouchableOpacity>

            {/* Masjid Info */}
            <View style={homeViewDetailsStyles.content}>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                  {t('masjidName')}:
                </Paragraph>
                <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                  {singleData?.name}
                </Paragraph>
              </View>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                  {t('masjidLocationLabel')}:
                </Paragraph>
                <Paragraph level="Small" weight="Medium" style={[homeViewDetailsStyles.value, { flexShrink: 1}]}>
                  {`${singleData.location.district} > ${singleData.location.upazila} > ${singleData.location.union} > ${singleData.location.village}`}
                </Paragraph>
              </View>
            </View>

            {/* Imam Details */}
            <View style={homeViewDetailsStyles.imamDetails}>
              <Heading level={5} weight="Bold">
                {t('imamDetails')}
              </Heading>

              <Carousel
                data={singleData?.imamDetails || []}
                ref={carouselRef}
                renderItem={({ item }) => (
                  <View style={[homeViewDetailsStyles.imamCard]}>
                    {item.isPresentImam && (
                      <Paragraph level="XSmall" weight="Medium" style={homeViewDetailsStyles.subTitle}>
                        {t('presentImam')}
                      </Paragraph>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(item.profilePicture);
                        setVisible(true);
                      }}
                    >
                      <ImageComponent
                        source={item.profilePicture}
                        style={homeViewDetailsStyles.profileImage}
                        imageStyle={{ borderRadius: 50 }}
                      />
                    </TouchableOpacity>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <View style={homeViewDetailsStyles.labelIcon}>
                        <Icon name="user-circle" size={16} color={Colors.text} />
                        <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                          {t('name')}:
                        </Paragraph>
                      </View>
                      <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                        {item.name}
                      </Paragraph>
                    </View>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <View style={homeViewDetailsStyles.labelIcon}>
                        <MaterialIcons name="phone" size={16} color={Colors.text} />
                        <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                          {t('mobile')}:
                        </Paragraph>
                      </View>
                      <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                        {item.emailOrPhone}
                      </Paragraph>
                    </View>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <View style={homeViewDetailsStyles.labelIcon}>
                        <MaterialIcons name="location-on" size={16} />
                        <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                          {t('address')}:
                        </Paragraph>
                      </View>
                      <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                        {item.address}
                      </Paragraph>
                    </View>
                  </View>
                )}
                onSnapToItem={handleSnapToItem}
                loop={false}
                width={Dimensions.get('window').width * 0.9}
                height={220}
              />

              {/* Carousel Dots */}
              <View style={homeViewDetailsStyles.dotsContainer}>
                {singleData.imamDetails?.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDotPress(index)}
                    style={[
                      homeViewDetailsStyles.dot,
                      activeIndex === index ? homeViewDetailsStyles.activeDot : homeViewDetailsStyles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            {/* Committee & Poor People Information */}
            <View style={homeViewDetailsStyles.content}>
            <HorizontalCardList
              title={t('committeeDetails')}
              subTitle={`${t("totalMembers")}: ${singleData.committeeDetails?.length || 0}`}
              data={singleData?.committeeDetails?.map((item) => ({
                ...item,
                photo: String(baseURLPhoto(item.profilePicture)), 
              })) || []}
              imageKey="photo"
              isCommitteeCard={true}
            />
              <HorizontalCardList
                title={t('poorPeopleInformation')}
                subTitle={`${t("totalMembers")}: ${singleData.poorPeopleInformations?.length || 0}`}
                imageKey="newPhoto"
                onPress={(data) => navigation.navigate('PoorPeopleView', { item: data })}
                data={
                  singleData?.poorPeopleInformations?.map(person => ({
                    ...person,
                    newPhoto: String(baseURLPhoto(person.photoUrl)),
                  })) || []
                }
              />
            </View>
          </View>
        </View>

        <Modal visible={visible} transparent={true} onRequestClose={() => setVisible(false)}>
          <ImageView imageUrls={[{ url: selectedImage }]} onCancel={() => setVisible(false)} enableSwipeDown />
        </Modal>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeViewDetailsInfoScreen;
