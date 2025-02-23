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

interface PhoneNumberInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  inputStyles?: StyleProp<TextStyle>;
  inputWrapper?: StyleProp<ViewStyle>;
  disabled?: boolean;  
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
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const validatePhoneNumber = (number: string) => {
    const bangladeshPrefixes = /^(013|014|015|016|017|018|019)\d{8}$/;

    if (!number) return "Phone number is required.";
    if (!/^\d+$/.test(number)) return "Only numbers are allowed.";
    if (number.length < 11) return "Phone number must be 11 digits.";
    if (number.length > 11) return "Phone number cannot be more than 11 digits.";
    if (!bangladeshPrefixes.test(number)) return "Invalid Bangladeshi phone number format.";

    return null;
  };

  const handleBlur = () => {
    if (disabled) return; 
    setTouched(true);
    setError(validatePhoneNumber(value));
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
            if (touched) setError(validatePhoneNumber(numericText));
          }}
          onBlur={handleBlur}
          keyboardType="phone-pad"
          maxLength={11} 
          placeholderTextColor={Colors.placeholder}
          
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
