import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { Colors } from '../configs/colors';
import { kycStartedStyles } from '../styles/kycStarted.styles';
import AppButton from '../components/ui/AppButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Paragraph from '../components/ui/Paragraph';
import Heading from '../components/ui/Heading';

const KYCVerifyScreen = () => {
  const steps = [
    {
      icon: 'credit-card',
      title: 'Take a picture of a valid ID',
      description: 'To check your personal information are correct',
    },
    {
      icon: 'camera-alt',
      title: 'Take a selfie of yourself',
      description: 'To match your face to your passport or ID photo',
    },
    {
      icon: 'description',
      title: 'Take a selfie of your immam document',
      description: 'To match your face to your passport or ID photo',
    },
  ];

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  

  return (
    <SafeAreaWrapper>
      <ScrollView contentContainerStyle={kycStartedStyles.scrollContent}>
        <View style={kycStartedStyles.header}>
          <Heading level={5} weight='Bold' style={kycStartedStyles.title}>Verifying your identity</Heading>
          <Paragraph level='Small' weight='Medium' style={kycStartedStyles.subtitle}>
            Please submit the following documents to process your application
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
        <View style={kycStartedStyles.securityInfo}>
          <Icon name="lock" size={20} color="#4CAF50" />
          <Paragraph level='Small' weight='Medium' style={kycStartedStyles.securityText}>
            Your info will be encrypted and stored securely
          </Paragraph>
        </View>
        <AppButton text='Get Started' onPress={() => navigation.navigate('KycScreen')} />
      </View>
    </SafeAreaWrapper>
  );
};


export default KYCVerifyScreen;