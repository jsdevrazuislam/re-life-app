import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../configs/colors';

interface CheckboxProps {
  label?: string;
  value: boolean;
  onValueChange: (checked: boolean) => void;
  checkedColor?: string;
  uncheckedColor?: string;
  labelStyle?: object;
  error?: string;
  required?: boolean;
  disabled?: boolean; // 🔹 Added disabled prop
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  value,
  onValueChange,
  checkedColor = Colors.black,
  uncheckedColor = Colors.light,
  labelStyle,
  error,
  required = false,
  disabled = false, // 🔹 Default is false
}) => {
  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled} // 🔹 Disable touch event
        style={[
          styles.checkbox,
          { backgroundColor: value ? checkedColor : uncheckedColor },
          disabled && styles.disabledCheckbox, // 🔹 Apply disabled styles
        ]}
      >
        {value && <Icon name="checkmark" size={18} color={Colors.white} />}
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
  disabledCheckbox: {
    opacity: 0.5, // 🔹 Reduce opacity to indicate disabled
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});

export default Checkbox;
