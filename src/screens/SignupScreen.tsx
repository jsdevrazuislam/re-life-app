import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import signupStyles from '../styles/signup.style';
import Heading from '../components/Heading';
import Input from '../components/AppInput';
import AppButton from '../components/AppButton';
import {
  validateCheckbox,
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from '../validations/signup';
import Checkbox from '../components/Checkout';
import {AppStackParamList} from '../constants/route';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from '../hooks/useTranslation';
import AppLogo from '../components/AppLogo';

const SignupScreen = () => {
  const {t} = useTranslation();
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleSubmit = () => {
    const nameError = validateName(email);
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const checkError = validateCheckbox(isChecked);

    if (
      !emailError &&
      !passwordError &&
      !nameError &&
      !usernameError &&
      !checkError
    ) {
      Alert.alert('Form submitted!');
    } else {
      Alert.alert('Please fix the errors!');
    }
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
            <Input
              label={t('mosquesName')}
              placeholder={t('mosquesNamePlaceholder')}
              value={name}
              onChangeText={setName}
              validation={validateName}
            />
            <Input
              label={t('username')}
              placeholder={t('placeholderUsername')}
              value={username}
              onChangeText={setUsername}
              validation={validateEmail}
            />
            <Input
              label={t('email')}
              placeholder={t('placeholderEmail')}
              value={email}
              onChangeText={setEmail}
              validation={validateEmail}
              keyboardType="email-address"
            />
            <Input
              label={t('password')}
              placeholder={t('placeholderPassword')}
              value={password}
              onChangeText={setPassword}
              validation={validatePassword}
              secureTextEntry
            />
            <Checkbox
              label={t('acceptTerms')}
              value={isChecked}
              onValueChange={setIsChecked}
            />
            <AppButton
              style={{marginTop: 20}}
              text={t('createAccount')}
              onPress={handleSubmit}
              variant="primary"
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
