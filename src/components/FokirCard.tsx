import {View, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {cardStyles} from '../styles/components/card.styles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../constants/route';
import Paragraph from './ui/Paragraph';
import { baseURLPhoto } from '../lib/api';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from './ui/Image';

const FokirCard: FC<FokirCardProps> = ({data}) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation()

  return (
    <View style={cardStyles.flexLayout}>
      <ImageComponent imageStyle={{ borderRadius: 5}} source={baseURLPhoto(data?.masjidProfile)} style={cardStyles.image} />
      <View style={cardStyles.textContainer}>
        <Paragraph
          level="Medium"
          weight="SemiBold"
          style={cardStyles.cardTitle}>
          {data?.name}
        </Paragraph>
        <Paragraph
          level="XSmall"
          weight="Regular"
          style={cardStyles.locationName}>
          <Paragraph level='XSmall' weight='Bold'>{t('masjidLocationLabel')}</Paragraph>:{' '}
          {`${data.location?.district} ${data.location?.upazila} ${data.location?.union} ${data.location?.village}`}
        </Paragraph>
        <View style={cardStyles.footer_action}>
          <Paragraph level="Small" weight='Bold' style={cardStyles.showPeople}>
            {data.poorPeopleInformations?.length} {t('poorPeople')}
          </Paragraph>
          <TouchableOpacity
            style={cardStyles.viewButton}
            onPress={() => navigation.navigate('HomeViewDetailsInfo', { item: data})}>
            <Paragraph level="XSmall" style={cardStyles.viewLabel}>
              {t("view")}
            </Paragraph>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FokirCard;
