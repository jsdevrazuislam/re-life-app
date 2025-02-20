import { View, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
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
              {t('masjidDetails')}
            </Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Icon name="user-circle" size={24} />
            </TouchableOpacity>
          </View>
          <View style={homeViewDetailsStyles.mainContent}>
            {/* Masjid Image */}
            <TouchableOpacity
              onPress={() => {
                setSelectedImage(baseURLPhoto(singleData?.masjidProfile));
                setVisible(true);
              }}
            >
              <Image
                source={{ uri: baseURLPhoto(singleData?.masjidProfile) }}
                style={homeViewDetailsStyles.masjidImage}
              />
            </TouchableOpacity>

            {/* Masjid Info */}
            <View style={homeViewDetailsStyles.content}>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                  Masjid Name:
                </Paragraph>
                <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                  {singleData?.name}
                </Paragraph>
              </View>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                  Location:
                </Paragraph>
                <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                  {`${singleData.location.district} > ${singleData.location.upazila} > ${singleData.location.union} > ${singleData.location.village}`}
                </Paragraph>
              </View>
            </View>

            {/* Imam Details */}
            <View style={homeViewDetailsStyles.imamDetails}>
              <Heading level={5} weight="Bold">
                Imam Details
              </Heading>

              <Carousel
                data={singleData?.imamDetails || []}
                ref={carouselRef}
                renderItem={({ item }) => (
                  <View style={[homeViewDetailsStyles.imamCard]}>
                    {item.isPresentImam && (
                      <Paragraph level="XSmall" weight="Medium" style={homeViewDetailsStyles.subTitle}>
                        Present Imam
                      </Paragraph>
                    )}
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedImage(baseURLPhoto(item.profilePicture));
                        setVisible(true);
                      }}
                    >
                      <Image
                        source={{ uri: baseURLPhoto(item.profilePicture) }}
                        style={homeViewDetailsStyles.profileImage}
                      />
                    </TouchableOpacity>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <View style={homeViewDetailsStyles.labelIcon}>
                        <Icon name="user-circle" size={16} color={Colors.text} />
                        <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                          Name:
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
                          Mobile:
                        </Paragraph>
                      </View>
                      <Paragraph level="Small" weight="Medium" style={homeViewDetailsStyles.value}>
                        {item.mobile}
                      </Paragraph>
                    </View>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <View style={homeViewDetailsStyles.labelIcon}>
                        <MaterialIcons name="location-on" size={16} />
                        <Paragraph level="Small" weight="Bold" style={homeViewDetailsStyles.label}>
                          Address:
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
                height={200}
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
              title="Committee Details"
              subTitle={`Total Members: ${singleData.committeeDetails?.length || 0}`}
              data={singleData?.committeeDetails?.map((item) => ({
                ...item,
                photo: String(baseURLPhoto(item.profilePicture)), 
              })) || []}
              imageKey="photo"
            />
              <HorizontalCardList
                title="Poor People Information"
                subTitle={`Total People: ${singleData.poorPeopleInformations?.length || 0}`}
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
