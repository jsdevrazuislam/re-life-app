import React, { useCallback, useState } from 'react';
import { imamStyles } from '../../styles/imamHomeStyles';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
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

const RenderCommitteeItem = React.memo(({ item, onOpenModal }: { item: CommitteeResponse, onOpenModal: (item: CommitteeResponse) => void }) => {
  return (
    <View style={imamStyles.infoCard}>
      <View style={[imamStyles.cardContent, { borderBottomWidth: 0}]}>
        <ImageComponent
          source={item?.profilePicture}
          style={imamStyles.infoPhoto}
          imageStyle={{ borderRadius: 3 }}
        />
        <View style={imamStyles.cardText}>
          <Paragraph level="Small" weight="Bold" style={imamStyles.cardTitle} numberOfLines={1}>
            {item.name}
          </Paragraph>
          <Paragraph level="Small" weight="Regular" style={imamStyles.cardSubtitle} numberOfLines={1}>
            {item.profession}
          </Paragraph>
          <Paragraph level="Small" weight="Regular" style={imamStyles.cardSubtitle} numberOfLines={1}>
            {item.address}
          </Paragraph>
        </View>
        <TouchableOpacity onPress={() => onOpenModal(item)}>
          <Icon name="remove-red-eye" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

const CommitteeTab: React.FC<CommitteeTabProps> = React.memo(({ data, loading }) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommitteeResponse>();

  const handleOpenModal = useCallback((item: CommitteeResponse) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const handleAddCommittee = useCallback(() => {
    navigation.navigate('AddCommitteeScreen');
  }, [navigation]);

  const renderItem = useCallback(({ item }: { item: CommitteeResponse }) => (
    <RenderCommitteeItem item={item} onOpenModal={handleOpenModal} />
  ), [handleOpenModal]);

  return (
    <View style={imamStyles.tabContainer}>
      <TouchableOpacity style={imamStyles.addButton} onPress={handleAddCommittee}>
        <Icon name="group-add" size={20} color="white" />
        <Text style={imamStyles.buttonText}>{t('addCommittee')}</Text>
      </TouchableOpacity>

      {loading ? (
        <FlatList
          data={Array.from({ length: 3 })}
          keyExtractor={(_, index) => `skeleton-${index}`}
          renderItem={() => (
            <SkeletonPlaceholder>
              <View style={imamStyles.infoCard}>
                <View style={[imamStyles.cardContent, { borderBottomWidth: 0}]}>
                  <View style={imamStyles.skeletonPhoto} />
                  <View style={{ marginLeft: 10 }}>
                    <View style={imamStyles.skeletonText} />
                    <View style={imamStyles.skeletonTextSmall} />
                    <View style={imamStyles.skeletonTextSmall} />
                  </View>
                </View>
              </View>
            </SkeletonPlaceholder>
          )}
        />
      ) : data?.length === 0 ? (
        <View style={imamStyles.emptyContainer}>
          <Icon name="people-outline" size={60} color={Colors.neutral[500]} />
          <Heading level={6} weight="Bold" style={imamStyles.emptyTitle}>
            {t('emptyPeopleTitle')}
          </Heading>
          <Paragraph level="Small" weight="Medium" style={imamStyles.emptyDescription}>
            {t('emptyPeopleDescription')}
          </Paragraph>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.name.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: mvs(30) }}
          initialNumToRender={10}
          maxToRenderPerBatch={5} 
          windowSize={5} 
          removeClippedSubviews={true} 
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
        />
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={imamStyles.modalContainer}>
          <View style={imamStyles.modalContent}>
            <TouchableOpacity onPress={handleCloseModal} style={imamStyles.closeButton}>
              <Text style={imamStyles.closeText}>✕</Text>
            </TouchableOpacity>

            {selectedItem?.profilePicture && (
              <ImageComponent source={selectedItem?.profilePicture} style={imamStyles.modalImage} />
            )}
            {selectedItem && (
              <View>
                <Paragraph level="Small" weight="Bold">{t('name')}: {selectedItem.name}</Paragraph>
                <Paragraph level="Small" weight="Medium">{t('mobile')}: {selectedItem.mobile}</Paragraph>
                <Paragraph level="Small" weight="Medium">{t('address')}: {selectedItem.address}</Paragraph>
                <Paragraph level="Small" weight="Medium">{t('profession')}: {selectedItem.profession}</Paragraph>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
});


export default CommitteeTab;
