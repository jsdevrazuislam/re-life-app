import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { AppStackParamList } from '../constants/route';
import { NavigationProp, useNavigation } from '@react-navigation/native';
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
import { useAuthStore } from '../store/store';
import LoadingOverlay from '../components/LoadingOverlay';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginValidationSchema } from '../validations/login';

const LoginScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onBlur'
  });
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, error } = useApi();
  const [loading, setLoading] = useState(false)
  const {
    setUser,
    setRole,
    setTempEmail,
    setUserId,
    setTempUser,
    loadUserFromStorage
  } = useAuthStore();

  const handleFormSubmit = async (formData: any) => {
    setLoading(true)
    const { data, message } = await request('post', ApiStrings.LOGIN, {
      password: formData?.password,
      emailOrPhone: formData?.emailOrPhone,
    });
    const user = data?.user;
    await setUser(user, data?.accessToken, data?.refreshToken);
    setRole(user?.role);
    setLoading(false)
    loadUserFromStorage()
    if (user?.signupStep === 'otp_pending') {
      setTempEmail(formData?.emailOrPhone)
      setUserId(user._id)
      navigation.navigate('OtpScreen', { email: formData?.emailOrPhone })
    } else if (user?.signupStep === 'kyc_pending' || user?.kycStatus === 'none') {
      setUserId(user._id)
      setTempUser({ name: user?.fullName, emailOrPhone: user?.emailOrPhone})
      navigation.navigate('KycStartedScreen');
    } else if (user?.kycStatus === 'pending' || 'rejected') {
      navigation.navigate('ImamPendingScreen');
    }  else if (user?.isBlocked) {
      navigation.navigate('BlockScreen');
    } else {
      navigation.navigate('ImamHomeScreen', {});
    }
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              globalStyles.container,
              { justifyContent: 'center', alignItems: 'center' },
            ]}>
            <LoadingOverlay visible={!error && loading} />

            <View style={{ width: '100%', alignItems: 'center' }}>
              <AppLogo />
              <Heading
                style={{ textAlign: 'center', marginTop: 10 }}
                level={4}
                weight="Bold">
                {t('signInTitle')}
              </Heading>
            </View>

            <View style={[loginStyles.loginForm, { width: '100%' }]}>
              <Controller
                name='emailOrPhone'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('emailOrPhoneLabel')}
                    placeholder={t('emailOrPhonePlaceholder')}
                    value={value}
                    onChangeText={onChange}
                    error={errors?.emailOrPhone?.message}
                    keyboardType="email-address"
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    label={t('passwordLabel')}
                    placeholder={t('confirmPasswordLabel')}
                    value={value}
                    onChangeText={onChange}
                    error={errors?.password?.message}
                    secureTextEntry
                  />
                )}
              />
              {error && (
                <Paragraph
                  style={loginStyles.errorMessage}
                  level="Small"
                  weight="SemiBold">
                  {error}
                </Paragraph>
              )}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                style={loginStyles.forgotPassword}>
                <Paragraph level="Small">{t('forgotPassword')}</Paragraph>
              </TouchableOpacity>
              <AppButton
                text={t('signInButton')}
                onPress={handleSubmit(handleFormSubmit)}
                variant="primary"
              />
              <View style={loginStyles.bottom}>
                <View style={loginStyles.lineContainer}>
                  <View style={loginStyles.line} />
                  <Paragraph level="Small">{t('noAccount')}</Paragraph>
                  <View style={loginStyles.line} />
                </View>
                <View style={loginStyles.flex}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SignupScreen')}>
                    <Paragraph
                      style={loginStyles.bottomSecondTextStyle}
                      level="Small"
                      weight="Medium">
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
