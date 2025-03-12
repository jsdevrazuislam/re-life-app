import React from 'react';
import { View, TextInput, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Paragraph from './Paragraph';
import ErrorMessage from '../ErrorMessage';
import { Colors } from '../../configs/colors';

interface TextareaProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  maxLength?: number;
  numberOfLines?: number;
  error?:string
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChangeText,
  placeholder = 'Enter text...',
  style,
  inputStyle,
  maxLength = 500,
  numberOfLines = 4,
  error
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Paragraph level='Small' weight='Medium' style={styles.label}>{label}</Paragraph>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={error ? Colors.danger : Colors.placeholder}
        multiline
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        style={[
          styles.textarea,
          error && { borderColor: Colors.danger},
          { height: moderateScale(numberOfLines * 20) },
          inputStyle,
        ]}
      />
      {error && <Paragraph level='Small' weight='Medium' style={{ color: Colors.danger}}>{error}</Paragraph>}
      <Paragraph level='XSmall' weight='Medium' style={styles.charCount}>{`${value?.length}/${maxLength}`}</Paragraph>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: '1@ms',
  },
  label: {
    marginBottom: '6@ms',
    color: Colors.text,
  },
  textarea: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: '8@ms',
    padding: '12@ms',
    fontSize: '14@ms',
    textAlignVertical: 'top',
    color: Colors.text,
  },
  charCount: {
    color: Colors.lightGray,
    textAlign: 'right',
    marginTop: '4@ms',
  },
});

export default Textarea;
