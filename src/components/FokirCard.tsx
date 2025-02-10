import { View, Image, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { cardStyles } from '../styles/components/card.styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';
import Paragraph from './ui/Paragraph';

const FokirCard: FC<FokirCardProps> = ({ data }) => {

    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  

  return (
    <View style={cardStyles.flexLayout}>
      <Image source={{ uri: data.masjid_photo }} style={cardStyles.image} />
      <View style={cardStyles.textContainer}>
        <Paragraph level='Medium' weight='SemiBold'  style={cardStyles.cardTitle}>{data.masjid_name}</Paragraph>
        <Paragraph level='XSmall' weight='Regular' style={cardStyles.locationName}>
          Location: {`${data.location?.district} ${data.location?.upazila} ${data.location?.union} ${data.location?.village}`}
        </Paragraph>
        <View style={cardStyles.footer_action}>
          <Paragraph level='Small' style={cardStyles.showPeople}>{data.poor_people_information?.length} Poor People</Paragraph>
          <TouchableOpacity style={cardStyles.viewButton} onPress={() => navigation.navigate('HomeViewDetailsInfo')}>
            <Paragraph level='XSmall' style={cardStyles.viewLabel}>View</Paragraph>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FokirCard;
