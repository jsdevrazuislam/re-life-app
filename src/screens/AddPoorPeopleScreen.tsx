import React from 'react';
import { View, Text, ScrollView, Platform, Alert, Linking, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SelectDropdown from '../components/ui/Select';
import Input from '../components/ui/AppInput';
import { UploadArea } from './KycScreen';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/addPeople.styles';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import AppButton from '../components/ui/AppButton';
import {
  assistanceTypes,
  clothNeeds,
  frequencyOptions,
  genders,
  marriages,
  oliNeeds,
  othersFoodsOptions,
  professions,
  riceNeeds,
  yesNoOptions,
} from '../data/dump';
import Textarea from '../components/ui/Textarea';
import { useTranslation } from '../hooks/useTranslation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import { requestAndroidPermission } from '../utils/permission';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { formatFileData } from '../utils/file-format';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import poorPeopleSchema from '../validations/poor.people';

const AddPeopleScreen = () => {
  const { t } = useTranslation();
  const { user, people, totalPeople, setPeople, setTotalPeople } = useAuthStore();
  const { control, handleSubmit, setValue, watch, trigger, getValues, formState: { errors } } = useForm({
    resolver: yupResolver(poorPeopleSchema),
    mode: 'onBlur'
  });

  const childrenDetails = watch('childrenDetails');
  const receivingAssistance = watch('receivingAssistance');
  const marriageStatus = watch('marriageStatus')
  const hasChildren = watch('hasChildren')
  const gender = watch('gender')
  const isHusbandDead = watch('isHusbandDead')
  const isWifeDead = watch('isWifeDead')
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'childrenDetails',
  });

  const { request, loading } = useApi();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleChildren = (count: number) => {
    const currentCount = fields.length;

    if (count > currentCount) {
      for (let i = currentCount; i < count; i++) {
        append({
          name: '',
          age: '',
          profession: '',
          mobile: '',
          income: '',
          frequency: '',
          childrenProveDocument: ''
        });
      }
    } else if (count < currentCount) {
      for (let i = currentCount; i > count; i--) {
        remove(i - 1);
      }
    }
  };


  const handleSubmitFormSubmit = async (formData: any) => {

    console.log(formData)

    return
    const formDataPayload = new FormData();
    formDataPayload.append('name', formData.name);
    formDataPayload.append('age', formData.age);
    formDataPayload.append('gender', formData.gender);
    formDataPayload.append('marriageStatus', formData.marriageStatus);
    formDataPayload.append('profileUrl', formatFileData(formData.photoUrl));
    formDataPayload.append('isWifeDead', formData.isWifeDead);
    formDataPayload.append('wifeProfession', formData.wifeProfession);
    formDataPayload.append('husbandProfession', formData.husbandProfession);
    formDataPayload.append('numberOfChildren', formData.numberOfChildren);
    formDataPayload.append('childrenDetails', JSON.stringify(formData?.childrenDetails));
    formDataPayload.append('contactNumber', formData.contactNumber);
    formDataPayload.append('address', formData.address);
    formDataPayload.append('assistanceType', formData.assistanceType);
    formDataPayload.append('frequency', formData.frequency);
    formDataPayload.append('receivingAssistance', formData.receivingAssistance);
    formDataPayload.append('assistanceLocation', formData.assistanceLocation);
    formDataPayload.append('notes', formData.notes);
    formDataPayload.append(
      'essentialsNeedsMonthly',
      JSON.stringify({
        rice: formData.rice,
        lentils: formData.lentils,
        oil: formData.oil,
        otherFoodItems: formData.otherFood || '',
        clothingForSelf: formData.clothingSelf,
        clothingForFamily: formData.clothingFamily,
        monthlyMedicineCost: formData.medicineCost || '',
        ongoingTreatmentsDetails: formData.treatments || '',
        financialNeeds: formData.financialNeeds,
      })
    );
    formDataPayload.append('idProofFront', formatFileData(formData.idProofFront));
    formDataPayload.append('idProofBack', formatFileData(formData.idProofBack));
    formDataPayload.append('idProofFrontWife', formatFileData(formData.idProofFrontWife));
    formDataPayload.append('idProofBackWife', formatFileData(formData.idProofBackWife));
    formDataPayload.append('idProofFrontFather', formatFileData(formData.idProofFrontFather));
    formDataPayload.append('idProofBackFather', formatFileData(formData.idProofBackFather));


    const { message, data } = await request(
      'post',
      ApiStrings.CREATE_PEOPLE(user?.masjid?._id || ''),
      formDataPayload
    );
    const newPeople = [...people, data];
    setPeople(newPeople);
    setTotalPeople(totalPeople + 1);
    showToast('success', message);
    navigation.navigate('ImamHomeScreen', { activeTab: t('beggers') });
  };

  const handleImagePicker = async (
    field:
      | 'idProofFront'
      | 'idProofBack'
      | 'idProofFrontWife'
      | 'idProofBackWife'
      | 'photoUrl'
      | 'idProofFrontHusband'
      | 'idProofBackHusband'
      | 'idProofFrontFather'
      | 'idProofBackFather'
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
          setValue(field, response.assets[0])
        }
      },
    );
  };

  const removeImage = (
    field:
      | 'idProofFront'
      | 'idProofBack'
      | 'idProofFrontWife'
      | 'idProofBackWife'
      | 'photoUrl'
      | 'idProofFrontHusband'
      | 'idProofBackHusband'
      | 'idProofFrontFather'
      | 'idProofBackFather'
  ) => {
    setValue(field, '');
  };

  const handleChildrenImagePicker = async (index: number) => {
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
            setValue(`childrenDetails.${index}.childrenProveDocument`, response.assets[0] as IFile, { shouldValidate: true });
            trigger(`childrenDetails.${index}.childrenProveDocument`); 
          }
        },
      );
    };
  
  
    const removeChildrenImage = (index: number) => {
      setValue(`childrenDetails.${index}.childrenProveDocument`, null, { shouldValidate: true });
      trigger(`childrenDetails.${index}.childrenProveDocument`);
    };


  console.log("errors", errors)
  

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 40
          }}
        >
          <LoadingOverlay visible={loading} message='আপনার তথ্য প্রক্রিয়া করতে কিছু সময় লাগবে। অনুগ্রহ করে সম্পূর্ণ হওয়া পর্যন্ত অপেক্ষা করুন, অন্যথায় আপনার তথ্য হারিয়ে যেতে পারে।' />
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={globalStyles.container}>
              <Header title={t('addBegger')} />
              {/* Photo Upload */}
              <View style={{ marginTop: 20 }}>
                <Controller
                  name='photoUrl'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <UploadArea
                      title={t('beggerPhoto')}
                      imageUri={value}
                      handlePress={() => handleImagePicker('photoUrl')}
                      handleRemove={() => removeImage('photoUrl')}
                      error={errors.photoUrl?.message}
                    />
                  )}
                />
              </View>

              {/* Basic Information */}
              <Controller
                name='name'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('beggerName')}
                    value={value}
                    placeholder={t('beggerNamePlaceholder')}
                    style={{ marginTop: 20 }}
                    onChangeText={onChange}
                    error={errors?.name?.message}
                  />
                )}
              />
              <Controller
                name='age'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    placeholder={t('beggerAgePlaceholder')}
                    label={t('beggerAge')}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    isNumber={true}
                  />
                )}
              />
              <Controller
                name='gender'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
                    label={t('beggerGender')}
                    placeholder={t('beggerGender')}
                    value={value}
                    onChange={onChange}
                    data={genders}
                    error={errors?.gender?.message}
                  />
                )}
              />
              <Controller
                name='marriageStatus'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
                    label={t('beggerMarriageStatus')}
                    placeholder={t('beggerMarriageStatus')}
                    value={value}
                    onChange={onChange}
                    data={marriages}
                    error={errors?.marriageStatus?.message}
                  />
                )}
              />

              {['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/বিপত্নীক'].includes(marriageStatus) && (
                <>

                  <Controller
                    name={gender === 'পুরুষ' ? 'isWifeDead' : 'isHusbandDead'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={gender === 'পুরুষ' ? t('isWifeDead') : t('isHusbandDead')}
                        placeholder={gender === 'পুরুষ' ? t('isWifeDead') : t('isHusbandDead')}
                        value={value !== undefined ? String(value) : ''}
                        onChange={onChange}
                        data={yesNoOptions}
                        error={gender === 'পুরুষ' ? errors?.isWifeDead?.message : errors?.isHusbandDead?.message}
                      />
                    )}
                  />


                  {(isWifeDead || isHusbandDead) === 'হ্যাঁ' && (
                    <Controller
                      name={gender === 'পুরুষ' ? 'wifeProfession' : 'husbandProfession'}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <SelectDropdown
                          label={gender === 'পুরুষ' ? t('wifeProfession') : t('husbandProfession')}
                          placeholder={gender === 'পুরুষ' ? t('wifeProfessionPlaceholder') : t('husbandProfessionPlaceholder')}
                          value={value !== undefined ? String(value) : ''}
                          onChange={onChange}
                          data={professions}
                          error={gender === 'পুরুষ' ? errors?.wifeProfession?.message : errors?.husbandProfession?.message}
                          search={true}
                          searchPlaceholder="Enter your search"
                        />
                      )}
                    />
                  )}

                  <Controller
                    name={'hasChildren'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={t('hasChildren')}
                        value={value ?? ''}
                        onChange={onChange}
                        data={yesNoOptions}
                        placeholder={t('selectPlaceholder')}
                        error={errors?.hasChildren?.message}
                      />
                    )}
                  />


                </>
              )}

              {hasChildren === 'হ্যাঁ' && (
                <>

                  <Controller
                    name={'numberOfChildren'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label={t('numberOfChildren')}
                        placeholder={t('numberOfChildren')}
                        value={value ?? ''}
                        keyboardType="numeric"
                        onChangeText={text => {
                          const count = parseInt(text) || 0;
                          onChange(text);
                          handleChildren(count);
                        }}
                        error={errors?.numberOfChildren?.message}
                      />
                    )}
                  />


                  {childrenDetails?.map((child, index) => (
                    <View key={index} style={styles.childSection}>
                      <Text style={styles.childHeader}>
                        {t('childrenDetails')} {index + 1}
                      </Text>
                      <Controller
                        name={`childrenDetails.${index}.name`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            placeholder={t('childName')}
                            label={t('childName')}
                            value={value}
                            onChangeText={onChange}
                            error={errors.childrenDetails?.[index]?.name?.message}
                          />
                        )}
                      />
                      <Controller
                        name={`childrenDetails.${index}.age`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            placeholder={t('childAge')}
                            label={t('childAge')}
                            value={value}
                            onChangeText={onChange}
                            isNumber={true}
                            keyboardType="numeric"
                            error={errors.childrenDetails?.[index]?.age?.message}
                          />
                        )}
                      />
                      <Controller
                        name={`childrenDetails.${index}.childrenProveDocument`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <UploadArea
                            title={t('childrenProveDocument')}
                            imageUri={value} 
                            handlePress={() => handleChildrenImagePicker(index)}
                            handleRemove={() => {
                              removeChildrenImage(index);
                              onChange(null); 
                            }}
                            error={errors.childrenDetails?.[index]?.childrenProveDocument?.message}
                          />
                        )}
                      />

                      {
                        Number(child.age) >= 15 && (
                          <>
                            <Controller
                              name={`childrenDetails.${index}.mobile`}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <PhoneNumberInput
                                  label={t('childNumber')}
                                  placeholder={t('childNumber')}
                                  value={value ?? ''}
                                  style={{ marginTop: 16}}
                                  onChangeText={onChange}
                                  error={errors.childrenDetails?.[index]?.mobile?.message}
                                />
                              )}
                            />

                            <Controller
                              name={`childrenDetails.${index}.profession`}
                              control={control}
                              render={({ field: { value, onChange } }) => (
                                <SelectDropdown
                                  label={t('childProfession')}
                                  value={value ?? ''}
                                  onChange={onChange}
                                  data={professions}
                                  rootStyle={[styles.halfInput]}
                                  search={true}
                                  searchPlaceholder="Enter your search"
                                  placeholder={t('selectPlaceholder')}
                                  error={errors.childrenDetails?.[index]?.profession?.message}
                                />
                              )}
                            />


                            <View style={styles.income}>
                              <Controller
                                name={`childrenDetails.${index}.income`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <Input
                                    label={t('childIncome')}
                                    placeholder={t('childIncome')}
                                    value={value ?? ''}
                                    isNumber={true}
                                    keyboardType="numeric"
                                    onChangeText={onChange}
                                    style={{ width: '65%' }}
                                    error={errors.childrenDetails?.[index]?.income?.message}
                                  />
                                )}
                              />

                              <Controller
                                name={`childrenDetails.${index}.frequency`}
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                  <SelectDropdown
                                    label={t('childrenIncome')}
                                    value={value ?? ''}
                                    placeholder={t('selectPlaceholder')}
                                    onChange={onChange}
                                    data={frequencyOptions}
                                    error={errors.childrenDetails?.[index]?.frequency?.message}
                                  />
                                )}
                              />


                            </View>
                          </>
                        )
                      }
                    </View>
                  ))}
                </>
              )}

              {/* Assistance Section */}
              <Controller
                name={'receivingAssistance'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
                    label={t('receivingAssistance')}
                    value={value ?? ''}
                    onChange={onChange}
                    data={yesNoOptions}
                    placeholder={t('selectPlaceholder')}
                    error={errors?.receivingAssistance?.message}
                  />
                )}
              />


              {receivingAssistance === 'হ্যাঁ' && (
                <>
                  <Controller
                    name={'assistanceType'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={t('assistanceType')}
                        value={value ?? ''}
                        onChange={onChange}
                        data={assistanceTypes}
                        placeholder={t('selectPlaceholder')}
                        error={errors?.assistanceType?.message}

                      />
                    )}
                  />
                  <Controller
                    name={'frequency'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={t('assistanceFrequency')}
                        value={value ?? ''}
                        onChange={onChange}
                        data={frequencyOptions}
                        placeholder={t('selectPlaceholder')}
                        error={errors?.frequency?.message}
                      />
                    )}
                  />
                  <Controller
                    name={'assistanceLocation'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        label={t('assistanceLocation')}
                        value={value ?? ''}
                        onChangeText={onChange}
                        error={errors?.assistanceLocation?.message}
                      />
                    )}
                  />
                </>
              )}

              <Controller
                name={'presentAddress'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('currentAddress')}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t('currentAddressPlaceholder1')}
                    error={errors?.presentAddress?.message}
                  />
                )}
              />
              <Controller
                name={'permanentAddress'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('permanentAddress')}
                    value={value}
                    onChangeText={onChange}
                    placeholder={t('permanentAddressPlaceholder')}
                    error={errors?.permanentAddress?.message}
                  />
                )}
              />

              <Controller
                name={'contactNumber'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <PhoneNumberInput
                    label={t('phoneNumber')}
                    placeholder={t('phoneNumberPlaceholder1')}
                    value={value}
                    onChangeText={onChange}
                    error={errors?.contactNumber?.message}
                  />
                )}
              />



              {/* Essentials Needs Section */}
              <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                {t('monthlyNeedsTitle')}
              </Heading>
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.sectionDescription}>
                {t('monthlyNeedsDescription')}
              </Paragraph>

              <View style={styles.row}>
                <Controller
                  name={'rice'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('ricePerMonth')}
                      data={riceNeeds}
                      placeholder={t('selectPlaceholder')}
                      rootStyle={styles.halfInput}
                      error={errors?.rice?.message}
                    />
                  )}
                />
                <Controller
                  name={'lentils'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('lentilsPerMonth')}
                      data={riceNeeds}
                      rootStyle={styles.halfInput}
                      placeholder={t('selectPlaceholder')}
                      error={errors?.lentils?.message}
                    />
                  )}
                />

              </View>
              <View style={styles.row}>
                <Controller
                  name={'oil'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('oilPerMonth')}
                      data={oliNeeds}
                      placeholder={t('selectPlaceholder')}
                      rootStyle={styles.halfInput}
                      error={errors?.oil?.message}
                    />
                  )}
                />

                <Controller
                  name={'clothingFamily'}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('familyClothing')}
                      data={clothNeeds}
                      rootStyle={styles.halfInput}
                      placeholder={t('selectPlaceholder')}
                      error={errors?.clothingFamily?.message}
                    />
                  )}
                />

              </View>

              <Controller
                name={'clothingSelf'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
                    value={value}
                    onChange={onChange}
                    label={t('familyClothing')}
                    data={clothNeeds}
                    rootStyle={styles.halfInput}
                    placeholder={t('selectPlaceholder')}
                    error={errors?.clothingSelf?.message}
                  />
                )}
              />

              <Controller
                name={'otherFood'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <SelectDropdown
                    value={value}
                    onChange={onChange}
                    label={t('otherFoodItems')}
                    data={othersFoodsOptions}
                    rootStyle={styles.halfInput}
                    placeholder={t('otherFoodPlaceholder')}
                    error={errors?.otherFood?.message}
                  />
                )}
              />
              <Controller
                name={'medicineCost'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('monthlyMedicineCost')}
                    placeholder={t('monthlyMedicineCost')}
                    value={value}
                    isNumber={true}
                    onChangeText={onChange}
                    error={errors?.medicineCost?.message}
                    keyboardType='numeric'
                  />
                )}
              />

              <Controller
                name={'financialNeeds'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('financialNeeds')}
                    placeholder={t('financialNeedPlaceholder')}
                    value={value}
                    isNumber={true}
                    keyboardType='numeric'
                    onChangeText={onChange}
                    error={errors?.financialNeeds?.message}
                  />
                )}
              />
              <Controller
                name={'overview'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    label={t('overview')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    placeholder={t('overview')}
                    maxLength={300}
                    numberOfLines={5}
                    error={errors?.overview?.message}
                    
                  />
                )}
              />
              <Controller
                name={'treatments'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    label={t('ongoingTreatmentDetails')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    placeholder={t('treatmentDetailsPlaceholder')}
                    maxLength={300}
                    numberOfLines={5}
                  />
                )}
              />

              <Controller
                name={'notes'}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Textarea
                    label={t('notes')}
                    value={value ?? ''}
                    onChangeText={onChange}
                    placeholder={t('notesPlaceholder')}
                    maxLength={300}
                    numberOfLines={5}
                  />
                )}
              />

              {/* ID Proof Sections */}
              <Paragraph level="Medium" weight="Bold" style={styles.sectionTitle}>
                {t('idProofFrontBack')}
              </Paragraph>
              <View style={styles.row}>
                <Controller
                  name={'idProofFront'}
                  control={control}
                  render={({ field: { value } }) => (
                    <UploadArea
                      title={t('idProofFrontLabel')}
                      imageUri={value}
                      handlePress={() => handleImagePicker('idProofFront')}
                      handleRemove={() => removeImage('idProofFront')}
                      error={errors?.idProofFront?.message}
                    />
                  )}
                />

                <Controller
                  name={'idProofBack'}
                  control={control}
                  render={({ field: { value } }) => (
                    <UploadArea
                      title={t('idProofBackLabel')}
                      imageUri={value}
                      handlePress={() => handleImagePicker('idProofBack')}
                      handleRemove={() => removeImage('idProofBack')}
                      error={errors?.idProofBack?.message}
                    />
                  )}
                />

              </View>

              {['পুরুষ', 'মহিলা'].includes(gender) &&
                ['বিবাহিত', 'বিচ্ছেদপ্রাপ্ত', 'বিধবা/তালাক'].includes(marriageStatus) && (isWifeDead || isHusbandDead) === 'হ্যাঁ' ? (
                <>
                  <Paragraph
                    level="Medium"
                    weight="Bold"
                    style={[styles.sectionTitle, { marginTop: 15 }]}>
                    {gender === 'মহিলা' ? t('husbandIdProofFrontBack') : t('wifeIdProofFrontBack')}
                  </Paragraph>
                  <View style={styles.row}>
                    <Controller
                      name={gender === 'মহিলা' ? 'idProofFrontHusband' : 'idProofFrontWife'}
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('idProofFrontLabel')}
                          imageUri={value}
                          handlePress={() => handleImagePicker(gender === 'মহিলা' ? 'idProofFrontHusband' : 'idProofFrontWife')}
                          handleRemove={() => removeImage(gender === 'মহিলা' ? 'idProofFrontHusband' : 'idProofFrontWife')}
                          error={gender === 'মহিলা' ? errors?.idProofFrontHusband?.message : errors?.idProofFrontWife?.message}
                        />
                      )}
                    />
                    <Controller
                      name={gender === 'মহিলা' ? 'idProofBackHusband' : 'idProofBackWife'}
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('idProofBackLabel')}
                          imageUri={value}
                          handlePress={() => handleImagePicker(gender === 'মহিলা' ? 'idProofBackHusband' : 'idProofBackWife')}
                          handleRemove={() => removeImage(gender === 'মহিলা' ? 'idProofBackHusband' : 'idProofBackWife')}
                          error={gender === 'মহিলা' ? errors?.idProofBackHusband?.message : errors?.idProofBackWife?.message}
                        />
                      )}
                    />

                  </View>
                </>
              ) : marriageStatus === 'অবিবাহিত' ? (
                <>
                  <Paragraph
                    level="Medium"
                    weight="Bold"
                    style={[styles.sectionTitle, { marginTop: 15 }]}>
                    {t('fatherIdProofFrontBack')}
                  </Paragraph>
                  <View style={styles.row}>
                    <Controller
                      name={'idProofFrontFather'}
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('fatherIdFront')}
                          imageUri={value}
                          handlePress={() => handleImagePicker('idProofFrontFather')}
                          handleRemove={() => removeImage('idProofFrontFather')}
                          error={errors?.idProofFrontFather?.message}
                        />
                      )}
                    />
                    <Controller
                      name={'idProofBackFather'}
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('fatherIdBack')}
                          imageUri={value}
                          handlePress={() => handleImagePicker('idProofBackFather')}
                          handleRemove={() => removeImage('idProofBackFather')}
                          error={errors?.idProofBackFather?.message}
                        />
                      )}
                    />

                  </View>
                </>
              ) : null}

              <AppButton
                onPress={handleSubmit(handleSubmitFormSubmit)}
                text={t('submit')}
                style={{ marginTop: 30 }}
              />
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default AddPeopleScreen;
