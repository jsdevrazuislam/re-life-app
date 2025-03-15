


interface DropdownItem {
  label: string;
  value: string;
}

interface SelectDropdownProps {
  label?: string;
  data: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
  style?: StyleProp<ViewStyle>;
  rootStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  error?: string,
  variant?: 'default' | 'details'
}
