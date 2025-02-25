import React from 'react';
import { View, Image } from 'react-native';
import { splashStyles } from '../styles/splash.styles';

const SplashScreen = () => {


  return (
    <View style={splashStyles.container}>
      <Image source={require('../assets/app_logo.png')} style={splashStyles.image} />
    </View>
  );
};

export default SplashScreen;
