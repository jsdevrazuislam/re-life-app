import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import loginStyles from '../styles/login.style';
import { useTranslation } from '../hooks/useTranslation';
import Input from '../components/ui/AppInput';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { showToast } from '../utils/toast';
import Header from '../components/Header';
import LoadingOverlay from '../components/LoadingOverlay';

const ResetPasswordScreen = () => {

  const { request, loading, error } = useApi();
  const { setRole, userTempEmail, userTempId, setStatus, setTempEmail, } = useAuthStore();
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const route = useRoute<AddCommitteeScreenRouteProp>();

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPasword: '',
  });

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPasword) {
      showToast('error', "New password and confirm password do not match.");
      return;
    }

    console.log({
      emailOrPhone: userTempEmail,
      otp: route.params?.otp,
      newPassword: formData.newPassword,
      userId: userTempId
    })

    const { message } = await request('post', ApiStrings.RESET_PASSWORD, {
      emailOrPhone: userTempEmail || route?.params?.email,
      otp: route.params?.otp,
      newPassword: formData.newPassword,
      userId: userTempId
    });
    
    setRole('')
    setStatus('')
    setTempEmail('')
    showToast('success', message);
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaWrapper>
      <ScrollView>
        <View style={globalStyles.container}>
          <Header title={t('resetPasswordTitle')} />
          <LoadingOverlay visible={loading} />
          <View style={loginStyles.loginForm}>
            <Input
              label={t('newPasswordLabel')}
              placeholder={t('newPasswordPlaceholder')}
              value={formData.newPassword}
              onChangeText={text =>
                setFormData({ ...formData, newPassword: text })
              }
              secureTextEntry
            />
            <Input
              label={t('confirmPasswordLabel')}
              placeholder={t('confirmPasswordPlaceholder')}
              value={formData.confirmPasword}
              onChangeText={text =>
                setFormData({ ...formData, confirmPasword: text })
              }
              secureTextEntry
            />
            {error && (
              <Paragraph
                style={loginStyles.errorMessage}
                level="Small"
                weight="SemiBold">
                {error}
              </Paragraph>
            )}
            <AppButton
              text={t('resetPasswordButton')}
              onPress={handleSubmit}
              variant="primary"
              style={{ marginTop: '85%' }}
              disabled={!formData.confirmPasword || !formData.newPassword}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  )
}

export default ResetPasswordScreen