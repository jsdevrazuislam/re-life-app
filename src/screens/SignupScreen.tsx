import { View, Text, TouchableOpacity, ScrollView, Image, Platform, Alert, Linking } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import signupStyles from '../styles/signup.style';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';
import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from '../validations/signup';
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
import profileStyles from '../styles/profile.styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { requestAndroidPermission } from '../utils/permission';
import * as ImagePicker from 'react-native-image-picker';
import { formatFileData } from '../utils/file-format';
import { Colors } from '../configs/colors';
import { validateCommitteeAddress } from '../validations/add.committee';
import { UploadArea } from './KycScreen';


const SignupScreen = () => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobile, setMobile] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [numberOfCommittee, setNumberOfCommittee] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const nameError = validateName(email);
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const { request, loading, error } = useApi();
  const { setUserId, setStatus } = useAuthStore();
  const [committeeDetails, setCommitteeDetails] = useState<CommitteeDetails[]>(
    [],
  );
  const [formData, setFormData] = useState<StateForm>({
    profileUrl: null,
    address: '',
    location: {
      district: '',
      upazila: '',
      union: '',
      village: '',
    },
  });

  const handleCommittee = (count: number) => {
    const numCommittee = Math.max(0, count);
    const updatedCommittee = Array.from({ length: numCommittee }, (_, index) => ({
      name: committeeDetails[index]?.name || '',
      address: committeeDetails[index]?.address || '',
      profession: committeeDetails[index]?.profession || '',
      mobile: committeeDetails[index]?.mobile || '',
      profilePicture: formatFileData(committeeDetails[index]?.profilePicture),
    }));
    setCommitteeDetails(updatedCommittee);
  };

  const handleLocationChange = (
    field: keyof ILocation['location'],
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


  const handleImagePicker = async (
    field: 'profileUrl',
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
          setFormData({ ...formData, [field]: response.assets[0] as IFile });
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
          const updated = [...committeeDetails];
          updated[index].profilePicture = formatFileData(response.assets[0]) as FileData;
          setCommitteeDetails(updated);
        }
      },
    );
  };

  const removeCommitteeImage = (index: number) => {
    const updated = [...committeeDetails];
    updated[index].profilePicture = null;
    setCommitteeDetails(updated);
  };  
  

  const removeImage = (
    field: 'profileUrl',
  ) => {
    setFormData({ ...formData, [field]: null });
  };



  const isFormInvalid =
    typeof emailError === 'string' ||
    typeof passwordError === 'string' ||
    typeof nameError === 'string' ||
    typeof usernameError === 'string' ||
    !isChecked ||
    !email ||
    !password ||
    !name ||
    !username;

  const handleSubmit = async () => {
    const locationErrors = Object.entries(formData.location).reduce(
      (errors, [key, value]) => {
        if (!value.trim()) {
          errors.push(
            `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`,
          );
        }
        return errors;
      },
      [] as string[],
    );

    const committeeErrors: string[] = [];
    if (committeeDetails.length !== parseInt(numberOfCommittee)) {
      committeeErrors.push(
        `You must enter details for exactly ${numberOfCommittee} committee members.`,
      );
    } else {
      committeeDetails.forEach((member, index) => {
        if (!member.name.trim())
          committeeErrors.push(
            `Committee member ${index + 1}: Name is required.`,
          );
        if (!member.address.trim())
          committeeErrors.push(
            `Committee member ${index + 1}: Address is required.`,
          );
        if (!member.profession.trim())
          committeeErrors.push(
            `Committee member ${index + 1}: Profession is required.`,
          );
        if (!member.mobile.trim())
          committeeErrors.push(
            `Committee member ${index + 1}: Mobile number is required.`,
          );
      });
    }

    const allErrors = [...locationErrors, ...committeeErrors];

    if (allErrors.length > 0) {
      showToast('error', allErrors.join('\n'));
      return;
    }

    const formDataPayload = new FormData();

    formDataPayload.append('emailOrPhone', email);
    formDataPayload.append('masjidName', name);
    formDataPayload.append('password', password);
    formDataPayload.append('fullName', username);
    formDataPayload.append(
      'committeeDetails',
      JSON.stringify(committeeDetails),
    );
    formDataPayload.append('location', JSON.stringify(formData.location));
    formDataPayload.append('phoneNumber', mobile);
    formDataPayload.append('address', formData.address);
    formDataPayload.append('profileUrl', formatFileData(formData.profileUrl));
    committeeDetails.forEach((member) => {
      if (member.profilePicture) {
          formDataPayload.append(`committeePictures`, {
              uri: member.profilePicture?.uri,
              name: member.profilePicture?.name,
              type: member.profilePicture?.type,
          });
      }
  });

    const { data, message } = await request(
      'post',
      ApiStrings.SIGNUP,
      formDataPayload,
    );
    setUserId(data);
    setStatus('otp_pending')
    showToast('success', message);
    navigation.navigate('OtpScreen');
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View style={globalStyles.container}>
          <AppLogo />
          <Heading level={4} weight="Bold">
            {t('createAccount')}
          </Heading>

          <View style={signupStyles.form}>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                {formData.profileUrl?.uri ? <Image
                  source={{ uri: formData.profileUrl?.uri }}
                  style={styles.avatar}
                /> : <View style={styles.avatar} />}
                {formData.profileUrl?.uri ? <TouchableOpacity onPress={() => removeImage('profileUrl')} style={signupStyles.deleteButton}>
                  <Icon name="restore-from-trash" size={20} color="#FFF" />
                </TouchableOpacity> : <TouchableOpacity onPress={() => handleImagePicker('profileUrl')} style={styles.editIcon}>
                  <Icon name="edit" size={20} color="#FFF" />
                </TouchableOpacity>}
              </View>
            </View>
            <Input
              label={t('mosquesName')}
              placeholder={t('mosquesNamePlaceholder')}
              value={name}
              onChangeText={setName}
              validation={validateName}
            />
            <Paragraph level="Small" weight="Medium">
              Masjid Location
            </Paragraph>
            <ScrollView
              style={{ marginTop: 10 }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <SelectDropdown
                data={districts}
                value={formData.location.district}
                onChange={value => handleLocationChange('district', value)}
                placeholder="Select a district"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder="Search district"
              />
              <SelectDropdown
                data={upazilas}
                value={formData.location.upazila}
                onChange={value => handleLocationChange('upazila', value)}
                placeholder="Select an upazila"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder="Search upazila"
              />
              <SelectDropdown
                data={unions}
                value={formData.location.union}
                onChange={value => handleLocationChange('union', value)}
                placeholder="Select a union"
                style={profileStyles.paddingRight}
                search={true}
                searchPlaceholder="Search union"
              />
              <SelectDropdown
                data={villages}
                value={formData.location.village}
                onChange={value => handleLocationChange('village', value)}
                placeholder="Select a village"
                search={true}
                searchPlaceholder="Search village"
              />
            </ScrollView>
            <Input
              label={t('username')}
              placeholder={t('placeholderUsername')}
              value={username}
              onChangeText={setUsername}
              validation={validateUsername}
            />
            <Input
              label={t('email')}
              placeholder={t('placeholderEmail')}
              value={email}
              onChangeText={setEmail}
              validation={validateEmail}
              keyboardType="email-address"
            />
            <PhoneNumberInput
              label="Phone Number"
              placeholder="Enter your phone number"
              value={mobile}
              onChangeText={text => setMobile(text)}
            />
            <Input
              label={t('password')}
              placeholder={t('placeholderPassword')}
              value={password}
              onChangeText={setPassword}
              validation={validatePassword}
              secureTextEntry
            />
            <Input
              label={t('Address')}
              placeholder={t('address')}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text})}
              validation={validateCommitteeAddress}
            />
            <Input
              label="Number of Committee"
              value={numberOfCommittee}
              keyboardType="numeric"
              onChangeText={text => {
                const count = parseInt(text) || 0;
                setNumberOfCommittee(text);
                handleCommittee(count);
              }}
            />
            {committeeDetails.map((committee, index) => (
              <View key={index} style={styles.childSection}>
                <Text style={styles.childHeader}>
                  Committee {index + 1} Details
                </Text>
                <UploadArea 
                  handlePress={() => handleCommitteeImagePicker(index)} 
                  handleRemove={() => removeCommitteeImage(index)} 
                  imageUri={committee.profilePicture} 
                  title='Upload Profile Picture'
                 />
                <Input
                  label="Name"
                  value={committee.name}
                  onChangeText={text => {
                    const updated = [...committeeDetails];
                    updated[index].name = text;
                    setCommitteeDetails(updated);
                  }}
                  style={{ marginTop: 15}}
                  inputStyles={{ backgroundColor: Colors.white}}
                  inputWrapper={{ backgroundColor: Colors.white }}
                />
                <Input
                  label="Address"
                  value={committee.address}
                  keyboardType="numeric"
                  onChangeText={text => {
                    const updated = [...committeeDetails];
                    updated[index].address = text;
                    setCommitteeDetails(updated);
                  }}
                  inputStyles={{ backgroundColor: Colors.white}}
                  inputWrapper={{ backgroundColor: Colors.white }}
                />
                <SelectDropdown
                  label="Profession"
                  value={committee.profession}
                  onChange={value => {
                    const updated = [...committeeDetails];
                    updated[index].profession = value;
                    setCommitteeDetails(updated);
                  }}
                  data={professions}
                  style={styles.halfInput}
                  inputStyles={{ backgroundColor: Colors.white}}
                />
                <PhoneNumberInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={committee.mobile}
                  inputStyles={{ backgroundColor: Colors.white}}
                  inputWrapper={{ backgroundColor: Colors.white }}
                  onChangeText={text => {
                    const updated = [...committeeDetails];
                    updated[index].mobile = text;
                    setCommitteeDetails(updated);
                  }}
                />
              </View>
            ))}
            <Checkbox
              label={t('acceptTerms')}
              value={isChecked}
              onValueChange={setIsChecked}
            />
            {error && <ErrorMessage error={error} />}

            <AppButton
              style={{ marginTop: 20 }}
              text={t('createAccount')}
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
              disabled={isFormInvalid}
            />
            <View style={signupStyles.bottomCenter}>
              <Text style={signupStyles.bottomTextFirst}>
                {t('alreadyHaveAccount')}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={signupStyles.bottomTextSecond}>{t('signIn')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default SignupScreen;
