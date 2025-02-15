import {View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import {useTranslation} from '../hooks/useTranslation';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../constants/route';
import {validateEmail} from '../validations/signup';
import globalStyles from '../styles/global.style';
import AppLogo from '../components/ui/AppLogo';
import forgotPasswordStyles from '../styles/forgotPassword.style';
import BackButton from '../components/BackButton';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import Input from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';

const ForgotPasswordScreen = () => {
  const {t} = useTranslation();
  const [email, setEmail] = useState<string>('');
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  const handleSubmit = () => {
    const emailError = validateEmail(email);

    if (!emailError) {
      Alert.alert('Code Sent', 'A code has been sent to your email.');
      navigation.navigate('OtpScreen');
    } else {
      Alert.alert('Please fix the errors!');
    }
  };

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              <AppButton
                text={t('sendCode')}
                onPress={handleSubmit}
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
