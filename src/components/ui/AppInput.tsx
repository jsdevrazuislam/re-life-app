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

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  secureTextEntry?: boolean;
  validation?: (value: string) => string | null;
  style?: object;
  inputStyles?: StyleProp<TextStyle>;
  inputWrapper?: StyleProp<ViewStyle>;
  isNumber?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  keyboardType = 'default',
  secureTextEntry = false,
  validation,
  inputStyles,
  style,
  inputWrapper,
  isNumber = false,  // Default is false
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();

  const handleBlur = () => {
    setTouched(true);
    if (validation) {
      const validationError = validation(value);
      setError(validationError);
    }
    if (onBlur) onBlur();
  };

  const handleChangeText = (text: string) => {
    if (isNumber) {
      const numericText = text.replace(/[^0-9]/g, '');
      onChangeText(numericText);
    } else {
      onChangeText(text);
    }
    
    if (touched && validation) {
      setError(validation(text));
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputWrapper, inputWrapper]}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null, inputStyles]}
          placeholder={placeholder ? placeholder : t("Enter Your Value")}
          value={value}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          keyboardType={isNumber ? 'numeric' : keyboardType}  // Set keyboardType to numeric if isNumber is true
          secureTextEntry={secureTextEntry && !isPasswordVisible}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconWrapper}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-off'} size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    paddingRight: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
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
});

export default Input;