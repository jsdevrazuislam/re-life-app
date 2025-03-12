import { View, TouchableOpacity, Modal } from 'react-native';
import React, { FC, useState } from 'react';
import { cardStyles } from '../styles/components/card.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Paragraph from './ui/Paragraph';
import { baseURLPhoto } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from './ui/Image';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Colors } from '../configs/colors';
import { mvs } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImageView from 'react-native-image-zoom-viewer';



const FokirCard: FC<FokirCardProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation()
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  return (
    <View style={[cardStyles.flexLayout, cardStyles.cardContainer]}>
      <View style={{ position: 'relative' }}>
        <ImageComponent imageStyle={{ borderRadius: 5 }} source={baseURLPhoto(data?.poorPeopleInformations?.photoUrl)} style={cardStyles.image} />
        <TouchableOpacity style={cardStyles.expanded} onPress={() => openImage(data?.poorPeopleInformations?.photoUrl)}>
          <SimpleLineIcons color={Colors.white} name='size-fullscreen' size={mvs(12)} />
        </TouchableOpacity>
      </View>
      <View style={cardStyles.textContainer}>
        <View style={{ maxWidth: '90%', width: '100%' }}>
          <Paragraph
            level="Medium"
            weight="SemiBold"
            numberOfLines={1} ellipsizeMode='tail'
            style={cardStyles.cardTitle}>
            {data?.poorPeopleInformations?.name}
          </Paragraph>
          <Paragraph
            level="XSmall"
            weight="Regular"
            numberOfLines={1} ellipsizeMode='tail'
            style={cardStyles.locationName}>
            <Paragraph level='XSmall' weight='Bold'>{t('currentAddress')}</Paragraph>:{' '}
            {data?.poorPeopleInformations?.address}
          </Paragraph>
          <Paragraph
            level="XSmall"
            weight="Regular"
            numberOfLines={1} ellipsizeMode='tail'
            style={cardStyles.locationName}>
            <Paragraph level='XSmall' weight='Bold'>{t('permanentAddress')}</Paragraph>:{' '}
            {data?.poorPeopleInformations?.permanentAddress}
          </Paragraph>
        </View>
        <TouchableOpacity
          style={cardStyles.viewButton}
          onPress={() => navigation.navigate('HomeViewDetailsInfo', { item: data })}>
          <Paragraph level="XSmall" style={cardStyles.viewLabel}>
            {t("details")}
          </Paragraph>
        </TouchableOpacity>
      </View>
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
    </View>
  );
};

export default FokirCard;
