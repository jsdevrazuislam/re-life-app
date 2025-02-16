import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  Linking,
  Image,
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
import { validateEmail, validatePinCode } from '../validations/signup';
import { useApi } from '../hooks/useApi';
import * as ImagePicker from 'react-native-image-picker';
import { showToast } from '../utils/toast';
import { requestAndroidPermission } from '../utils/permission';
import validateForm from '../validations/kyc';
import ApiStrings from '../lib/apis_string';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface IFile{
    fileName: string,
    fileSize: number,
    height: number,
    type: string,
    uri: string,
    width:number
}

interface FormState {
  name:string,
  mobile:string,
  pincode:string,
  email:string,
  documentType:string,
  idProofFront: IFile | null,
  idProofBack: IFile | null,
  imamDocument: IFile | null
}

const KycScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormState>({
    name: '',
    mobile: '',
    email: '',
    pincode: '',
    documentType: '',
    idProofFront: null,
    idProofBack: null,
    imamDocument: null,
  });

  const { setUserId, userTempId, setUser } = useAuthStore();
  const nameError = validateCommitteeName(formData.name);
  const mobileError = validateCommitteeNumber(formData.mobile);
  const emailError = validateEmail(formData.email);
  const pinCodeError = validatePinCode(formData.pincode);
  const { request, loading, error } = useApi();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const documentTypes = ['smart card', 'passport', 'driving license'];

  const isFormInvalid =
    typeof emailError === 'string' ||
    typeof pinCodeError === 'string' ||
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
    const formDataPayload = new FormData();
    formDataPayload.append('userId', userTempId);
    formDataPayload.append('name', formData.name);
    formDataPayload.append('mobileOrEmail', formData.email);
    formDataPayload.append('pincode', formData.pincode);
    formDataPayload.append('documentType', formData.documentType);
    formDataPayload.append("idProofFront", {
      uri: formData?.idProofFront?.uri,
      name: formData?.idProofFront?.fileName,
      type: formData?.idProofFront?.type
  });
    formDataPayload.append("idProofBack", {
      uri: formData?.idProofBack?.uri,
      name: formData?.idProofBack?.fileName,
      type: formData?.idProofBack?.type
  });
    formDataPayload.append("imamDocument", {
      uri: formData?.imamDocument?.uri,
      name: formData?.imamDocument?.fileName,
      type: formData?.imamDocument?.type
  });
    const { data, message } = await request('post', ApiStrings.KYC_VERIFY, formDataPayload);
    setUser(data?.user, data?.accessToken, data?.refreshToken)
    showToast('success', message)
    setUserId('');
    navigation.navigate('KycSuccessScreen')
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

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={styles.header}>
            <Heading level={5} weight="Bold">
              Upload KYC
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
                label="Name"
                value={formData.name}
                onChangeText={text => setFormData({ ...formData, name: text })}
                placeholder={t('Your Name')}
                inputStyles={styles.appInput}
                validation={validateCommitteeName}
              />
              <Input
                label="Mobile"
                value={formData.mobile}
                keyboardType="phone-pad"
                onChangeText={text => setFormData({ ...formData, mobile: text })}
                placeholder={t('Your Phone Number')}
                inputStyles={styles.appInput}
                validation={validateCommitteeNumber}
              />
              <Input
                label="Email"
                value={formData.email}
                keyboardType="email-address"
                onChangeText={text => setFormData({ ...formData, email: text })}
                placeholder={t('Your Email')}
                inputStyles={styles.appInput}
                validation={validateEmail}
              />
              <Input
                label="Pincode"
                value={formData.pincode}
                keyboardType="numeric"
                onChangeText={text => setFormData({ ...formData, pincode: text })}
                placeholder={t('Your Area Zip')}
                inputStyles={styles.appInput}
                validation={validatePinCode}
              />

              <AppButton
                disabled={isFormInvalid}
                onPress={handleStep}
                text="Next"
                style={{ marginTop: '30%' }}
              />
            </View>
          ) : (
            /* Step 2 Content */
            <View style={styles.formContainer}>
              <Heading level={6} weight="Bold" style={styles.sectionTitle}>
                Choose Document Type
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
                  Capture Id Proof
                </Heading>
                <Paragraph
                  level="Small"
                  weight="Medium"
                  style={styles.uploadDescription}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </Paragraph>

                <View style={styles.uploadRow}>
                  <UploadArea
                    title="ID Front"
                    imageUri={formData.idProofFront}
                    handlePress={() => handleImagePicker('idProofFront')}
                    handleRemove={() => removeImage('idProofFront')}
                  />
                  <UploadArea
                    title="ID Back"
                    imageUri={formData.idProofBack}
                    handlePress={() => handleImagePicker('idProofBack')}
                    handleRemove={() => removeImage('idProofBack')}
                  />
                </View>
                <UploadArea
                  title="Imam Document"
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
                text="Previous Step"
                onPress={() => setCurrentStep(1)}
                style={{ width: '48%' }}
              />
              <AppButton
                loading={loading}
                disabled={loading}
                text="Submit KYC"
                onPress={handleSubmit}
                style={{ width: '48%' }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export const UploadArea = ({
  title,
  handlePress,
  imageUri,
  handleRemove,
}: {
  title: string;
  imageUri: any;
  handlePress: () => void;
  handleRemove: () => void;
}) =>
  imageUri?.uri ? (
    <View style={styles.uploadArea}>
      <Image source={{ uri: imageUri?.uri }} style={styles.image} />
      <TouchableOpacity style={styles.deleteButton} onPress={handleRemove}>
        <Icon name="restore-from-trash" size={24} color={Colors.white} />
      </TouchableOpacity>
    </View>
  ) : (
    <TouchableOpacity style={styles.uploadArea} onPress={handlePress}>
      <Icon name="camera-alt" size={30} color={Colors.primary} />
      <Paragraph level="Small" weight="SemiBold" style={styles.uploadAreaText}>
        {title}
      </Paragraph>
    </TouchableOpacity>
  );

export default KycScreen;
