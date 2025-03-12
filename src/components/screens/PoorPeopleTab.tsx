import React from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Heading from '../ui/Heading';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { baseURLPhoto } from '../../lib/api';
import { useTranslation } from '../../hooks/useTranslation';
import ImageComponent from '../ui/Image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import { useAuthStore } from '../../store/store';
import { Colors } from '../../configs/colors';
import { mvs } from 'react-native-size-matters';
import { convertNumber } from '../../utils/helper';

const PeopleTab: React.FC<PeopleTabProps> = ({ data, onAdd, loading }) => {

  const { t } = useTranslation()
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { user } = useAuthStore()




  return (
    <View style={imamStyles.tabContainer}>

      <TouchableOpacity style={imamStyles.addButton} onPress={onAdd}>
        <Icon name="person-add" size={20} color="white" />
        <Text style={imamStyles.buttonText}>{t('addBegger')}</Text>
      </TouchableOpacity>

      {loading ? (
        <ScrollView>
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonPlaceholder key={index}>
              <View style={imamStyles.infoCard}>
                <View style={imamStyles.cardContent}>
                  <View style={imamStyles.skeletonPhoto} />
                  <View style={{ marginLeft: 10 }}>
                    <View style={imamStyles.skeletonText} />
                    <View style={imamStyles.skeletonTextSmall} />
                    <View style={imamStyles.skeletonTextSmall} />
                  </View>
                </View>
              </View>
            </SkeletonPlaceholder>
          ))}
        </ScrollView>
      ) : data?.length === 0 ? (
        <View style={imamStyles.emptyContainer}>
          <Icon name="people-outline" size={60} color="#888" />
          <Heading level={6} weight="Bold" style={imamStyles.emptyTitle}>
            {t('emptyPeopleTitle')}
          </Heading>
          <Paragraph
            level="Small"
            weight="Medium"
            style={imamStyles.emptyDescription}>
            {t('emptyPeopleDescription')}
          </Paragraph>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: mvs(30)}}>
          {data?.map((item, index) => (
            <View key={index} style={imamStyles.infoCard}>
              <View style={imamStyles.cardContent}>
                <ImageComponent
                  source={baseURLPhoto(item?.photoUrl || '')}
                  style={imamStyles.infoPhoto}
                  imageStyle={{ borderRadius: 3 }}
                />
                <View style={imamStyles.cardText}>
                  <Paragraph
                    level="Small"
                    weight="Bold"
                    style={imamStyles.cardTitle}>
                    {item.name}
                  </Paragraph>
                  <Paragraph level="Small" weight="Bold">{convertNumber(item?.age, true)} {t('years')}</Paragraph>
                  <Paragraph level="Small" weight="Bold">{item.presentAddress ?? item.permanentAddress}</Paragraph>
                </View>
              </View>
              <View style={imamStyles.actionButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeViewDetailsInfo', {
                  item: {
                    _id: user?.masjid._id,
                    name: user?.masjid.name,
                    fullAddress: user?.masjid.fullAddress,
                    location: user?.masjid.location,
                    masjidProfile: user?.masjid.masjidProfile,
                    imamDetails: user?.masjid.imamDetails,
                    poorPeopleInformations: item
                  }
                })}>
                  <Icon name="remove-red-eye" size={20} color={Colors.primary} />
                </TouchableOpacity>
                {user?.role === 'imam' && <TouchableOpacity onPress={() => navigation.navigate('MarkDonationScreen', { data: item })}>
                  <Entypo name="check" size={20} color={Colors.primary} />
                </TouchableOpacity>}
                {user?.role === 'imam' && <TouchableOpacity onPress={() => navigation.navigate('EditPoorPeopleScreen', { item })}>
                  <Icon name="edit" size={20} color={Colors.secondary} />
                </TouchableOpacity>}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PeopleTab;
