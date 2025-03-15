import React, { useRef, useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, StyleProp, ViewStyle, Modal, ActivityIndicator } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/Feather';
import Paragraph from './Paragraph';
import { Colors } from '../../configs/colors';
import { mvs, ScaledSheet } from 'react-native-size-matters';
import Input from './AppInput';
import { useTranslation } from '../../hooks/useTranslation';
import ErrorMessage from '../ErrorMessage';
import { useApi } from '../../hooks/useApi';
import ApiStrings from '../../lib/apis_string';
import { useAuthStore } from '../../store/store';
import ImageComponent from './Image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImageView from 'react-native-image-zoom-viewer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useDebounce from '../../hooks/useDebounce';

const SelectDropdown: React.FC<SelectDropdownProps> = ({
  data,
  value,
  onChange,
  placeholder = 'Select an option',
  search = false,
  style,
  rootStyle,
  label,
  disabled = false,
  error,
  variant = 'default'
}) => {
  const modalRef = useRef<Modalize>(null);
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const { request } = useApi()
  const { user } = useAuthStore()
  const [masjids, setMasjids] = useState<ModeratorResponse[]>([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const [isSearching, setIsSearching] = useState(false);


  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      item.label.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
  }, [data,debouncedSearchText]);

  const filteredMasjidsData = useMemo(() => {
   if(variant === 'details'){
    if (!search) return masjids;
    return masjids.filter((item) =>
      item.name?.toLowerCase().includes(debouncedSearchText.toLowerCase()) || 
      item.fullAddress?.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );
   }
  }, [masjids, debouncedSearchText]);

  const handleChange = useCallback(
    (value: string) => {
      onChange(value);
      modalRef.current?.close();
    },
    [onChange]
  );

  useEffect(() => {
    setIsSearching(true); 
  }, [searchText]);

  useEffect(() => {
    setIsSearching(false); 
  }, [filteredData]);

  useEffect(() => {
    (async () => {
      if (variant === 'details') {
        const { data } = await request('post', ApiStrings.GET_MASJIDS_MODERATOR, { masjidIds: user?.masjids });
        setMasjids(data)
      }
    })()
  }, [variant, user])

  return (
    <View style={[{ marginBottom: 10 }, rootStyle]}>
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
                  placeholder={t('searchPlaceholder')}
                  onChangeText={(text) => {
                    setSearchText(text); 
                  }}
                />
              )}

            {isSearching ? <ActivityIndicator size='large' color={Colors.primary} /> : <>
            
            {
                variant === 'default' ? <FlatList
                  nestedScrollEnabled={true}
                  scrollEnabled={false}
                  data={filteredData}
                  removeClippedSubviews={true} 
                  initialNumToRender={10} 
                  maxToRenderPerBatch={10} 
                  windowSize={5} 
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
                  ListEmptyComponent={
                    <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>
                      {t('noResultsFound')}
                    </Paragraph>
                  }
                /> : <FlatList
                  nestedScrollEnabled={true}
                  scrollEnabled={false}
                  data={filteredMasjidsData}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => handleChange(item._id)}
                      style={[styles.flexRow, styles.option]}
                    >
                      <View>
                        <Paragraph style={{ color: Colors.text }} level='Small' weight='Medium'>
                          {item.name}
                        </Paragraph>
                        <Paragraph style={{ color: Colors.text }} level='Small' weight='Medium'>
                          {item.fullAddress}
                        </Paragraph>
                        <Paragraph style={{ color: Colors.text }} level='Small' weight='Medium'>
                          {item.location.district}, {item.location.union} , {item.location.upazila} , {item.location.village}
                        </Paragraph>
                      </View>
                      <View style={{ position: 'relative' }}>
                        <ImageComponent source={item.masjidProfile[0].url} style={{ width: 50, height: 50, borderRadius: 5 }} />
                        <TouchableOpacity style={styles.expanded} onPress={() => openImage(item.masjidProfile[0].url)}>
                          <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(8)} />
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => `${item._id}-${item.name}`}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={5}
                  ListEmptyComponent={
                    <Paragraph level="Small" style={{ textAlign: 'center', marginTop: 20 }}>
                      {t('noResultsFound')}
                    </Paragraph>
                  }
                />
              }

            </>}

             
            </View>
          </KeyboardAvoidingView>
        </Modalize>
      </Portal>
      <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
        <ImageView renderHeader={() => (
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        )} imageUrls={[{ url: selectedImage }]} onCancel={() => setVisible(false)} enableSwipeDown />
      </Modal>
      {error && <ErrorMessage error={error} />}
    </View>
  );
};

export default React.memo(SelectDropdown);


const styles = ScaledSheet.create({
  label: {
    marginBottom: 6,
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '18@ms',
    letterSpacing: '0@ms',
    fontWeight: '400',
  },
  expanded: {
    width: 20,
    height: 20,
    backgroundColor: Colors.black,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    right: 0
  },
  dropdownButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  disabledDropdown: {
    backgroundColor: Colors.neutral[200],
    borderColor: Colors.neutral[200],
  },
  disabledText: {
    color: Colors.lightGray,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
