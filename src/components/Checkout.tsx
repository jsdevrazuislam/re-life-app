import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface CheckboxProps {
  label?: string;
  value: boolean;
  onValueChange: (checked: boolean) => void;
  checkedColor?: string;
  uncheckedColor?: string;
  labelStyle?: object;
  error?: string
  required?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onValueChange,
  checkedColor = '#000',
  uncheckedColor = '#ccc',
  labelStyle,
  error,
  required = false,
}) => {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.checkbox,
          { backgroundColor: value ? checkedColor : uncheckedColor },
        ]}
      >
        {value && <Icon name="checkmark" size={18} color="#fff" />}
      </TouchableOpacity>
      <View>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        {required && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Checkbox;
