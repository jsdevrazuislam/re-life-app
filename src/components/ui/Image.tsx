import React from 'react';
import { ActivityIndicator, ImageSourcePropType, StyleProp } from 'react-native';
import Image from 'react-native-image-progress';
import { Colors } from '../../configs/colors';

interface ImageComponentProps {
  source: ImageSourcePropType | string | null;
  style?: StyleProp<any>;
  imageStyle?: StyleProp<any>;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ source, style, imageStyle}) => {
  const isNetworkImage =
    typeof source === 'string' && source.startsWith('http');

  const imageSource = isNetworkImage
    ? { uri: source }
    : source ? { uri: source } : require('../../assets/placeholder.jpg');

  return (
    <Image
      source={imageSource}
      indicator={() => <ActivityIndicator size="small" color={Colors.primary} />}
      style={style}
      imageStyle={imageStyle}
    />
  );
};

export default ImageComponent;
