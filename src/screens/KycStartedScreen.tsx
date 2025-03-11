import React from 'react';
import { View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { Colors } from '../configs/colors';
import { kycStartedStyles } from '../styles/kycStarted.styles';
import AppButton from '../components/ui/AppButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';
import { useTranslation } from '../hooks/useTranslation';

const KYCVerifyScreen = () => {
 
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation()
  
  const steps = [
    {
      icon: 'credit-card',
      title: t('title1'),
      description: t('description1'),
    },
    {
      icon: 'description',
      title: t('title3'),
      description: t('description3'),
    },
    {
      icon: 'lock',
      title: t('keySecurityTitle'),
      description: t('kycSecurityMessage'),
    },
  ];


  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={kycStartedStyles.scrollContent}>
        <View style={kycStartedStyles.header}>
          <Heading level={5} weight='Bold' style={kycStartedStyles.title}>{t('kycTitle')}</Heading>
          <Paragraph level='Small' weight='Medium' style={kycStartedStyles.subtitle}>
            {t('kycDescription')}
          </Paragraph>
        </View>

        <View style={kycStartedStyles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={kycStartedStyles.stepItem}>
              <Icon name={step.icon} size={30} color={Colors.primary} style={kycStartedStyles.stepIcon} />
              <View style={kycStartedStyles.stepTextContainer}>
                <Paragraph level='Small' weight='Bold' style={kycStartedStyles.stepTitle}>{step.title}</Paragraph>
                <Paragraph level='Small' weight='Medium' style={kycStartedStyles.stepDescription}>{step.description}</Paragraph>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={kycStartedStyles.footer}>
        <AppButton text={t('getStarted')} onPress={() => navigation.navigate('KycScreen')} />
      </View>
    </SafeAreaWrapper>
  );
};


export default KYCVerifyScreen;