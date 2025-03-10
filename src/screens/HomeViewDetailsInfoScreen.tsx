import { View, TouchableOpacity, Modal, ScrollView, Dimensions, Platform, Linking } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import BackButton from '../components/BackButton';
import homeViewDetailsStyles from '../styles/homeViewDetails.styles';
import { useTranslation } from '../hooks/useTranslation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../configs/colors';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import ImageView from 'react-native-image-zoom-viewer';
import ImageComponent from '../components/ui/Image';
import { mvs } from 'react-native-size-matters';
import PersonalScreen from '../components/PersonalScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HousingScreen from '../components/HousingScreen';
import NeedsScreen from '../components/NeedsScreen';
import DocumentsScreen from '../components/DocumentsScreen';

const Tab = createMaterialTopTabNavigator();


const HomeViewDetailsInfoScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<HomeViewDetailsInfoRouteProp>();
  const singleData = route?.params?.item as HomeSearchResultDatas;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  const onPressMobileNumberClick = (number: string) => {

    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  }


  return (
    <SafeAreaWrapper>
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
          <Heading level={5} weight='Bold'>{singleData.name}</Heading>
          <View style={homeViewDetailsStyles.content}>
            <View style={homeViewDetailsStyles.flexLayout}>
              <Entypo name='location-pin' size={mvs(24)} />
              <Paragraph level="Small" weight="Medium" style={[homeViewDetailsStyles.value, { flexShrink: 1 }]}>
                {singleData?.fullAddress}
              </Paragraph>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={homeViewDetailsStyles.scrollContent}
          >
            {singleData.masjidProfile?.map((item, index) => (
              <View
                key={item._id || index}
                style={homeViewDetailsStyles.masjidImage}
              >
                <ImageComponent
                  source={item?.url}
                  style={{ width: Dimensions.get('window').width / 3.2, height: 120, borderRadius: 10 }}
                />
                <TouchableOpacity style={homeViewDetailsStyles.expanded} onPress={() => openImage(item.url)}>
                  <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(12)} />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Imam Details */}
          <View style={homeViewDetailsStyles.imamDetails}>
            <Heading level={6} weight='Bold'>{t('imamDetails')}</Heading>
            {
              singleData.imamDetails && singleData.imamDetails.filter(imam => imam.isPresentImam).map((item) => (
                <View style={[homeViewDetailsStyles.imamCard]} key={item._id}>
                  <View style={homeViewDetailsStyles.imamCardLeft}>
                    <TouchableOpacity
                      onPress={() => openImage(item.profilePicture)}
                    >
                      <ImageComponent
                        source={item.profilePicture}
                        style={homeViewDetailsStyles.profileImage}
                        imageStyle={{ borderRadius: 50 }}
                      />
                    </TouchableOpacity>

                    <View>
                      <Paragraph level='Small' weight='Bold'>{item.name}</Paragraph>
                      <Paragraph level='Small' weight='Medium'>{item.address}</Paragraph>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => onPressMobileNumberClick(item.emailOrPhone)} style={homeViewDetailsStyles.call}>
                    <MaterialIcons name='local-phone' size={mvs(18)} color={Colors.white} />
                  </TouchableOpacity>
                </View>
              ))
            }

          </View>

          <Heading level={6} weight='Bold'>{t('biggerDetails')}</Heading>

        </View>
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
        <View style={{ flex: 1 }}>
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: { backgroundColor: '#fff', paddingHorizontal: 5, height: 45, elevation: 0 },
              tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold', padding: 0, margin: 0 },
              tabBarIndicatorStyle: {
                backgroundColor: Colors.primary,
                height: 3,
              },
              tabBarActiveTintColor: Colors.primary,
              tabBarInactiveTintColor: Colors.text,
            }}
          >
            <Tab.Screen initialParams={{ data: singleData }} name={t('personal')} component={PersonalScreen} />
            <Tab.Screen initialParams={{ data: singleData }} name={t('housing')} component={HousingScreen} />
            <Tab.Screen initialParams={{ data: singleData }} name={t('needs')} component={NeedsScreen} />
            <Tab.Screen initialParams={{ data: singleData }} name={t('documents')} component={DocumentsScreen} />
          </Tab.Navigator>
        </View>

      </View>
    </SafeAreaWrapper>
  );
};

export default HomeViewDetailsInfoScreen;
