import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors } from '../../configs/colors';
import ErrorMessage from '../ErrorMessage';

interface PhoneNumberInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  inputWrapper?: StyleProp<ViewStyle>;
  disabled?: boolean;  
  error?:string
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  placeholder = "Enter your phone number",
  value,
  onChangeText,
  style,
  inputStyles,
  inputWrapper,
  disabled = false, 
  error
}) => {


  const handleBlur = () => {
    if (disabled) return; 
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.error : styles.default , disabled && styles.disabledWrapper, inputWrapper]}>
        <TextInput
          style={[
            styles.input, 
            disabled ? styles.disabledInput : null,
            inputStyles
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={(text) => {
            const numericText = text.replace(/[^0-9]/g, '');
            onChangeText(numericText);
          }}
          onBlur={handleBlur}
          keyboardType="phone-pad"
          maxLength={11} 
          placeholderTextColor={Colors.placeholder}
          
        />
      </View>
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: 16,
  },
  default:{
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error:{
    borderWidth: 1,
    borderColor: Colors.danger
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    fontWeight: '400',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 12,
    backgroundColor: Colors.white, 
    
  },
  input: {
    flex: 1,
    padding: 12,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    color: Colors.text,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#a0a0a0', 
  },
  disabledWrapper: {
    backgroundColor: '#f0f0f0', 
    borderColor: '#d1d1d1',
  },
});

export default PhoneNumberInput;
