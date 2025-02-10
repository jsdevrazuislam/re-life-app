import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useRef, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { ScrollView } from 'react-native-gesture-handler';
import globalStyles from '../styles/global.style';
import BackButton from '../components/BackButton';
import homeViewDetailsStyles from '../styles/homeViewDetails.styles';
import { useTranslation } from '../hooks/useTranslation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { singleData } from '../data/dump';
import { Colors } from '../configs/colors';
import HorizontalCardList from '../components/HorizontalCardList';
import Carousel from 'react-native-reanimated-carousel';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';

const HomeViewDetailsInfoScreen = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<any>(null);

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
            <BackButton styles={{ padding: 0 }} />
            <Paragraph level='Medium' weight='Bold' style={homeViewDetailsStyles.headerTitle}>
              {t('masjidDetails')}
            </Paragraph>
            <Icon name="user-circle" size={24} />
          </View>
          <View style={homeViewDetailsStyles.mainContent}>
            <Image
              source={{ uri: singleData.masjid_photo }}
              style={homeViewDetailsStyles.masjidImage}
            />
            <View style={homeViewDetailsStyles.content}>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph level='Small' weight='Bold' style={homeViewDetailsStyles.label}>Masjid Name:</Paragraph>
                <Paragraph level='Small' weight='Medium' style={homeViewDetailsStyles.value}>
                  {singleData.masjid_name}
                </Paragraph>
              </View>
              <View style={homeViewDetailsStyles.flexLayout}>
                <Paragraph  level='Small' weight='Bold' style={homeViewDetailsStyles.label}>Location:</Paragraph>
                <Paragraph level='Small' weight='Medium' style={homeViewDetailsStyles.value}>
                  {`${singleData.location.district} > ${singleData.location.upazila} > ${singleData.location.union} > ${singleData.location.village}`}
                </Paragraph>
              </View>
            </View>

            <View style={homeViewDetailsStyles.imamDetails}>
              <Heading level={5} weight='Bold'>
                Imam Details
              </Heading>
              <Paragraph level='XSmall' weight='Medium' style={homeViewDetailsStyles.subTitle}>
                Present Imam Details
              </Paragraph>

              <Carousel
                data={singleData.imam_details}
                ref={carouselRef}
                renderItem={({ item }) => (
                  <View style={[homeViewDetailsStyles.imamCard]}>
                    <Image
                      source={{ uri: item.profilePictureUrl }}
                      style={homeViewDetailsStyles.profileImage}
                    />
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <Paragraph level='Small' weight='Bold' style={homeViewDetailsStyles.label}>Name:</Paragraph>
                      <Paragraph level='Small' weight='Medium' style={homeViewDetailsStyles.value}>
                        {item.name}
                      </Paragraph>
                    </View>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <Paragraph level='Small' weight='Bold' style={homeViewDetailsStyles.label}>Mobile:</Paragraph>
                      <Paragraph level='Small' weight='Medium' style={homeViewDetailsStyles.value}>
                        {item.mobile}
                      </Paragraph>
                    </View>
                    <View style={homeViewDetailsStyles.flexLayout}>
                      <Paragraph level='Small' weight='Bold' style={homeViewDetailsStyles.label}>Address:</Paragraph>
                      <Paragraph level='Small' weight='Medium' style={homeViewDetailsStyles.value}>
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

              <View style={homeViewDetailsStyles.dotsContainer}>
                {singleData.imam_details.map((_, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDotPress(index)}
                    style={[
                      homeViewDetailsStyles.dot,
                      activeIndex === index
                        ? homeViewDetailsStyles.activeDot
                        : homeViewDetailsStyles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
            </View>

            <View style={homeViewDetailsStyles.content}>
              <HorizontalCardList
                title="Committee Details"
                subTitle={`Total Members: ${singleData.committee_details?.members.length || 0
                  }`}
                data={singleData.committee_details?.members || []}
                imageKey="photo"
              />
              <HorizontalCardList
                title="Poor People Information"
                imageKey="photo"
                data={
                  singleData.poor_people_information?.map(person => ({
                    name: String(person.name),
                    age: String(person.age),
                    address: String(person.address),
                    photo: String(person.photo),
                  })) || []
                }
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default HomeViewDetailsInfoScreen;
