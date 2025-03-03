import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Linking,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../configs/colors';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import Input from '../components/ui/AppInput';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import AppButton from '../components/ui/AppButton';
import { useTranslation } from '../hooks/useTranslation';
import Paragraph from '../components/ui/Paragraph';
import styles from '../styles/kycScreen.styles';
import { useAuthStore } from '../store/store';
import { useApi } from '../hooks/useApi';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast';
import { requestAndroidPermission } from '../utils/permission';
import { yupResolver } from '@hookform/resolvers/yup';
import ApiStrings from '../lib/apis_string';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatFileData } from '../utils/file-format';
import LoadingOverlay from '../components/LoadingOverlay';
import { validationSchemaKyc } from '../validations/kyc';
import { useForm, Controller } from 'react-hook-form';
import ErrorMessage from '../components/ErrorMessage';


const KycScreen = () => {
  const { setUserId, userTempId, setUser, setRole, setStatus, tempUser, setTempUser } = useAuthStore();
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchemaKyc),
    mode: 'onBlur',
    defaultValues:{
      name: tempUser?.name,
      emailOrPhone: tempUser?.email || tempUser?.phoneNumber
    }
  });
  console.log("tempUser", tempUser)
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false)
  const selectedDocType = watch("documentType");
  const { request, loading, error } = useApi();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const documentTypes = ['smart card', 'passport', 'driving license'];

  const handleSubmitForm = async (formData: any) => {
    setRole('imam')
    const formDataPayload = new FormData();
    formDataPayload.append('userId', userTempId);
    formDataPayload.append('name', formData.name);
    formDataPayload.append('mobileOrEmail', formData.emailOrPhone);
    formDataPayload.append('pincode', formData.pinCode);
    formDataPayload.append('documentType', formData.documentType);
    formDataPayload.append("idProofFront", formatFileData(formData?.idProofFront));
    formDataPayload.append("idProofBack", formatFileData(formData?.idProofBack));
    formDataPayload.append("imamDocument", formatFileData(formData?.imamDocument));
    const { data, message } = await request('post', ApiStrings.KYC_VERIFY, formDataPayload);
    await setUser(data?.user, data?.accessToken, data?.refreshToken)
    showToast('success', message)
    setTempUser(null)
    setUserId('');
    setStatus('')
    navigation.navigate('ImamPendingScreen')
  };

  const handleImagePicker = async (
    field: 'idProofFront' | 'idProofBack' | 'imamDocument',
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

  const removeImage = (
    field: 'idProofFront' | 'idProofBack' | 'imamDocument',
  ) => {
    setValue(field, null, { shouldValidate: true });
  };

  useEffect(() => {
    if (error) setShowError(true)
  }, [error])

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <LoadingOverlay visible={loading} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {showError ? <View style={[globalStyles.container, { marginTop: '45%' }]}>
          <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
            <Icon name="error-outline" size={80} color={Colors.danger} />
            <Paragraph level='Large' weight='Bold' style={[{ color: Colors.danger, marginTop: 20 }]}>
              KYC Submission Failed
            </Paragraph>
            <Paragraph level='Small' weight='Medium' style={[{ textAlign: 'center', marginHorizontal: 20, marginTop: 10 }]}>
              {error || "Something went wrong while submitting your KYC. Please try again."}
            </Paragraph>

            <AppButton onPress={() => setShowError(false)} style={{ marginTop: 20 }} text='Try Again' />
          </View>
        </View> : <View style={globalStyles.container}>
          <View style={styles.header}>
            <Heading level={5} weight="Bold">
              {t('kycUploadTitle')}
            </Heading>
          </View>
          <View style={styles.firstStep}>
            <Controller
              name='name'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={t('imamNameLabel')}
                  placeholder={t('imamNamePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.name?.message}
                  inputStyles={styles.appInput}
                  keyboardType="email-address"
                />
              )}
            />
            <Controller
              name='emailOrPhone'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={t('emailLabel')}
                  placeholder={t('emailPlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.emailOrPhone?.message}
                  keyboardType="email-address"
                  inputStyles={styles.appInput}
                />
              )}
            />

            <Controller
              name='pinCode'
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  label={t('pincode')}
                  placeholder={t('pincodePlaceholder')}
                  value={value}
                  onChangeText={onChange}
                  error={errors?.pinCode?.message}
                  inputStyles={styles.appInput}
                  keyboardType="numeric"
                />
              )}
            />

            <Heading level={6} weight="Bold" style={styles.sectionTitle}>
              {t('documentTypeLabel')}
            </Heading>
            <View style={styles.docTypeContainer}>
              {documentTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.docTypeButton,
                    selectedDocType === type && styles.selectedDocType,
                  ]}
                  onPress={() => setValue("documentType", type, { shouldValidate: true })}
                >
                  <Paragraph
                    level="Small"
                    weight="Medium"
                    style={[
                      styles.docTypeText,
                      selectedDocType === type && styles.selectedDocTypeText,
                    ]}
                  >
                    {type}
                  </Paragraph>
                </TouchableOpacity>
              ))}
            </View>
              {
                errors?.documentType?.message && <ErrorMessage error={errors?.documentType?.message} />
              }
            <View style={styles.uploadSection}>
              <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                {t('documentTypeLabel')}
              </Heading>
              <Paragraph
                level="Small"
                weight="Medium"
                style={styles.uploadDescription}>
                {t('documentTypePlaceholder')}
              </Paragraph>

              <View style={styles.uploadRow}>
                <Controller
                  name="idProofFront"
                  control={control}
                  render={({ field: { value } }) => (
                    <UploadArea
                      title={t('idProofFrontLabel')}
                      imageUri={value}
                      handlePress={() => handleImagePicker('idProofFront')}
                      handleRemove={() => removeImage('idProofFront')}
                      error={errors.idProofFront?.message}
                    />
                  )}
                />
                <Controller
                  name="idProofBack"
                  control={control}
                  render={({ field: { value } }) => (
                    <UploadArea
                      title={t('idProofBackLabel')}
                      imageUri={value}
                      handlePress={() => handleImagePicker('idProofBack')}
                      handleRemove={() => removeImage('idProofBack')}
                      error={errors.idProofBack?.message}
                    />
                  )}
                />
              </View>
              <Controller
                name="imamDocument"
                control={control}
                render={({ field: { value } }) => (
                  <UploadArea
                    title={t('imamDocumentLabel')}
                    imageUri={value}
                    handlePress={() => handleImagePicker('imamDocument')}
                    handleRemove={() => removeImage('imamDocument')}
                    error={errors.imamDocument?.message}
                  />
                )}
              />

            </View>
          </View>
          <AppButton
            text={t('submitKyc')}
            onPress={handleSubmit(handleSubmitForm)}
            style={{ marginTop: 30 }}
          />
        </View>}
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export const UploadArea = ({
  title,
  handlePress,
  imageUri,
  handleRemove,
  style,
  error
}: {
  title: string;
  style?: StyleProp<ViewStyle>
  imageUri: any;
  handlePress: () => void;
  handleRemove: () => void;
  error?: string
}) =>
  imageUri?.uri ? (
    <View style={[styles.uploadArea, style]}>
      <Image source={{ uri: imageUri?.uri }} style={styles.image} />
      <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
        <Icon name="restore-from-trash" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity style={[error ? styles.uploadAreaError : styles.uploadArea]} onPress={handlePress}>
      <Icon name="camera-alt" size={30} color={error ? Colors.danger : Colors.primary} />
      <Paragraph level="Small" weight="SemiBold" style={[error ? styles.uploadAreaTextError : styles.uploadAreaText]}>
        {title}
      </Paragraph>
    </TouchableOpacity>
  );

export default KycScreen;
