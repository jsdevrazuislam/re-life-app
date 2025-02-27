import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { Colors } from '../configs/colors';
import globalStyles from '../styles/global.style';
import committeeStyles from '../styles/committee.styles';
import Input from '../components/ui/AppInput';
import { useTranslation } from '../hooks/useTranslation';
import { validateCommitteeAddress, validateCommitteeName, validateCommitteeNumber, validateCommitteeProfession, validateCommitteeProfile } from '../validations/add.committee';
import { professions } from '../data/dump';
import SelectDropdown from '../components/ui/Select';
import AppButton from '../components/ui/AppButton';
import Icon from "react-native-vector-icons/Ionicons";
import { requestAndroidPermission } from '../utils/permission';
import { showToast } from '../utils/toast';
import { AppStackParamList } from '../constants/route';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import { useAuthStore } from '../store/store';
import { formatFileData } from '../utils/file-format';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';


interface CommitteeForm {
  name: string;
  address: string;
  profession: string;
  contactNumber: string;
  image: IFile | null | undefined;
}

const AddCommitteeScreen = () => {
  const [formData, setFormData] = useState<CommitteeForm>({
    name: '',
    address: '',
    profession: '',
    contactNumber: '',
    image: null,
  });
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading } = useApi()
  const { t } = useTranslation()
  const { user, committees, setCommittees, setTotalCommittees, totalCommittees} = useAuthStore()
  const nameError = validateCommitteeName(formData.name);
  const addressError = validateCommitteeAddress(formData.address);
  const professionError = validateCommitteeProfession(formData.profession);
  const numberError = validateCommitteeNumber(formData.contactNumber);

  const isFormInvalid =
    typeof addressError === 'string' ||
    typeof professionError === 'string' ||
    typeof nameError === 'string' ||
    typeof numberError === 'string' ||
    !formData.name ||
    !formData.address ||
    !formData.contactNumber ||
    !formData.profession;

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
          setFormData({ ...formData, image: response.assets[0] as IFile });
        }
      }
    );
  };


  const removeImage = async () => {
    setFormData({ ...formData, image: null })
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name);
    apiFormData.append('address', formData.address);
    apiFormData.append('profession', formData.profession);
    apiFormData.append('masjidId', user?.masjid?._id);
    apiFormData.append('mobile', formData.contactNumber);
    apiFormData.append('profilePicture', formatFileData(formData.image));

    const { message, data } = await request('post', ApiStrings.CREATE_COMMITTEE, apiFormData);
    const newCommittees = [...committees, data];
    setCommittees(newCommittees);
    setTotalCommittees(totalCommittees + 1);
    showToast('success', message)
    navigation.navigate('ImamHomeScreen', { activeTab: t('committees') })
  };

  return (
    <SafeAreaWrapper bg={Colors.white}>
      <LoadingOverlay visible={loading} />
      <ScrollView>
        <View style={globalStyles.container}>
          <Header title={t('addCommittee')} />
          <View style={committeeStyles.form}>
            <View style={committeeStyles.relative}>
              <View style={committeeStyles.imageWrapper}>
                {formData.image?.uri ? (
                  <Image source={{ uri: formData.image?.uri }} style={committeeStyles.image} />
                ) : (
                  <View style={committeeStyles.placeholder} />
                )}
              </View>
              <TouchableOpacity onPress={formData.image?.uri ? removeImage : handleImagePicker} style={[committeeStyles.iconWrapper, { backgroundColor: formData.image?.uri ? Colors.danger : Colors.primary }]}>
                {formData.image?.uri ? <Icon name="trash" size={20} color="white" /> : <Icon name="camera" size={20} color="white" />}
              </TouchableOpacity>
            </View>
            <Input
              label={t('committeeNameLabel')}
              placeholder={t('committeeNamePlaceholder')}
              value={formData.name}
              onChangeText={text => handleInputChange('name', text)}
              validation={validateCommitteeName}
            />
            <Input
              label={t('committeeAddressLabel')}
              placeholder={t('committeeAddressPlaceholder')}
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              validation={validateCommitteeAddress}
            />
            <SelectDropdown
              label={t('committeeProfessionLabel')}
              placeholder={t('committeeProfessionPlaceholder')}
              data={professions}
              value={formData.profession}
              onChange={item => handleInputChange('profession', item)}
              rootStyle={{ marginTop: -6, marginBottom: 10 }}
              search={true}
            />

            <PhoneNumberInput
              label={t('committeePhoneLabel')}
              placeholder={t('committeePhonePlaceholder')}
              value={formData.contactNumber}
              onChangeText={text => handleInputChange('contactNumber', text)}
            />
          </View>

          <AppButton
            text={t('submit')}
            onPress={handleSubmit}
            disabled={isFormInvalid}
            variant="primary"
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AddCommitteeScreen;
