import React, { useState } from 'react';
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
  amountOfAssistance,
  assistanceTypes,
  clothNeeds,
  frequencyOptions,
  genders,
  homeTypes,
  landSizes,
  marriages,
  oliNeeds,
  othersFoods,
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
import { options } from './FaceScanScreen';
import rice from '../data/rice.json'
import oil from '../data/oil.json'
import cloth from '../data/cloth.json'
import { convertBengaliToEnglishNumber, getNameAndUnit } from '../utils/helper';

const AddPeopleScreen = () => {
  const [photoLoading, setPhotoLoading] = useState(false);
  const { t } = useTranslation();
  const { user, people, totalPeople, setPeople, setTotalPeople } = useAuthStore();
  const { control, handleSubmit, setValue, watch, getValues, reset, formState: { errors } } = useForm({
    resolver: yupResolver(poorPeopleSchema),
    mode: 'onBlur',
    defaultValues:{
       role: user?.role
    }
  });

  const role = watch('role');
  const childrenDetails = watch('childrenDetails');
  const receivingAssistance = watch('receivingAssistance');
  const marriageStatus = watch('marriageStatus')
  const isFatherDead = watch('isFatherDead')
  const isMotherDead = watch('isMotherDead')
  const hasHouse = watch('hasHouse')
  const hasLand = watch('hasLand')
  const hasChildren = watch('hasChildren')
  const gender = watch('gender')
  const isHusbandDead = watch('isHusbandDead')
  const isWifeDead = watch('isWifeDead')
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'childrenDetails'
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

    Alert.alert(
      '⚠️ সতর্কতা',
      'আপনি যে তথ্য আমাদের দিয়েছেন, তা আরেকবার ভালো করে যাচাই করে নিন। একবার সাবমিট করলে তা আর সম্পাদনা করা সম্ভব নয়। তাই কোনো ভুল থাকলে এখনই সংশোধন করুন।',
      [
        {
          text: 'বাতিল করুন',
          style: 'cancel',
        },
        {
          text: t('submit'),
          onPress: async () => {
            const formDataPayload = new FormData();

            const appendIfExists = (key: string, value: any) => {
              if (value !== undefined && value !== null && value !== '') {
                formDataPayload.append(key, value);
              }
            };

            const homeDetails = {
              hasHouse: formData.hasHouse,
              houseType: formData.houseType,
              hasLand: formData.hasLand,
              isOwnLand: formData.isOwnLand,
              landSize: formData.landSize,
            }

            appendIfExists('name', formData.name);
            appendIfExists('age', formData.age);
            appendIfExists('gender', formData.gender);
            appendIfExists('isHusbandDead', formData.isHusbandDead);
            appendIfExists('marriageStatus', formData.marriageStatus);
            appendIfExists('profileUrl', formatFileData(formData.photoUrl));
            appendIfExists('isWifeDead', formData.isWifeDead);
            appendIfExists('wifeProfession', formData.wifeProfession);
            appendIfExists('husbandProfession', formData.husbandProfession);
            appendIfExists('isFatherDead', formData.isFatherDead);
            appendIfExists('isMotherDead', formData.isMotherDead);
            appendIfExists('overview', formData.overview);
            appendIfExists('permanentAddress', formData.permanentAddress);
            appendIfExists('address', formData.presentAddress);
            appendIfExists('numberOfChildren', formData.numberOfChildren);
            appendIfExists('contactNumber', formData.contactNumber);
            appendIfExists('assistanceType', formData.assistanceType);
            appendIfExists('frequency', formData.frequency);
            appendIfExists('receivingAssistance', formData.receivingAssistance);
            appendIfExists('assistanceLocation', formData.assistanceLocation);
            appendIfExists('notes', formData.notes);
            appendIfExists('idCardNumber', formData.idCardNumber);
            appendIfExists('homeDetails', JSON.stringify(homeDetails));

            if (formData?.childrenDetails?.length > 0) {
              appendIfExists('childrenDetails', JSON.stringify(formData.childrenDetails));
            }

            appendIfExists(
              'essentialsNeedsMonthly',
              JSON.stringify({
                rice: getNameAndUnit(formData.rice, rice),
                lentils: getNameAndUnit(formData.lentils, rice) ,
                oil: getNameAndUnit(formData.oil, oil),
                otherFoodItems: othersFoods.filter((item) => item.label === formData?.otherFood)[0].value || [],
                clothingForSelf: getNameAndUnit(formData.clothingSelf, cloth) ,
                clothingForFamily: getNameAndUnit(formData.clothingFamily, cloth) ,
                monthlyMedicineCost: formData.medicineCost || '',
                ongoingTreatmentsDetails: formData.treatments || '',
                financialNeeds: convertBengaliToEnglishNumber(formData.financialNeeds),
              })
            );

            const appendFileIfExists = (key: string, file: any) => {
              if (file && file.uri) {
                formDataPayload.append(key, formatFileData(file));
              }
            };

            appendFileIfExists('idProofFront', formData.idProofFront);
            appendFileIfExists('idProofBack', formData.idProofBack);
            appendFileIfExists('idProofFrontWife', formData.idProofFrontWife);
            appendFileIfExists('idProofFrontHusband', formData.idProofFrontHusband);
            appendFileIfExists('idProofBackHusband', formData.idProofBackHusband);
            appendFileIfExists('idProofBackWife', formData.idProofBackWife);
            appendFileIfExists('idProofFrontFather', formData.idProofFrontFather);
            appendFileIfExists('idProofBackFather', formData.idProofBackFather);
            appendFileIfExists('idProofFrontMother', formData.idProofFrontMother);
            appendFileIfExists('idProofBackMother', formData.idProofBackMother);

            formData?.childrenDetails?.forEach((children: any) => {
              if (children.childrenProveDocument?.uri) {
                formDataPayload.append(`childrenProveDocument`, formatFileData(children.childrenProveDocument));
              }
            });
            
            if(formData?.houseImages?.length > 1){
              formData?.houseImages?.forEach((houseImage: IFile) => {
                if (houseImage?.uri) {
                  formDataPayload.append(`houseImages`, formatFileData(houseImage));
                }
              });
            }

            const { message, data } = await request(
              'post',
              ApiStrings.CREATE_PEOPLE(formData?.masjidId ?  formData?.masjidId : user?.masjid?._id || ''),
              formDataPayload
            );

            const newPeople = [...people, data];
            setPeople(newPeople);
            setTotalPeople(totalPeople + 1);
            showToast('success', message);
            reset()
            navigation.navigate('ImamHomeScreen', { activeTab: 'beggers' });
          },
        },
      ]
    );
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
      | 'idProofFrontMother'
      | 'idProofBackMother'
      | 'houseImages',
    multiple = false
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

    setPhotoLoading(true);

    ImagePicker.launchImageLibrary({ selectionLimit: multiple ? 3 : 1, ...options },
      response => {
        setPhotoLoading(false);
        if (response.didCancel) return;
        if (response.errorMessage) {
          showToast('error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          if (field === 'houseImages') {
            const existingImages = getValues('houseImages') || [];
            setValue('houseImages', [...existingImages, ...response.assets]);
          } else {
            setValue(field, response.assets[0]);
          }
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
      | 'idProofFrontMother'
      | 'idProofBackMother'
      | 'houseImages',
    uri?: string
  ) => {
    if (field === 'houseImages' && uri) {
      const updatedImages = (getValues('houseImages') || []).filter(
        (image) => image.uri !== uri
      );
      setValue('houseImages', updatedImages);
    } else {
      setValue(field, '');
    }
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

    setPhotoLoading(true);

    ImagePicker.launchImageLibrary(options,
      response => {
        setPhotoLoading(false);
        if (response.didCancel) return;
        if (response.errorMessage) {
          showToast('error', response.errorMessage);
          return;
        }
        if (response.assets && response.assets.length > 0) {
          console.log(response.assets[0])
          setValue(`childrenDetails.${index}.childrenProveDocument`, response.assets[0] as IFile, { shouldValidate: true });
        }
      },
    );
  };


  const removeChildrenImage = (index: number) => {
    setValue(`childrenDetails.${index}.childrenProveDocument`, null, { shouldValidate: true });
  };


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
              <View style={{ marginTop: 20 }}>
                {
                  role === 'moderator' && <Controller
                  name='masjidId'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      label={t('selectMasjidForInfo')}
                      placeholder={t('hasHousePlaceholder')}
                      value={value ?? ''}
                      onChange={onChange}
                      data={genders}
                      error={errors?.masjidId?.message}
                      variant='details'
                      search
                    />
                  )}
                />

                }
                <Controller
                  name='photoUrl'
                  control={control}
                  render={({ field: { value } }) => (
                    <UploadArea
                      title={t('beggerPhoto')}
                      loading={photoLoading}
                      imageUri={value}
                      handlePress={() => handleImagePicker('photoUrl')}
                      handleRemove={() => removeImage('photoUrl')}
                      error={errors.photoUrl?.message}
                    />
                  )}
                />
              </View>

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
                    error={errors?.age?.message}
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
              {['অবিবাহিত'].includes(marriageStatus) && (
                <>

                  <Controller
                    name={'isFatherDead'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={t('fatherDead')}
                        placeholder={t('fatherDead')}
                        value={value ?? ''}
                        onChange={onChange}
                        data={yesNoOptions}
                        error={errors?.isFatherDead?.message}
                      />
                    )}
                  />

                  <Controller
                    name={'isMotherDead'}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        label={t('motherDead')}
                        placeholder={t('motherDead')}
                        value={value ?? ''}
                        onChange={onChange}
                        data={yesNoOptions}
                        error={errors?.isMotherDead?.message}
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
                            loading={photoLoading}
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
                                  style={{ marginTop: 16 }}
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
                                    rootStyle={{ flex: 1, marginTop: 4 }}
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
                        data={amountOfAssistance}
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
                        placeholder={t('assistanceLocation')}
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

              <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                {t('homeDetailsTitle')}
              </Heading>
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.sectionDescription}>
                {t('homeDetailsDescription')}
              </Paragraph>

              <View style={{ marginTop: 10 }}>
                <Controller
                  name='hasHouse'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('hasHouseLabel')}
                      data={yesNoOptions}
                      placeholder={t('hasHousePlaceholder')}
                      rootStyle={styles.halfInput}
                      error={errors?.hasHouse?.message}
                    />
                  )}
                />
                {hasHouse === 'হ্যাঁ' && <Controller
                  name='houseType'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value ?? ''}
                      onChange={onChange}
                      label={t('houseTypeLabel')}
                      data={homeTypes}
                      rootStyle={styles.halfInput}
                      placeholder={t('houseTypePlaceholder')}
                      error={errors?.houseType?.message}
                    />
                  )}
                />}
                <Controller
                  name='hasLand'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <SelectDropdown
                      value={value}
                      onChange={onChange}
                      label={t('hasLandLabel')}
                      data={yesNoOptions}
                      placeholder={t('hasLandPlaceholder')}
                      rootStyle={styles.halfInput}
                      error={errors?.hasLand?.message}
                    />
                  )}
                />
                {hasLand === 'হ্যাঁ' && <>
                  <Controller
                    name='isOwnLand'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        value={value ?? ''}
                        onChange={onChange}
                        label={t('isOwnLandLabel')}
                        data={yesNoOptions}
                        rootStyle={styles.halfInput}
                        placeholder={t('isOwnLandPlaceholder')}
                        error={errors?.isOwnLand?.message}
                      />
                    )}
                  />
                  <Controller
                    name='landSize'
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectDropdown
                        value={value ?? ''}
                        onChange={onChange}
                        label={t('landSizeLabel')}
                        data={landSizes}
                        rootStyle={styles.halfInput}
                        placeholder={t('landSizePlaceholder')}
                        error={errors?.landSize?.message}
                      />
                    )}
                  />

                </>}

                {
                  hasHouse === 'হ্যাঁ' && <Controller
                    name="houseImages"
                    control={control}
                    render={() => (
                      <UploadArea
                        title={t('houseImagesLabel')}
                        imageUri={watch('houseImages')}
                        handlePress={() => handleImagePicker('houseImages', true)}
                        handleRemove={(uri) => removeImage('houseImages', uri)}
                        error={errors.houseImages?.message}
                        loading={photoLoading}
                      />
                    )}
                  />
                }
              </View>


              {/* Essentials Needs Section */}
              <Heading level={6} weight="Bold" style={[styles.sectionTitle, { marginTop: 20 }]}>
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
                    <SelectDropdown
                    value={value}
                    onChange={onChange}
                    label={t('financialNeeds')}
                    data={amountOfAssistance}
                    rootStyle={styles.halfInput}
                    placeholder={t('financialNeedPlaceholder')}
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
              <Controller
                name='idCardNumber'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('idCardNumberLabel')}
                    placeholder={t('idCardNumberPlaceholder')}
                    value={value}
                    isNumber={true}
                    onChangeText={onChange}
                    error={errors?.idCardNumber?.message}
                    keyboardType='numeric'
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
                      loading={photoLoading}
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
                      loading={photoLoading}
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
                          loading={photoLoading}
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
                          loading={photoLoading}
                        />
                      )}
                    />

                  </View>
                </>
              ) : marriageStatus === 'অবিবাহিত' && isFatherDead === 'হ্যাঁ' || isMotherDead === 'হ্যাঁ' ? (
                <>
                  <Paragraph
                    level="Medium"
                    weight="Bold"
                    style={[styles.sectionTitle, { marginTop: 15 }]}>
                    {t('fatherIdProofFrontBack')}
                  </Paragraph>
                  {
                    isFatherDead === 'হ্যাঁ' && <View style={styles.row}>
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
                            loading={photoLoading}
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
                            loading={photoLoading}
                          />
                        )}
                      />
                    </View>
                  }
                  {isMotherDead === 'হ্যাঁ' && <View style={styles.row}>
                    <Controller
                      name='idProofFrontMother'
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('motherIdFront')}
                          imageUri={value}
                          handlePress={() => handleImagePicker('idProofFrontMother')}
                          handleRemove={() => removeImage('idProofFrontMother')}
                          error={errors?.idProofFrontMother?.message}
                          loading={photoLoading}
                        />
                      )}
                    />
                    <Controller
                      name='idProofBackMother'
                      control={control}
                      render={({ field: { value } }) => (
                        <UploadArea
                          title={t('motherIdBack')}
                          imageUri={value}
                          handlePress={() => handleImagePicker('idProofBackMother')}
                          handleRemove={() => removeImage('idProofBackMother')}
                          error={errors?.idProofBackMother?.message}
                          loading={photoLoading}
                        />
                      )}
                    />

                  </View>}
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
