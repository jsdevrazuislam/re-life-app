import { View } from 'react-native'
import React, { useEffect } from 'react'
import SafeAreaWrapper from '../components/SafeAreaWrapper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ScaledSheet } from 'react-native-size-matters'
import Heading from '../components/ui/Heading'
import Paragraph from '../components/ui/Paragraph'
import AppButton from '../components/ui/AppButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../constants/route'

const KycSuccessScreen = () => {

    const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen')
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return (
    <SafeAreaWrapper bg={'#DDEBFE'}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Icon name="check-circle" size={50} color="#4CAF50" style={styles.icon} />
          <Heading level={6} weight='Bold' style={styles.title}>KYC Submitted Successfully!</Heading>
          <Paragraph level='Small' weight='Medium' style={styles.description}>
            Thank you for completing your KYC. We've received your information and will review it shortly. 
            You'll be notified once the verification process is complete.
          </Paragraph>
          <AppButton text='Return to Dashboard' />
        </View>
      </View>
    </SafeAreaWrapper>
  )
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20@s'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '16@s',
    padding: '24@s',
    width: '100%',
    maxWidth: '340@s',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3
  },
  icon: {
    marginBottom: '24@vs'
  },
  title: {
    color: '#333',
    textAlign: 'center',
    marginBottom: '16@vs'
  },
  description: {
    fontSize: '14@ms',
    color: '#666',
    textAlign: 'center',
    lineHeight: '20@vs',
    marginBottom: '24@vs'
  },
  button: {
    backgroundColor: '#3F51B5',
    borderRadius: '8@s',
    paddingVertical: '12@vs',
    paddingHorizontal: '24@s',
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: '16@ms',
    fontWeight: '500'
  }
})

export default KycSuccessScreen