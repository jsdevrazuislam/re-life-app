import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Paragraph from './ui/Paragraph';
import { Colors } from '../configs/colors';
import { useRoute } from '@react-navigation/native';
import ImageComponent from './ui/Image';
import ImageView from 'react-native-image-zoom-viewer';
import { useTranslation } from '../hooks/useTranslation';


const PersonalTabScreen = () => {

  const route = useRoute<ImamHomeScreenRouteProp>();
  const data = route.params?.data as HomeSearchResultDatas;
  const personalInfo = data.poorPeopleInformations;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { t } = useTranslation()

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  const details = [
    { icon: 'account', label: t('name'), value: personalInfo.name },
    { icon: 'calendar', label: t('age'), value: `${personalInfo.age} ${t('years')}` },
    { icon: 'account', label: t('beggerGender1'), value: personalInfo.gender },
    { icon: 'heart', label: t('beggerMarriageStatus1'), value: personalInfo.marriageStatus },
    { icon: 'phone', label: t('phoneNumber'), value: personalInfo.contactNumber },
    { icon: 'id-card', label: t('idCardNumberLabel'), value: personalInfo.idCardNumber },
    { icon: 'map-marker', label: t('currentAddress'), value: personalInfo.address },
    { icon: 'map-marker', label: t('permanentAddress'), value: personalInfo.permanentAddress },
    { icon: 'alert-circle-outline', label: t('overview1'), value: personalInfo.overview },
    { icon: 'alert-circle-outline', label: t('notes'), value: personalInfo.notes },
  ];

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => openImage(personalInfo.photoUrl)}>
          <ImageComponent
            source={personalInfo.photoUrl}
            style={styles.profileImage}
            imageStyle={{ borderRadius: 4 }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        {details.map((item, index) => (
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

export const styles = StyleSheet.create({
  container: {
    paddingBottom: mvs(20),
    paddingTop: mvs(20),
    backgroundColor: Colors.white
  },
  scrollContent:{
    flexDirection: 'row', height: 120, gap:15, marginTop: 10
  },
  imageContainer: {
    width: '100%',
    height: mvs(200),
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    padding: ms(16),
    backgroundColor: Colors.white,
  },
  detailItem: {
    paddingVertical: mvs(12),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  icon: {
    width: ms(30),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    color: Colors.text,
    marginBottom: mvs(2),
    alignItems:'center'
  },
  value: {
    fontSize: ms(14),
    color: Colors.text,
    lineHeight: mvs(20),
  },
  masjidImage: {
    position: 'relative'
  },
  expanded: {
    width: 30,
    height: 30,
    backgroundColor: Colors.black,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0
  },
  card: {
    borderRadius: ms(12),
    padding: ms(16),
    marginBottom: mvs(16),
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  medicalCard: {
    backgroundColor: '#fef1f2',
    marginTop: 20
  },
  financialCard: {
    backgroundColor: '#fefbeb',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(12),
  },
  cardTitle: {
    fontWeight: '600',
    marginLeft: ms(10),
    color: Colors.text,
  },
  assistanceRow: {
    flexDirection: 'row',
  },
});

export default PersonalTabScreen;