import React, { useState } from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScaledSheet } from 'react-native-size-matters';
import { dropdownStyles } from '../../styles/components/dropdown.style';

interface SelectDropdownProps {
  label?: string;
  data: { label: string; value: string }[];
  value: string | null;
  onChange: (value: string) => void;
  validation?: (value: string) => string | null;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  search?: boolean;
  searchPlaceholder?: string;
  inputStyles?: StyleProp<TextStyle>;
  disabled?: boolean; 
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  data,
  value,
  onChange,
  validation,
  placeholder = 'Select an option',
  style,
  search,
  searchPlaceholder,
  inputStyles,
  disabled = false, 
}) => {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleSelect = (itemValue: string) => {
    if (disabled) return; 
    onChange(itemValue);
    if (validation) {
      setError(validation(itemValue));
    }
  };

  const handleBlur = () => {
    if (disabled) return;
    setTouched(true);
    if (validation) {
      setError(validation(value || ''));
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Dropdown
        data={data}
        labelField="label"
        valueField="value"
        value={value}
        onChange={item => handleSelect(item.value)}
        placeholder={placeholder}
        style={[
          styles.dropdown,
          error ? styles.inputError : null,
          disabled ? styles.disabledDropdown : null,
          inputStyles,
        ]}
        selectedTextStyle={[styles.selectedText, disabled ? styles.disabledText : null]}
        placeholderStyle={styles.placeholder}
        containerStyle={styles.dropdownContainer}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        onBlur={handleBlur}
        search={search && !disabled}
        searchPlaceholder={searchPlaceholder}
        disable={disabled}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginBottom: 16,
  },
  placeholder: {
    color: '#ccc',
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: 'white',
  },
  selectedText: {
    color: '#333',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  disabledDropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d1d1d1',
  },
  disabledText: {
    color: '#a0a0a0',
  },
});

export default SelectDropdown;

