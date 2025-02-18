import { View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import styles from '../styles/imamSetting.styles';
import BackButton from '../components/BackButton';
import Heading from '../components/ui/Heading';
import loginStyles from '../styles/login.style';
import { useTranslation } from '../hooks/useTranslation';
import Input from '../components/ui/AppInput';
import { validatePassword } from '../validations/signup';
import Paragraph from '../components/ui/Paragraph';
import { useApi } from '../hooks/useApi';
import AppButton from '../components/ui/AppButton';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { showToast } from '../utils/toast';

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

    const { message } = await request('post', ApiStrings.RESET_PASSWORD, {
      emailOrPhone: userTempEmail,
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
          <View style={styles.header}>
            <BackButton />
            <Heading level={5} weight="Bold" style={styles.headerTitle}>
              Reset Password
            </Heading>
            <View />
          </View>
          <View style={loginStyles.loginForm}>
            <Input
              label={t('password')}
              placeholder={t('placeholderPassword')}
              value={formData.newPassword}
              onChangeText={text =>
                setFormData({ ...formData, newPassword: text })
              }
              validation={validatePassword}
              secureTextEntry
            />
            <Input
              label={t('password')}
              placeholder={t('placeholderPassword')}
              value={formData.confirmPasword}
              onChangeText={text =>
                setFormData({ ...formData, confirmPasword: text })
              }
              validation={validatePassword}
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
              text={t('signIn')}
              onPress={handleSubmit}
              variant="primary"
              loading={loading}
              style={{ marginTop: '85%' }}
              disabled={!formData.confirmPasword || !formData.newPassword || loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaWrapper>
  )
}

export default ResetPasswordScreen