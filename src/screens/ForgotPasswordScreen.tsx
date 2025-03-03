import { View, ScrollView, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useTranslation } from '../hooks/useTranslation';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
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
import LoadingOverlay from '../components/LoadingOverlay';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading, error } = useApi()
  const { setUserId, setStatus } = useAuthStore()

  const handleSubmit = async () => {

    const { data, message } = await request(
      'post',
      ApiStrings.RESEND_OTP,
      { emailOrPhone: email },
    );
    setUserId(data?.id);
    setStatus('')
    showToast('success', message);
    navigation.navigate('OtpScreen', { email: data?.email});
  };

  return (
    <SafeAreaWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={globalStyles.container}>
           <LoadingOverlay visible={loading} />
          <View style={forgotPasswordStyles.topSection}>
            <View style={forgotPasswordStyles.headerNavigation}>
              <BackButton />
              <AppLogo />
            </View>
            <Heading level={3} weight="Bold">
              {t('forgotPasswordTitle')}
            </Heading>
            <Paragraph level="Medium">{t('forgotPasswordDescription')}</Paragraph>
            <TouchableWithoutFeedback>
              <View style={forgotPasswordStyles.form}>
                <Input
                  label={t('emailOrPhoneLabel')}
                  placeholder={t('emailOrPhonePlaceholder')}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />
                {error && <ErrorMessage error={error} />}
                <AppButton
                  text={t('resetPasswordButton')}
                  onPress={handleSubmit}
                  disabled={!email || loading}
                  variant="primary"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaWrapper>
  );
};

export default ForgotPasswordScreen;
