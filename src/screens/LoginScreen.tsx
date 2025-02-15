import { View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { validateEmail, validatePassword } from '../validations/signup';
import globalStyles from '../styles/global.style';
import AppLogo from '../components/ui/AppLogo';
import { useTranslation } from '../hooks/useTranslation';
import Heading from '../components/ui/Heading';
import loginStyles from '../styles/login.style';
import Input from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { showToast } from '../utils/toast';
import { Colors } from '../configs/colors';
import { useAuthStore } from '../store/store';

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi();
  const { setUser , setRole } = useAuthStore()

  const handleSubmit = async () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (!emailError && !passwordError) {
      const { data, message } = await request('post', ApiStrings.LOGIN, { password, emailOrPhone: email?.toLowerCase() });
      setUser(data?.user, data?.accessToken, data?.refreshToken)
      setRole(data?.user?.role)
      showToast('success', message)
      navigation.navigate('HomeScreen')
    } else {
      showToast('error', 'Please fix the errors!');
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
            {error && <Paragraph style={loginStyles.errorMessage} level='Small' weight='SemiBold'>{error}</Paragraph>}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}
              style={loginStyles.forgotPassword}>
              <Paragraph level="Small">{t('forgotPassword')}</Paragraph>
            </TouchableOpacity>
            <AppButton
              text={t('signIn')}
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
            />
            <View style={loginStyles.bottom}>
              <View style={loginStyles.lineContainer}>
                <View style={loginStyles.line} />
                <Paragraph level="Small">{t('orLoginWith')}</Paragraph>
                <View style={loginStyles.line} />
              </View>
              <View style={loginStyles.flex}>
                <Paragraph
                  style={loginStyles.bottomSecondTextStyle}
                  level="Small">
                  {t('alreadyHaveAccount')}
                </Paragraph>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignupScreen')}>
                  <Paragraph
                    style={loginStyles.bottomSecondTextStyle}
                    level="Small"
                    weight="Medium">
                    {' '}
                    {t('signUp')}
                  </Paragraph>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
