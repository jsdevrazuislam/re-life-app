import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../constants/route';
import {splashStyles} from '../styles/splash.style';

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('OpeningScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={splashStyles.container}>
      <Image source={require('../assets/logo.png')} style={splashStyles.logo} />
      <Text style={splashStyles.title}>Welcome to MyApp</Text>
      <Text style={splashStyles.subtitle}>Your finances made simple</Text>
    </View>
  );
};

export default SplashScreen;
