import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import openingStyles from '../styles/opening_screen.styles';
import globalStyles from '../styles/global.style';
import Heading from '../components/ui/Heading';
import { Typography } from '../styles/typography';
import AppButton from '../components/ui/AppButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import { useTranslation } from '../hooks/useTranslation';

const OpeningScreen = () => {

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation();


  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={openingStyles.skipButton}>
          <Text>{t('skip')}</Text>
        </TouchableOpacity>
        <View style={openingStyles.container}>
          <Image
            source={require('../assets/app_logo.png')}
            style={openingStyles.image}
          />
        </View>
        <View style={openingStyles.appTitle}>
          <Heading style={{ textAlign: 'center' }} level={3} weight="Bold">
            {t('introTitle')}
          </Heading>
          <Text
            style={[
              Typography.paragraphMediumRegular,
              openingStyles.appDescription,
            ]}>
            {t('introDescription')}
          </Text>
        </View>
        <View style={openingStyles.bottomSection}>
          <AppButton
            variant="primary"
            style={openingStyles.mb}
            text={t('getStarted')}
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <AppButton variant="outline" text={t('signUpPrompt')} onPress={() => navigation.navigate('SignupScreen')} />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

export default OpeningScreen;
