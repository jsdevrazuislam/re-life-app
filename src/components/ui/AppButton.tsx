import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import buttonStyles from '../../styles/components/button.style';
import { AppButtonProps } from '../../types/button';

const AppButton: React.FC<AppButtonProps> = ({ variant = 'primary', text, style, onPress, disabled }) => {
  const buttonStyle =
    variant === 'primary'
      ? disabled
        ? [buttonStyles.appButtonPrimary, { backgroundColor: 'gray' }] 
        : buttonStyles.appButtonPrimary
      : disabled
      ? [buttonStyles.appButtonOutline, { backgroundColor: 'gray' }] 
      : buttonStyles.appButtonOutline;

  const textStyle =
    variant === 'primary'
      ? disabled
        ? [buttonStyles.buttonTextPrimary, { color: 'lightgray' }] 
        : buttonStyles.buttonTextPrimary
      : disabled
      ? [buttonStyles.buttonTextOutline, { color: 'lightgray' }] 
      : buttonStyles.buttonTextOutline;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[buttonStyle, style]}>
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
