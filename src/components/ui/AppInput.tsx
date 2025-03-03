import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTranslation } from '../../hooks/useTranslation';
import { Colors } from '../../configs/colors';
import ErrorMessage from '../ErrorMessage';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  style?: object;
  inputStyles?: StyleProp<TextStyle>;
  inputWrapper?: StyleProp<ViewStyle>;
  isNumber?: boolean;
  disabled?: boolean;  
  error?:string
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType = 'default',
  secureTextEntry = false,
  inputStyles,
  style,
  inputWrapper,
  isNumber = false,
  disabled = false,  
  error
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();

  const handleBlur = () => {
    if (disabled) return; 
    if (onBlur) onBlur();
  };

  const handleChangeText = (text: string) => {
    if (disabled) return;
    if (isNumber) {
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
    
   
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, error ? styles.error : styles.default , disabled && styles.disabledWrapper, inputWrapper]}>
        <TextInput
          style={[
            styles.input,
            disabled ? styles.disabledInput : null,
            inputStyles,
          ]}
          placeholder={placeholder ? placeholder : t("Enter Your Value")}
          value={value}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          keyboardType={isNumber ? 'numeric' : keyboardType}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          editable={!disabled} 
          placeholderTextColor={Colors.placeholder}
        />
        {secureTextEntry && !disabled && (
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconWrapper}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
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
  default:{
    borderWidth: 1,
    borderColor: '#ccc',
  },
  error:{
    borderWidth: 1,
    borderColor: Colors.danger
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
  iconWrapper: {
    marginLeft: -30,
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

export default Input;
