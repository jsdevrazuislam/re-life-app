import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaAddCommittee } from '../validations/add.committee';
import ErrorMessage from '../components/ErrorMessage';
import { options } from './FaceScanScreen';

const AddCommitteeScreen = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi()
  const { t } = useTranslation()
  const { user } = useAuthStore();
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchemaAddCommittee),
    mode: 'onBlur'
  });

  const profilePicture = watch('profilePicture')

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

    ImagePicker.launchImageLibrary(options,
      (response) => {
        if (response.assets && response.assets.length > 0) {
          setValue('profilePicture', response.assets[0] as IFile);
        }
      }
    );
  };


  const removeImage = async () => {
    setValue('profilePicture', null, { shouldValidate: true });
  };


  const handleSubmitForm = async (formData: any) => {
    const apiFormData = new FormData();
    apiFormData.append('name', formData.name);
    apiFormData.append('address', formData.address);
    apiFormData.append('profession', formData.profession);
    apiFormData.append('masjidId', user?.masjid?._id);
    apiFormData.append('mobile', formData.phone);
    if (formData.profilePicture && Object.keys(formData.profilePicture).length > 0) {
      apiFormData.append('profilePicture', formatFileData(formData.profilePicture));
  }

    const { message } = await request('post', ApiStrings.CREATE_COMMITTEE, apiFormData);
    showToast('success', message)
    navigation.navigate('ImamHomeScreen', { activeTab: 'committees' })
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
                {profilePicture ? (
                  <Image source={{ uri: profilePicture?.uri ?? '' }} style={committeeStyles.image} />
                ) : (
                  <View style={committeeStyles.placeholder} />
                )}
              </View>
              <TouchableOpacity onPress={profilePicture?.uri ? removeImage : handleImagePicker} style={[committeeStyles.iconWrapper, { backgroundColor: profilePicture?.uri ? Colors.danger : Colors.primary }]}>
                {profilePicture?.uri ? <Icon name="trash" size={20} color="white" /> : <Icon name="camera" size={20} color="white" />}
              </TouchableOpacity>
            </View>



            <Controller
              name='name'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={t('committeeNameLabel')}
                  placeholder={t('committeeNamePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.name?.message}
                />

              )}
            />
            <Controller
              name='address'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={t('committeeAddressLabel')}
                  placeholder={t('committeeAddressPlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.address?.message}
                />

              )}
            />

            <Controller
              name='profession'
              control={control}
              render={({ field: { value, onChange } }) => (
                <SelectDropdown
                  label={t('committeeProfessionLabel')}
                  placeholder={t('committeeProfessionPlaceholder')}
                  data={professions}
                  value={value}
                  onChange={onChange}
                  rootStyle={{ marginTop: -6, marginBottom: 10 }}
                  search={true}
                  error={errors?.profession?.message}
                />

              )}
            />
            <Controller
              name='phone'
              control={control}
              render={({ field: { value, onChange } }) => (
                <PhoneNumberInput
                  label={t('committeePhoneLabel')}
                  placeholder={t('committeePhonePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.phone?.message}
                />
              )}
            />
          </View>

          {error && <ErrorMessage error={error} />}

          <AppButton
            text={t('submit')}
            onPress={handleSubmit(handleSubmitForm)}
            variant="primary"
            style={{ marginTop: '1%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default AddCommitteeScreen;
