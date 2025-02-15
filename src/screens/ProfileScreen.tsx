import { View, Text, PermissionsAndroid, Platform, Alert, Linking, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import { Colors } from '../configs/colors';
import BackButton from '../components/BackButton';
import Heading from '../components/ui/Heading';
import profileStyles from '../styles/profile.styles';
import { useTranslation } from '../hooks/useTranslation';
import * as ImagePicker from 'react-native-image-picker';
import Icon from "react-native-vector-icons/Ionicons";
import { validateCommitteeAddress, validateCommitteeName } from '../validations/add.committee';
import Input from '../components/ui/AppInput';
import SelectDropdown from '../components/ui/Select';
import { validateEmail } from '../validations/signup';
import AppButton from '../components/ui/AppButton';
import { districts, unions, upazilas, villages } from '../data/dump';
import Paragraph from '../components/ui/Paragraph';

interface ProfileForm {
  name: string;
  address: string;
  email: string;
  location: {
    district: string,
    upazila: string,
    union: string,
    village: string,
  };
  image: string | null | undefined;
}


const ProfileScreen = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ProfileForm>({
    name: '',
    address: '',
    email: '',
    location: {
      district: '',
      upazila: '',
      union: '',
      village: ''
    },
    image: null,
  });

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Storage Permission Required",
          message: "This app needs access to your photos to upload an image.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn("Permission request error:", err);
      return false;
    }
  };
  const handleImagePicker = async () => {
    if (Platform.OS === "android") {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        Alert.alert(
          "Permission Denied",
          "Please enable photo access in Settings to continue.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
        return;
      }
    }

    ImagePicker.launchImageLibrary(
      { mediaType: "photo", quality: 0.8 },
      (response) => {
        if (response.didCancel) {
          console.log("User cancelled image picker");
        } else if (response.errorMessage) {
          console.log("ImagePicker Error: ", response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setFormData({ ...formData, image: response.assets[0].uri });
        }
      }
    );
  };


  const removeImage = () => {
    setFormData({ ...formData, image: null })
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (field: keyof ProfileForm["location"], value: string) => {
    setFormData(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [field]: value
      }
    }));
  };


  const handleSubmit = () => {
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name);
    apiFormData.append('address', formData.address);
    apiFormData.append('email', formData.email);
    apiFormData.append('location', formData.location);

    if (formData.image) {
      const imageFile = {
        uri: formData.image,
        name: 'profile_picture.jpg',
        type: 'image/jpeg',
      };
      apiFormData.append('image', imageFile);
    }

    // Make API call here with apiFormData
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={profileStyles.headerNavigation}>
            <BackButton />
            <Heading level={5} weight="Bold">
              {t('signIn')}
            </Heading>
            <View />
          </View>
          <View style={profileStyles.form}>
            <View style={profileStyles.relative}>
              <View style={profileStyles.imageWrapper}>
                {formData.image ? (
                  <Image source={{ uri: formData.image }} style={profileStyles.image} />
                ) : (
                  <View style={profileStyles.placeholder} />
                )}
              </View>
              <TouchableOpacity onPress={formData.image ? removeImage : handleImagePicker} style={[profileStyles.iconWrapper, { backgroundColor: formData.image ? Colors.danger : Colors.primary }]}>
                {formData.image ? <Icon name="trash" size={20} color="white" /> : <Icon name="camera" size={20} color="white" />}
              </TouchableOpacity>
            </View>
            <Input
              label={t('Masjid Name')}
              placeholder={t('placeholderEmail')}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              validation={validateCommitteeName}
            />
            <Paragraph level='Small' weight='Medium'>Masjid Location</Paragraph>
            <ScrollView style={{ marginTop: 10 }} horizontal showsHorizontalScrollIndicator={false}>
              <SelectDropdown
                data={districts}
                value={formData.location.district}
                onChange={value => handleLocationChange('district', value)}
                placeholder="Select a district"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder='Search district'
              />
              <SelectDropdown
                data={upazilas}
                value={formData.location.upazila}
                onChange={value => handleLocationChange('upazila', value)}
                placeholder="Select an upazila"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder='Search upazila'
              />
              <SelectDropdown
                data={unions}
                value={formData.location.union}
                onChange={value => handleLocationChange('union', value)}
                placeholder="Select a union"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder='Search union'
              />
              <SelectDropdown
                data={villages}
                value={formData.location.village}
                onChange={value => handleLocationChange('village', value)}
                placeholder="Select a village"
                search={true}
                searchPlaceholder='Search village'
              />
            </ScrollView>
            <Input
              label={t('Your Name')}
              placeholder={t('placeholderEmail')}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              validation={validateCommitteeName}
            />
            <Input
              label={t('Your Address')}
              placeholder={t('placeholderEmail')}
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              validation={validateCommitteeAddress}
            />

            <Input
              label={t('Your Email')}
              placeholder={t('placeholderEmail')}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              validation={validateEmail}
              keyboardType="phone-pad"
            />
            <Input
              label={t('Your Contract Number')}
              placeholder={t('placeholderEmail')}
              value={formData.email}
              onChangeText={text => handleInputChange('email', text)}
              validation={validateEmail}
              keyboardType="phone-pad"
            />
          </View>

          <AppButton
            text={t('signIn')}
            onPress={handleSubmit}
            variant="primary"
          />

        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;
