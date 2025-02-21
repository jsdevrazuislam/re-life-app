import React, { FC, useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { dropdownStyles } from '../styles/components/dropdown.style';
import Paragraph from './ui/Paragraph';

interface DropdownProps {
  data: { label: string; value: string }[];
  label: string;
  placeholder?:string;
  onChange: (value: string) => void;
}

const DropdownComponent: FC<DropdownProps> = ({ data, label, onChange, placeholder = 'Select Item' }) => {
  const [value, setValue] = useState<string>('');
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={dropdownStyles.container}>
      <Paragraph level='Small' weight='Medium' style={dropdownStyles.label}>{label}</Paragraph>
      <Dropdown
        style={[dropdownStyles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={dropdownStyles.placeholderStyle}
        selectedTextStyle={dropdownStyles.selectedTextStyle}
        inputSearchStyle={dropdownStyles.inputSearchStyle}
        iconStyle={dropdownStyles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ?  placeholder : placeholder}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          onChange(item.value); 
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={dropdownStyles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;
