import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import buttonStyles from '../styles/button';
import {AppButtonProps} from '../types/button';

const AppButton: React.FC<AppButtonProps> = ({variant = 'primary', text, style}) => {
  const buttonStyle =
    variant === 'primary'
      ? buttonStyles.appButtonPrimary
      : buttonStyles.appButtonOutline;
  const textStyle =
    variant === 'primary'
      ? buttonStyles.buttonTextPrimary
      : buttonStyles.buttonTextOutline;

  return (
    <TouchableOpacity style={[buttonStyle, style]}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
