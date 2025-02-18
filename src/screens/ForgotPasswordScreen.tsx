import { View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useTranslation } from '../hooks/useTranslation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { validateEmail } from '../validations/signup';
import globalStyles from '../styles/global.style';
import AppLogo from '../components/ui/AppLogo';
import forgotPasswordStyles from '../styles/forgotPassword.style';
import BackButton from '../components/BackButton';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';
import { useApi } from '../hooks/useApi';
import ErrorMessage from '../components/ErrorMessage';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { showToast } from '../utils/toast';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi()
  const { setUserId, setStatus, setTempEmail } = useAuthStore()

  const handleSubmit = async () => {

    const { data, message } = await request(
      'post',
      ApiStrings.RESEND_OTP,
      { emailOrPhone: email },
    );
    setUserId(data?.id);
    setTempEmail(data?.email)
    setStatus('')
    showToast('success', message);
    navigation.navigate('OtpScreen');
  };

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
          <View style={forgotPasswordStyles.topSection}>
            <View style={forgotPasswordStyles.headerNavigation}>
              <BackButton />
              <AppLogo />
            </View>
            <Heading level={3} weight="Bold">
              {t('forgotPassword')}
            </Heading>
            <Paragraph level="Medium">{t('dontWorry')}</Paragraph>
            <View style={forgotPasswordStyles.form}>
              <Input
                label={t('email')}
                placeholder={t('placeholderEmail')}
                value={email}
                onChangeText={setEmail}
                validation={validateEmail}
                keyboardType="email-address"
              />
              {error && <ErrorMessage error={error} />}
              <AppButton
                text={t('sendCode')}
                onPress={handleSubmit}
                loading={loading}
                disabled={!email || loading}
                variant="primary"
              />
            </View>
          </View>
          <View style={forgotPasswordStyles.flex}>
            <Paragraph level="Medium">{t('rememberPassword')}</Paragraph>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
              <Paragraph level="Medium" weight="Medium">
                {t('signIn')}
              </Paragraph>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default ForgotPasswordScreen;
