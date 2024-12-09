import {View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import {AppStackParamList} from '../constants/route';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {validateEmail, validatePassword} from '../validations/signup';
import globalStyles from '../styles/global.style';
import AppLogo from '../components/AppLogo';
import {useTranslation} from '../hooks/useTranslation';
import Heading from '../components/Heading';
import loginStyles from '../styles/login.style';
import Input from '../components/AppInput';
import AppButton from '../components/AppButton';
import Paragraph from '../components/Paragraph';

const LoginScreen = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleSubmit = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!emailError && !passwordError) {
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
            {t('signIn')}
          </Heading>
          <View style={loginStyles.loginForm}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              style={loginStyles.forgotPassword}>
              <Paragraph level='Small'>{t('forgotPassword')}</Paragraph>
            </TouchableOpacity>
            <AppButton
              text={t('signIn')}
              onPress={handleSubmit}
              variant="primary"
            />
            <View style={loginStyles.bottom}>
              <View style={loginStyles.lineContainer}>
                <View style={loginStyles.line} />
                <Paragraph level='Small'>{t('orLoginWith')}</Paragraph>
                <View style={loginStyles.line} />
              </View>
              <Paragraph style={loginStyles.bottomSecondTextStyle} level='Small'>{t('alreadyHaveAccount')}</Paragraph>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
