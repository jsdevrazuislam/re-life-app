import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Image as RNImage,
  ImageSourcePropType,
  StyleProp
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../configs/colors';
import Icon from 'react-native-vector-icons/Feather';

interface ImageComponentProps {
  source: ImageSourcePropType | string | null;
  style?: StyleProp<any>;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  source,
  style,
  resizeMode = 'cover',
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const isNetworkImage =
    typeof source === 'string' && source.startsWith('http');

  const imageSource = isNetworkImage
    ? { uri: source } 
    : source || require('../../assets/placeholder.jpg'); 

  return (
    <View style={[{ justifyContent: 'center', alignItems: 'center' }]}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={Colors.primary}
          style={{ position: 'absolute', zIndex: 1 }}
        />
      )}

      {error ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Icon name="image" size={30} color={Colors.placeholder} />
        </View>
      ) : isNetworkImage ? (
        <FastImage
          source={{
            uri: source as string,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          style={[{ width: '100%', height: '100%' }, style]}
          resizeMode={resizeMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setError(true)}
        />
      ) : (
        <RNImage
          source={imageSource as ImageSourcePropType}
          style={[{ width: '100%', height: '100%' }, style]}
          resizeMode={resizeMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => setError(true)}
        />
      )}
    </View>
  );
};

export default ImageComponent;
