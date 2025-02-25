import React, {FC } from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import Select from './ui/Select';

interface DropdownProps {
  data: {label: string; value: string}[];
  label: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: StyleProp<ViewStyle>
  value:string
}

const DropdownComponent: FC<DropdownProps> = ({
  data,
  label,
  value,
  onChange,
  placeholder = 'Select Item',
  style
}) => {

  return (
    <Select
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      data={data}
      search={true}
      style={style}
    />
  );
};

export default DropdownComponent;
