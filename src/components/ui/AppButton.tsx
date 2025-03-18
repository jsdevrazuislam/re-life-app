import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import buttonStyles from '../../styles/components/button.style';
import { AppButtonProps } from '../../types/button';
import { Colors } from '../../configs/colors';

const AppButton: React.FC<AppButtonProps> = ({ loading,  variant = 'primary', text, style, onPress, disabled }) => {
  const buttonStyle =
    variant === 'primary'
      ? disabled
        ? [buttonStyles.appButtonPrimary, { backgroundColor: 'gray' }] 
        : buttonStyles.appButtonPrimary
      : disabled
      ? [buttonStyles.appButtonOutline, { backgroundColor: Colors.neutral[200], borderColor: Colors.neutral[200] }] 
      : buttonStyles.appButtonOutline;

  const textStyle =
    variant === 'primary'
      ? disabled
        ? [buttonStyles.buttonTextPrimary, { color: 'lightgray' }] 
        : buttonStyles.buttonTextPrimary
      : disabled
      ? [buttonStyles.buttonTextOutline, { color: 'gray' }] 
      : buttonStyles.buttonTextOutline;

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={[buttonStyle, style]}>
      {loading ?  <ActivityIndicator size='small' color={Colors.white} /> : <Text style={textStyle}>{text}</Text>}
    </TouchableOpacity>
  );
};

export default AppButton;
