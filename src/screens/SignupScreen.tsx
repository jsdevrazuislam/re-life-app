import { View, Text, TouchableOpacity, Platform, Alert, ScrollView, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import signupStyles from '../styles/signup.style';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';
import Checkbox from '../components/ui/Checkout';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from '../hooks/useTranslation';
import AppLogo from '../components/ui/AppLogo';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { showToast } from '../utils/toast';
import { useAuthStore } from '../store/store';
import ErrorMessage from '../components/ErrorMessage';
import styles from '../styles/addPeople.styles';
import { districts, professions, unions, upazilas, villages } from '../data/dump';
import SelectDropdown from '../components/ui/Select';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import Paragraph from '../components/ui/Paragraph';
import { requestAndroidPermission } from '../utils/permission';
import * as ImagePicker from 'react-native-image-picker';
import { formatFileData } from '../utils/file-format';
import { Colors } from '../configs/colors';
import { UploadArea } from './KycScreen';
import kycScreenStyles from '../styles/kycScreen.styles';
import LoadingOverlay from '../components/LoadingOverlay';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '../validations/signup';



const SignupScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, setValue, watch, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
    defaultValues:{
      selectedTab: 'email'
    }
  });

  const committeeDetails = watch("committeeDetails");
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'committeeDetails',
  });


  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi();
  const { setUserId, setStatus, setTempEmail } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<"email" | "mobile">("email");


  const handleCommittee = (count: number) => {
    const currentCount = fields.length;

    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        append({
          name: '',
          address: '',
          profession: '',
          mobile: '',
          profilePicture: null,
        });
      }
    } else if (count < currentCount) {
      for (let i = currentCount; i > count; i--) {
        remove(i - 1);
      }
    }
  };


  const handleImagePicker = async (
    field: 'profileUrl' | 'masjidProfile',
  ) => {
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
        if (response.didCancel) return;
        if (response.errorMessage) {
          showToast('error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setValue(field, response.assets[0] as IFile, { shouldValidate: true });
        }
      },
    );
  };

  const handleCommitteeImagePicker = async (index: number) => {
    if (Platform.OS === 'android') {
      const hasPermission = await requestAndroidPermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission Denied',
          'Please enable photo access in Settings to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ],
        );
        return;
      }
    }

    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      response => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          showToast('error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          const committeeList = getValues("committeeDetails") || [];
          committeeList[index] = {
            ...committeeList[index],
            profilePicture: response.assets[0] as IFile,
          };
          setValue("committeeDetails", committeeList, { shouldValidate: true });
        }
      },
    );
  };


  const removeCommitteeImage = (index: number) => {
    const updatedCommittee = getValues("committeeDetails") || [];
    updatedCommittee[index] = {
      ...updatedCommittee[index],
      profilePicture: null,
    };
    setValue("committeeDetails", updatedCommittee, { shouldValidate: true });
  };


  const removeImage = (field: 'profileUrl' | 'masjidProfile') => {
    setValue(field, null, { shouldValidate: true });
  };

  const handleFormSubmit = async (formData: any) => {
    const payload = formData as SignupPayload;

    const formDataPayload = new FormData();

    formDataPayload.append('emailOrPhone', selectedTab === 'email' ? payload.email : payload.mobile);
    formDataPayload.append('masjidName', payload.name);
    formDataPayload.append('password', payload.password);
    formDataPayload.append('fullName', payload.username);
    formDataPayload.append(
      'committeeDetails',
      JSON.stringify(payload.committeeDetails)
    );
    formDataPayload.append("masjidProfile", formatFileData(payload.masjidProfile))
    formDataPayload.append('location', JSON.stringify(payload.location));
    formDataPayload.append('address', payload.address);
    formDataPayload.append('profileUrl', formatFileData(payload.profileUrl));
    payload?.committeeDetails?.forEach((member) => {
      if (member.profilePicture) {
        formDataPayload.append(`committeePictures`, {
          uri: member.profilePicture?.uri,
          name: member.profilePicture?.fileName,
          type: member.profilePicture?.type,
        });
      }
    });

    const { data, message } = await request(
      'post',
      ApiStrings.SIGNUP,
      formDataPayload,
    );
    setUserId(data?.id);
    setTempEmail(data?.emailOrPhone)
    setStatus('otp_pending')
    showToast('success', message);
    navigation.navigate('OtpScreen', { email: data?.emailOrPhone });
  }

  const handleTabChange = (tab: "email" | "mobile") => {
    setSelectedTab(tab);
    setValue("selectedTab", tab);
    setValue("email", "");
    setValue("mobile", "");
  };


  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30
          }}
          nestedScrollEnabled={true}
        >
          <View style={globalStyles.container}>
            <LoadingOverlay visible={loading} message='আপনার তথ্য প্রক্রিয়া করতে কিছু সময় লাগবে। অনুগ্রহ করে সম্পূর্ণ হওয়া পর্যন্ত অপেক্ষা করুন, অন্যথায় আপনার তথ্য হারিয়ে যেতে পারে।' />
            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
              <AppLogo />
            </View>
            <Heading level={4} weight="Bold">
              {t('signUpTitle')}
            </Heading>
            <Paragraph level='Small'>{t('signUpDescription')}</Paragraph>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, selectedTab === "email" && styles.activeTab]}
                onPress={() => handleTabChange("email")}
              >
                <Text style={[styles.tabText, selectedTab === "email" && styles.activeTabText]}>
                  Email
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, selectedTab === "mobile" && styles.activeTab]}
                onPress={() => handleTabChange("mobile")}
              >
                <Text style={[styles.tabText, selectedTab === "mobile" && styles.activeTabText]}>
                  Phone
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={signupStyles.form}>
                <View style={[kycScreenStyles.uploadRow, { marginTop: 20 }]}>
                  <Controller
                    name="profileUrl"
                    control={control}
                    render={({ field: { value } }) => (
                      <UploadArea
                        title={t('imamPhotoLabel')}
                        imageUri={value}
                        handlePress={() => handleImagePicker('profileUrl')}
                        handleRemove={() => removeImage('profileUrl')}
                        error={errors.profileUrl?.message}
                      />
                    )}
                  />
                  <Controller
                    name="masjidProfile"
                    control={control}
                    render={({ field: { value } }) => (
                      <UploadArea
                        title={t('masjidPhotoLabel')}
                        imageUri={value}
                        handlePress={() => handleImagePicker('masjidProfile')}
                        handleRemove={() => removeImage('masjidProfile')}
                        error={errors.masjidProfile?.message}
                      />
                    )}
                  />
                </View>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label={t('masjidNameLabel')}
                      placeholder={t('masjidNamePlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      error={errors.name?.message}
                    />
                  )}
                />
                <Paragraph level="Small" weight="Medium">
                  {t('masjidLocationLabel')}
                </Paragraph>
                <View style={{ width: '100%', gap: 10, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap' }}>
                  <View style={{ width: '48%' }}>
                    <Controller
                      name="location.district"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                          data={districts}
                          value={value}
                          onChange={onChange}
                          placeholder={t('district')}
                          search={true}
                          searchPlaceholder="Search district"
                          error={errors?.location?.district?.message}
                          rootStyle={{ marginTop: 10}}
                        />
                      )}
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <Controller
                      name="location.upazila"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                          data={upazilas}
                          value={value}
                          onChange={onChange}
                          placeholder={t('upazila')}
                          search={true}
                          searchPlaceholder="Search upazila"
                          error={errors?.location?.upazila?.message}
                          rootStyle={{ marginTop: 10}}
                        />
                      )}
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <Controller
                      name="location.union"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                          data={unions}
                          value={value}
                          onChange={onChange}
                          placeholder={t('union')}
                          search={true}
                          searchPlaceholder="Search union"
                          error={errors?.location?.union?.message}
                          rootStyle={{ marginTop: -10}}
                        />
                      )}
                    />
                  </View>

                  <View style={{ width: '48%' }}>
                    <Controller
                      name="location.village"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                          data={villages}
                          value={value}
                          onChange={onChange}
                          placeholder={t('village')}
                          search={true}
                          searchPlaceholder="Search village"
                          error={errors?.location?.village?.message}
                          rootStyle={{ marginTop: -10}}
                        />
                      )}
                    />
                  </View>
                </View>
                <Controller
                  name="username"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label={t('imamNameLabel')}
                      placeholder={t('imamNamePlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      error={errors.username?.message}
                      style={{ marginTop: -14}}
                    />
                  )}
                />
                {
                  selectedTab === 'email' ? <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label={t('imamEmailLabel')}
                        placeholder={t('imamEmailPlaceholder')}
                        keyboardType="email-address"
                        value={value ?? ''}
                        onChangeText={onChange}
                        error={errors.email?.message}
                      />
                    )}
                  /> : <Controller
                      name='mobile'
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <PhoneNumberInput
                          label={t('imamPhoneLabel')}
                          placeholder={t('imamPhonePlaceholder')}
                          value={value ?? ''}
                          onChangeText={onChange}
                          error={errors.mobile?.message}
                        />
                      )}
                  />
                }

                <Controller
                  name='password'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label={t('passwordLabel')}
                      placeholder={t('confirmPasswordLabel')}
                      value={value}
                      onChangeText={onChange}
                      error={errors?.password?.message}
                      secureTextEntry
                    />
                  )}
                />
                <Controller
                  name='address'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label={t('currentAddressLabel')}
                      placeholder={t('currentAddressPlaceholder')}
                      value={value}
                      onChangeText={onChange}
                      error={errors?.address?.message}
                    />
                  )}
                />

                <Controller
                  name='numberOfCommittee'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      label={t('committeeMembersLabel')}
                      placeholder={t('committeeMembersPlaceholder')}
                      keyboardType="numeric"
                      value={value}
                      onChangeText={text => {
                        const count = parseInt(text) || 0;
                        onChange(text);
                        handleCommittee(count);
                      }}
                      error={errors?.numberOfCommittee?.message}
                    />
                  )}
                />

                {committeeDetails?.map((_, index) => (
                  <View key={index} style={styles.childSection}>
                    <Text style={styles.childHeader}>
                      {t('committeeMemberDetailsTitle')} {index + 1}
                    </Text>
                    <Controller
                      control={control}
                      name={`committeeDetails.${index}.profilePicture`}
                      render={({ field }) => (
                        <UploadArea
                          handlePress={() => handleCommitteeImagePicker(index)}
                          handleRemove={() => removeCommitteeImage(index)}
                          imageUri={field.value}
                          title={t('committeePhotoLabel')}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`committeeDetails.${index}.name`}
                      render={({ field }) => (
                        <Input
                          label={t('committeeNameLabel')}
                          placeholder={t('committeeNamePlaceholder')}
                          value={field.value}
                          onChangeText={field.onChange}
                          error={errors.committeeDetails?.[index]?.name?.message}
                          style={{ marginTop: 15 }}
                          inputStyles={{ backgroundColor: Colors.white }}
                          inputWrapper={{ backgroundColor: Colors.white }}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`committeeDetails.${index}.address`}
                      render={({ field }) => (
                        <Input
                          label={t('committeeAddressLabel')}
                          placeholder={t('committeeAddressPlaceholder')}
                          value={field.value}
                          onChangeText={field.onChange}
                          inputStyles={{ backgroundColor: Colors.white }}
                          inputWrapper={{ backgroundColor: Colors.white }}
                          error={errors?.committeeDetails?.[index]?.address?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`committeeDetails.${index}.profession`}
                      render={({ field }) => (
                        <SelectDropdown
                          label={t('committeeProfessionLabel')}
                          placeholder={t('committeeProfessionPlaceholder')}
                          value={field.value}
                          onChange={field.onChange}
                          data={professions}
                          search={true}
                          style={{ marginBottom: 10 }}
                          rootStyle={{ marginTop: -6 }}
                          error={errors.committeeDetails?.[index]?.profession?.message}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name={`committeeDetails.${index}.mobile`}
                      render={({ field }) => (
                        <PhoneNumberInput
                          label={t('committeePhoneLabel')}
                          placeholder={t('committeePhonePlaceholder')}
                          value={field.value}
                          onChangeText={field.onChange}
                          inputStyles={{ backgroundColor: Colors.white }}
                          inputWrapper={{ backgroundColor: Colors.white }}
                          error={errors.committeeDetails?.[index]?.mobile?.message}
                        />
                      )}
                    />
                  </View>
                ))}
                <Controller
                  control={control}
                  name="isChecked"
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      label={t('agreeToTermsLabel')}
                      value={value}
                      onValueChange={onChange}
                    />
                  )}
                />
                {errors?.isChecked?.message && <ErrorMessage error={errors?.isChecked?.message ?? ''} />}
                {error && <ErrorMessage error={error} />}

                <AppButton
                  style={{ marginTop: 20 }}
                  text={t('signUpButton')}
                  onPress={handleSubmit(handleFormSubmit)}
                  variant="primary"
                />
                <View style={signupStyles.bottomCenter}>
                  <Text style={signupStyles.bottomTextFirst}>
                    {t('alreadyHaveAccount')}{' '}
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('LoginScreen')}>
                    <Text style={signupStyles.bottomTextSecond}>{t('signInPrompt')}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
