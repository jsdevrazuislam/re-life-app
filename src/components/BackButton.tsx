import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../configs/colors';
import { useNavigation } from '@react-navigation/native';

const BackButton = ({
  styles,
}: {
  styles?: StyleProp<ViewStyle>;
}) => {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigate.goBack()}
      style={[{
        borderWidth: 1,
        borderColor: Colors.neutral[300],
        padding: 10,
        borderRadius: 10,
      }, styles]}>
      <Icon name="chevron-back" size={24} />
    </TouchableOpacity>
  );
};

export default BackButton;
