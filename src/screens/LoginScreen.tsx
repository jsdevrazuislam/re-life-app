import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
import { useAuthStore } from '../store/store';
import LoadingOverlay from '../components/LoadingOverlay';

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi();
  const { setUser, setRole } = useAuthStore()
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  const handleSubmit = async () => {
    const { data, message } = await request('post', ApiStrings.LOGIN, { password, emailOrPhone: email?.toLowerCase() });
    const user = data?.user;
    await setUser(user, data?.accessToken, data?.refreshToken)
    setRole(user?.role)
    showToast('success', message)
    if(user?.kycStatus === 'pending' || 'rejected'){
      navigation.navigate('ImamPendingScreen')
    } else if(user?.isBlocked){
      navigation.navigate('BlockScreen')
    } else {
      navigation.navigate('HomeScreen')
    }
  };

  return (
    <SafeAreaWrapper>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <LoadingOverlay visible={loading} />

          <View style={{ width: '100%', alignItems: 'center' }}>
            <AppLogo />
            <Heading style={{ textAlign: 'center', marginTop: 10 }} level={4} weight="Bold">
              {t('signInTitle')}
            </Heading>
          </View>

          <View style={[loginStyles.loginForm, { width: '100%' }]}>
            <Input
              label={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
              value={email}
              onChangeText={setEmail}
              validation={validateEmail}
              keyboardType="email-address"
            />
            <Input
              label={t('passwordLabel')}
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChangeText={setPassword}
              validation={validatePassword}
              secureTextEntry
            />
            {error && (
              <Paragraph style={loginStyles.errorMessage} level='Small' weight='SemiBold'>
                {error}
              </Paragraph>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} style={loginStyles.forgotPassword}>
              <Paragraph level="Small">{t('forgotPassword')}</Paragraph>
            </TouchableOpacity>
            <AppButton
              text={t('signInButton')}
              onPress={handleSubmit}
              variant="primary"
              disabled={emailError && true || passwordError && true || !email || !password}
            />
            <View style={loginStyles.bottom}>
              <View style={loginStyles.lineContainer}>
                <View style={loginStyles.line} />
                <Paragraph level="Small">{t('noAccount')}</Paragraph>
                <View style={loginStyles.line} />
              </View>
              <View style={loginStyles.flex}>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                  <Paragraph style={loginStyles.bottomSecondTextStyle} level="Small" weight="Medium">
                    {t('signUpPrompt')}
                  </Paragraph>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaWrapper>
  );
};

export default LoginScreen;
