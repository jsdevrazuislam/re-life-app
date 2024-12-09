import {View, Image} from 'react-native';
import React from 'react';
import signupStyles from '../../styles/signup.style';

const AppLogo = () => {
  return (
    <View style={signupStyles.container}>
      <Image
        source={require('../../assets/app_logo.png')}
        style={signupStyles.logo}
      />
    </View>
  );
};

export default AppLogo;
