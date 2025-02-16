import React from 'react';
import {View, Text, Image} from 'react-native';
import {splashStyles} from '../styles/splash.styles';

const SplashScreen = () => {


  return (
    <View style={splashStyles.container}>
      <Image source={require('../assets/app_logo.png')} style={splashStyles.logo} />
      <Text style={splashStyles.title}>Welcome to MyApp</Text>
      <Text style={splashStyles.subtitle}>Your finances made simple</Text>
    </View>
  );
};

export default SplashScreen;
