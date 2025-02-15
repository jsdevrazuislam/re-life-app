import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { Colors } from '../configs/colors';
import globalStyles from '../styles/global.style';
import BackButton from '../components/BackButton';
import committeeStyles from '../styles/committee.styles';
import Input from '../components/ui/AppInput';
import { useTranslation } from '../hooks/useTranslation';
import { validateCommitteeAddress, validateCommitteeName, validateCommitteeNumber, validateCommitteeProfession } from '../validations/add.committee';
import { professions } from '../data/dump';
import SelectDropdown from '../components/ui/Select';
import AppButton from '../components/ui/AppButton';
import Icon from "react-native-vector-icons/Ionicons";
import Heading from '../components/ui/Heading';


interface CommitteeForm {
  name: string;
  address: string;
  profession: string;
  contactNumber: string;
  image: string | null | undefined;
}

const AddCommitteeScreen = () => {
  const [formData, setFormData] = useState<CommitteeForm>({
    name: '',
    address: '',
    profession: '',
    contactNumber: '',
    image: null,
  });
  const navigation = useNavigation();
  const { t } = useTranslation()

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

  const handleSubmit = () => {
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name);
    apiFormData.append('address', formData.address);
    apiFormData.append('profession', formData.profession);
    apiFormData.append('contactNumber', formData.contactNumber);

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
    <SafeAreaWrapper bg={Colors.white}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={committeeStyles.flexLayout}>
            <BackButton />
            <Heading level={5} weight="Bold">
              {t('signIn')}
            </Heading>
            <View />
          </View>
          <View style={committeeStyles.form}>
            <View style={committeeStyles.relative}>
              <View style={committeeStyles.imageWrapper}>
                {formData.image ? (
                  <Image source={{ uri: formData.image }} style={committeeStyles.image} />
                ) : (
                  <View style={committeeStyles.placeholder} />
                )}
              </View>
              <TouchableOpacity onPress={formData.image ? removeImage : handleImagePicker} style={[committeeStyles.iconWrapper, { backgroundColor: formData.image ? Colors.danger : Colors.primary }]}>
                {formData.image ? <Icon name="trash" size={20} color="white" /> : <Icon name="camera" size={20} color="white" />}
              </TouchableOpacity>
            </View>
            <Input
              label={t('Name')}
              placeholder={t('placeholderEmail')}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              validation={validateCommitteeName}
            />
            <Input
              label={t('Address')}
              placeholder={t('placeholderEmail')}
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              validation={validateCommitteeAddress}
            />
            <SelectDropdown validation={validateCommitteeProfession} label='Profession' placeholder="Select Profession" data={professions} value={formData.profession} onChange={item => handleInputChange('profession', item)} />
            <Input
              label={t('Contact Number')}
              placeholder={t('placeholderEmail')}
              value={formData.contactNumber}
              onChangeText={text => handleInputChange('contactNumber', text)}
              validation={validateCommitteeNumber}
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

export default AddCommitteeScreen;
