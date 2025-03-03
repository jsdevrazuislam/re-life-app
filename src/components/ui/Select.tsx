import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Feather';
import Paragraph from './Paragraph';
import { Colors } from '../../configs/colors';
import { ScaledSheet } from 'react-native-size-matters';
import Input from './AppInput';
import { useTranslation } from '../../hooks/useTranslation';
import ErrorMessage from '../ErrorMessage';

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
  error?:string
}

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select an option',
  search = false,
  searchPlaceholder = 'Search...',
  style,
  rootStyle,
  label,
  disabled = false,
  error
}) => {
  const modalRef = useRef<Modalize>(null);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [data, searchText, search]);

  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
      modalRef.current?.close();
    },
    [onChange]
  );

  return (
    <View style={[{ marginTop: 10 }, rootStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => !disabled && modalRef.current?.open()}
        style={[
         error ? styles.dropdownButtonError : styles.dropdownButton,
          style,
          disabled && styles.disabledDropdown,
        ]}
        disabled={disabled}
      >
        <Paragraph
          style={[{ color: error ? Colors.danger : Colors.placeholder }, disabled && styles.disabledText]}
          level='Small'
        >
          {value || placeholder}
        </Paragraph>
        <Icon name='chevron-down' size={16} color={error ? Colors.danger : disabled ? Colors.lightGray : Colors.text} />
      </TouchableOpacity>

      <Portal>
        <Modalize ref={modalRef} adjustToContentHeight>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.modalContent}>
              {search && (
                <Input
                  placeholder={searchPlaceholder}
                  value={searchText}
                  onChangeText={setSearchText}
                />
              )}

              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={filteredData}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleChange(item.value)}
                    style={styles.option}
                  >
                    <Paragraph style={{ color: Colors.text }} level='Small' weight='Medium'>
                      {item.label}
                    </Paragraph>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => `${item.value}-${item.label}`}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                ListEmptyComponent={
                  <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>
                    {t('noResultsFound')}
                  </Paragraph>
                }
              />
            </View>
          </KeyboardAvoidingView>
        </Modalize>
      </Portal>
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

export default React.memo(SelectDropdown);


const styles = ScaledSheet.create({
  label: {
    marginBottom: 2,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  dropdownButtonError: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.danger,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white
  },
  modalContent: {
    padding: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  disabledDropdown: {
    backgroundColor: '#f0f0f0',
    borderColor: '#d1d1d1',
  },
  disabledText: {
    color: '#a0a0a0',
  },
});
