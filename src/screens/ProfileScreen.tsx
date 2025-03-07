import {
  View,
  Platform,
  Alert,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import { Colors } from '../configs/colors';
import profileStyles from '../styles/profile.styles';
import { useTranslation } from '../hooks/useTranslation';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Input from '../components/ui/AppInput';
import SelectDropdown from '../components/ui/Select';
import AppButton from '../components/ui/AppButton';
import { districts, unions, upazilas, villages } from '../data/dump';
import Paragraph from '../components/ui/Paragraph';
import { requestAndroidPermission } from '../utils/permission';
import { useAuthStore } from '../store/store';
import { baseURLPhoto } from '../lib/api';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import { showToast } from '../utils/toast';
import { formatFileData } from '../utils/file-format';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import ImageComponent from '../components/ui/Image';

interface ProfileForm {
  name: string;
  fullName: string;
  address: string;
  emailOrPhone: string;
  location: {
    district: string;
    upazila: string;
    union: string;
    village: string;
  };
  image: IFile | null | undefined;
}

const ProfileScreen = () => {
  const { t } = useTranslation();
  const { user, setUserInfo } = useAuthStore();
  const { request, loading, error } = useApi();
  const [formData, setFormData] = useState<ProfileForm>({
    name: '',
    address: '',
    fullName: '',
    emailOrPhone: '',
    location: {
      district: '',
      upazila: '',
      union: '',
      village: '',
    },
    image: null,
  });

  const handleImagePicker = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Please enable photo access in Settings to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => Linking.openSettings(),
            },
          ],
        );
        return;
      }
    }

    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          setFormData({ ...formData, image: response.assets[0] as IFile });
        }
      },
    );
  };

  const removeImage = async () => {
    setFormData({ ...formData, image: null });
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (
    field: keyof ProfileForm['location'],
    value: string,
  ) => {
    setFormData(prevState => ({
      ...prevState,
      location: {
        ...prevState.location,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const apiFormData = new FormData();
    apiFormData.append('fullName', formData.fullName);
    apiFormData.append('address', formData.address);
    if (!formData.image?.isUpdate) {
      apiFormData.append('profilePicture', formatFileData(formData.image));
    }

    const { data, message } = await request(
      'put',
      ApiStrings.UPDATE_PROFILE,
      apiFormData,
    );
    setUserInfo(data);
    showToast('success', message);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.masjid?.name || '',
        fullName: user?.fullName,
        address: user.address || '',
        emailOrPhone: user.emailOrPhone,
        location: {
          district: user.masjid?.location?.district || '',
          upazila: user.masjid?.location?.upazila || '',
          union: user.masjid?.location?.union || '',
          village: user.masjid?.location?.village || '',
        },
        image: {
          uri: user.profileUrl ? baseURLPhoto(user.profileUrl) : '',
          fileName: '',
          isUpdate: true,
          type: '',
        },
      });
    }
  }, [user]);

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <LoadingOverlay visible={loading} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30
          }}
        >
          <View style={globalStyles.container}>
            <Header title={t("profileTitle")} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={profileStyles.form}>
                <View style={profileStyles.relative}>
                  <View style={profileStyles.imageWrapper}>
                    {formData.image?.uri ? (
                      <ImageComponent
                        source={formData.image?.uri}
                        style={profileStyles.image}
                      />
                    ) : (
                      <View style={profileStyles.placeholder} />
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={
                      formData.image?.uri ? removeImage : handleImagePicker
                    }
                    style={[
                      profileStyles.iconWrapper,
                      {
                        backgroundColor: formData.image?.uri
                          ? Colors.danger
                          : Colors.primary,
                      },
                    ]}>
                    {formData.image?.uri ? (
                      <Icon name="trash" size={20} color="white" />
                    ) : (
                      <Icon name="camera" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                </View>
                <Input
                  label={t('masjidNameLabel')}
                  placeholder={t('masjidNamePlaceholder')}
                  value={formData.name}
                  onChangeText={text => handleInputChange('name', text)}
                  disabled
                />
                <Paragraph level="Small" weight="Medium">
                  {t('masjidLocationLabel')}
                </Paragraph>

                <View style={{ width: '100%', gap: 10, marginTop: 10, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '48%' }}>
                    <SelectDropdown
                      data={districts}
                      value={formData.location.district}
                      onChange={value => handleLocationChange('district', value)}
                      placeholder="Select a district"
                      search={true}
                      searchPlaceholder="Search district"
                      disabled
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <SelectDropdown
                      data={upazilas}
                      value={formData.location.upazila}
                      onChange={value => handleLocationChange('upazila', value)}
                      placeholder="Select an upazila"
                      search={true}
                      searchPlaceholder="Search upazila"
                      disabled
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <SelectDropdown
                      data={unions}
                      value={formData.location.union}
                      onChange={value => handleLocationChange('union', value)}
                      placeholder="Select a union"
                      search={true}
                      searchPlaceholder="Search union"
                      disabled
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <SelectDropdown
                      data={villages}
                      value={formData.location.village}
                      onChange={value => handleLocationChange('village', value)}
                      placeholder="Select a village"
                      search={true}
                      searchPlaceholder="Search village"
                      disabled
                    />
                  </View>
                </View>


                <Input
                  label={t('imamNameLabel')}
                  placeholder={t('imamNamePlaceholder')}
                  value={formData.fullName}
                  onChangeText={text => handleInputChange('fullName', text)}
                />
                <Input
                  label={t('currentAddressLabel')}
                  placeholder={t('currentAddressPlaceholder')}
                  value={formData.address}
                  onChangeText={text => handleInputChange('address', text)}
                />

                <Input
                  label={t('emailOrPhoneLabel')}
                  placeholder={t('emailOrPhonePlaceholder')}
                  value={formData.emailOrPhone}
                  onChangeText={text => handleInputChange('email', text)}
                  keyboardType="phone-pad"
                  disabled
                />
              </View>
            </TouchableWithoutFeedback>

            <AppButton
              text={t('updateButton')}
              onPress={handleSubmit}
              variant="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default ProfileScreen;
