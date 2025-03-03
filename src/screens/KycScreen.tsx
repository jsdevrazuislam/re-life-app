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
import {
  validateCommitteeName,
  validateCommitteeNumber,
} from '../validations/add.committee';
import { useApi } from '../hooks/useApi';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast';
import { requestAndroidPermission } from '../utils/permission';
import validateForm from '../validations/kyc';
import ApiStrings from '../lib/apis_string';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { formatFileData } from '../utils/file-format';
import PhoneNumberInput from '../components/ui/PhoneNumberInput';
import LoadingOverlay from '../components/LoadingOverlay';
import ErrorMessage from '../components/ErrorMessage';

interface FormState {
  name: string,
  mobile: string,
  pincode: string,
  email: string,
  documentType: string,
  idProofFront: IFile | null,
  idProofBack: IFile | null,
  imamDocument: IFile | null
}

const KycScreen = () => {
  const { setUserId, userTempId, setUser, setRole, setStatus, tempUser, setTempUser } = useAuthStore();
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState<FormState>({
    name: tempUser?.name ?? '',
    mobile: tempUser?.phoneNumber ?? '',
    email: tempUser?.email ?? '',
    pincode: '',
    documentType: '',
    idProofFront: null,
    idProofBack: null,
    imamDocument: null,
  });

  const nameError = validateCommitteeName(formData.name);
  const mobileError = validateCommitteeNumber(formData.mobile);
  const { request, loading, error } = useApi();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const documentTypes = ['smart card', 'passport', 'driving license'];

  const isFormInvalid =
    typeof nameError === 'string' ||
    typeof mobileError === 'string' ||
    !formData.name ||
    !formData.email ||
    !formData.mobile ||
    !formData.pincode;

  const handleSubmit = async () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      showToast('error', 'Please fill all required fields before submitting.');
      return;
    }
    setRole('imam')
    const formDataPayload = new FormData();
    formDataPayload.append('userId', userTempId);
    formDataPayload.append('name', formData.name);
    formDataPayload.append('mobileOrEmail', formData.email);
    formDataPayload.append('pincode', formData.pincode);
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

  function handleStep() {
    setCurrentStep(2);
  }

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
          setFormData({ ...formData, [field]: response.assets[0] });
        }
      },
    );
  };

  const removeImage = (
    field: 'idProofFront' | 'idProofBack' | 'imamDocument',
  ) => {
    setFormData({ ...formData, [field]: '' });
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

          {/* Stepper */}
          <View style={styles.stepperContainer}>
            <View
              style={[styles.step, currentStep >= 1 && styles.activeStep]}
            />
            <View
              style={[styles.step, currentStep >= 2 && styles.activeStep]}
            />
          </View>

          {currentStep === 1 ? (
            <View style={styles.firstStep}>
              <Input
                label={t('imamNameLabel')}
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
                placeholder={t('imamNamePlaceholder')}
                inputStyles={styles.appInput}
              />
              <PhoneNumberInput
                label={t('imamPhoneLabel')}
                value={formData.mobile}
                onChangeText={text => setFormData({ ...formData, mobile: text })}
                placeholder={t('imamPhonePlaceholder')}
                inputStyles={styles.appInput}
              />
              <Input
                label={t('imamEmailLabel')}
                value={formData.email}
                keyboardType="email-address"
                onChangeText={text => setFormData({ ...formData, email: text })}
                placeholder={t('imamEmailPlaceholder')}
                inputStyles={styles.appInput}
              />
              <Input
                label={t('pincode')}
                value={formData.pincode}
                keyboardType="numeric"
                onChangeText={text => setFormData({ ...formData, pincode: text })}
                placeholder={t('pincodePlaceholder')}
                inputStyles={styles.appInput}
              />

              <AppButton
                disabled={isFormInvalid}
                onPress={handleStep}
                text={t('nextStepButton')}
                style={{ marginTop: '30%' }}
              />
            </View>
          ) : (
            /* Step 2 Content */
            <View style={styles.formContainer}>
              <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                {t('documentTypeLabel')}
              </Heading>
              <View style={styles.docTypeContainer}>
                {documentTypes.map(type => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.docTypeButton,
                      formData.documentType === type && styles.selectedDocType,
                    ]}
                    onPress={() =>
                      setFormData({ ...formData, documentType: type })
                    }>
                    <Paragraph
                      level="Small"
                      weight="Medium"
                      style={[
                        styles.docTypeText,
                        formData.documentType === type &&
                        styles.selectedDocTypeText,
                      ]}>
                      {type}
                    </Paragraph>
                  </TouchableOpacity>
                ))}
              </View>

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
                  <UploadArea
                    title={t('idProofFrontLabel')}
                    imageUri={formData.idProofFront}
                    handlePress={() => handleImagePicker('idProofFront')}
                    handleRemove={() => removeImage('idProofFront')}
                  />
                  <UploadArea
                    title={t('idProofBackLabel')}
                    imageUri={formData.idProofBack}
                    handlePress={() => handleImagePicker('idProofBack')}
                    handleRemove={() => removeImage('idProofBack')}
                  />
                </View>
                <UploadArea
                  title={t('imamDocumentLabel')}
                  imageUri={formData.imamDocument}
                  handlePress={() => handleImagePicker('imamDocument')}
                  handleRemove={() => removeImage('imamDocument')}
                />
              </View>
            </View>
          )}
          {currentStep === 2 && (
            <View style={styles.row}>
              <AppButton
                disabled={loading}
                variant="outline"
                text={t('prevStep')}
                onPress={() => setCurrentStep(1)}
                style={{ width: '48%' }}
              />
              <AppButton
                text={t('submitKyc')}
                onPress={handleSubmit}
                style={{ width: '48%' }}
              />
            </View>
          )}
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
  error?:string
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
