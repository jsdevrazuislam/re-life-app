import React from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import Heading from '../ui/Heading';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTranslation } from '../../hooks/useTranslation';
import ImageComponent from '../ui/Image';

const CommitteeTab: React.FC<CommitteeTabProps> = ({ data, loading }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation();


  return (
    <View style={imamStyles.tabContainer}>

      <TouchableOpacity
        style={imamStyles.addButton}
        onPress={() => navigation.navigate('AddCommitteeScreen')}>
        <Icon name="group-add" size={20} color="white" />
        <Text style={imamStyles.buttonText}>{t('addCommittee')}</Text>
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
        <ScrollView>
          {data?.map((item, index) => (
            <View key={index} style={imamStyles.infoCard}>
              <View style={imamStyles.cardContent}>
                {/* Profile Picture */}
                <ImageComponent
                  source={item?.profilePicture}
                  style={imamStyles.infoPhoto}
                  imageStyle={{ borderRadius: 3 }}
                />

                {/* Text Content */}
                <View style={imamStyles.cardText}>
                  <Paragraph
                    level="Small"
                    weight="Bold"
                    style={imamStyles.cardTitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.name}
                  </Paragraph>
                  <Paragraph
                    level="Small"
                    weight="Bold"
                    style={imamStyles.cardSubtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Profession: <Paragraph level="Small" weight="Medium">{item.profession}</Paragraph>
                  </Paragraph>

                  <Paragraph
                    level="Small"
                    weight="Bold"
                    style={imamStyles.cardSubtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    Location: <Paragraph level="Small" weight="Medium">{item.address}</Paragraph>
                  </Paragraph>
                </View>

                <TouchableOpacity onPress={() => console.log('edit')}>
                  <Icon name="remove-red-eye" size={20} color="#4CAF50" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CommitteeTab;
