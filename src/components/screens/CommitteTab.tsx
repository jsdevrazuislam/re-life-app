import React, { useState } from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import Heading from '../ui/Heading';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useTranslation } from '../../hooks/useTranslation';
import ImageComponent from '../ui/Image';
import { Colors } from '../../configs/colors';
import { mvs } from 'react-native-size-matters';

const CommitteeTab: React.FC<CommitteeTabProps> = ({ data, loading }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommitteeResponse>()

  const renderCommitteeDetails = (selectedItem?: CommitteeModalView) => {
    if (!selectedItem) return;
    return Object.entries(selectedItem).map(([key, value]) => (
      <View style={imamStyles.flexLayout} key={key}>
        <Paragraph level="Small" weight="Bold" style={imamStyles.label}>
          {t(key)}
        </Paragraph>
        <Paragraph level="Small" weight="Medium" style={imamStyles.value}>
          {value}
        </Paragraph>
      </View>
    ));
  };


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
          <Icon name="people-outline" size={60} color={Colors.neutral[500]} />
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
                  source={item?.profilePicture}
                  style={imamStyles.infoPhoto}
                  imageStyle={{ borderRadius: 3 }}
                />
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
                    weight='Regular'
                    style={imamStyles.cardSubtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.profession}
                  </Paragraph>

                  <Paragraph
                    level="Small"
                    weight="Regular"
                    style={imamStyles.cardSubtitle}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {item.address}
                  </Paragraph>
                </View>

                <TouchableOpacity onPress={() => {
                  setModalVisible(true)
                  setSelectedItem(item)
                }}>
                  <Icon
                    name="remove-red-eye"
                    size={20}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={imamStyles.modalContainer}>
          <View style={imamStyles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={imamStyles.closeButton}>
              <Text style={imamStyles.closeText}>✕</Text>
            </TouchableOpacity>

            {selectedItem?.profilePicture && (
              <ImageComponent
                source={selectedItem?.profilePicture}
                style={imamStyles.modalImage}
              />
            )}
            {renderCommitteeDetails({
              name: selectedItem?.name ?? '',
              mobile: selectedItem?.mobile ?? '',
              address: selectedItem?.address ?? '',
              profession: selectedItem?.profession ?? ''
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CommitteeTab;
