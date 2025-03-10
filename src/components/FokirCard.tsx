import { View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { cardStyles } from '../styles/components/card.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Paragraph from './ui/Paragraph';
import { baseURLPhoto } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from './ui/Image';

const FokirCard: FC<FokirCardProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation()

  return (
    <View style={cardStyles.flexLayout}>
      <ImageComponent imageStyle={{ borderRadius: 5 }} source={baseURLPhoto(data?.poorPeopleInformations?.photoUrl)} style={cardStyles.image} />
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
    </View>
  );
};

export default FokirCard;
