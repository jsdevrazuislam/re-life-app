import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import horizontalCardListStyles from '../styles/components/horizontalCardList.styles';
import Heading from './ui/Heading';
import Paragraph from './ui/Paragraph';
import { useTranslation } from '../hooks/useTranslation';
import ImageComponent from './ui/Image';

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  title,
  subTitle,
  data,
  imageKey,
  isCommitteeCard,
  onPress,
}) => {
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommitteeResponse | any>(null);
  const { t } = useTranslation();

  const images = data.map((item) => ({ url: item[imageKey] || '' })).filter((img) => img.url);

  const openImage = (selectedUri: string) => {
    const index = data.findIndex((item) => item[imageKey] === selectedUri);
    if (index !== -1) {
      setImageIndex(index);
      setVisible(true);
    }
  };

  const allowedKeys = ['name', 'age', 'profession', 'address', 'mobile'];

  const keyMapping: Record<string, string> = {
    name: t("name"),
    age: t("age"),
    profession: t("profession"),
    address: t("address"),
    mobile: t("mobile"),
  };

  const openDetailsModal = (item:CommitteeResponse) => {
    if (isCommitteeCard) {
      setSelectedItem(item);
      setModalVisible(true);
    }
  };


  return (
    <View style={horizontalCardListStyles.container}>
      <Heading level={5} weight="Bold">{title}</Heading>
      {subTitle && <Text style={horizontalCardListStyles.membersCount}>{subTitle}</Text>}

      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onPress?.(item) ?? openDetailsModal(item)} style={horizontalCardListStyles.card}>
            {imageKey && item[imageKey] && (
              <TouchableOpacity onPress={() => openImage(item[imageKey])}>
                <ImageComponent
                  source={item[imageKey]}
                  style={horizontalCardListStyles.detailsProfilePicture}
                  imageStyle={{
                     borderTopLeftRadius: 10, 
                     borderTopRightRadius: 10,
                   }}
                />
              </TouchableOpacity>
            )}

            <View style={horizontalCardListStyles.content}>
              {allowedKeys.map((key) => (
                item[key] && (
                  <View key={key} style={horizontalCardListStyles.flexLayout}>
                    <Paragraph level="Small" weight="Bold" style={horizontalCardListStyles.label}>
                      {keyMapping[key] || key}:
                    </Paragraph>
                    <Paragraph level="Small" weight="Medium" style={horizontalCardListStyles.value}>
                      {String(item[key])}
                    </Paragraph>
                  </View>
                )
              ))}
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal visible={visible} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={imageIndex}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        />
      </Modal>
      {isCommitteeCard && (
        <Modal visible={modalVisible} transparent={true} animationType="slide">
          <View style={horizontalCardListStyles.modalContainer}>
            <View style={horizontalCardListStyles.modalContent}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={horizontalCardListStyles.closeButton}>
                <Text style={horizontalCardListStyles.closeText}>✕</Text>
              </TouchableOpacity>
              
              {selectedItem?.[imageKey] && (
                <ImageComponent
                  source={selectedItem[imageKey]}
                  style={horizontalCardListStyles.modalImage}
                  imageStyle={{ borderRadius: 50}}
                />
              )}

              {allowedKeys.map((key) => (
                selectedItem?.[key] && (
                  <View key={key} style={horizontalCardListStyles.flexLayout}>
                    <Paragraph level="Small" weight="Bold" style={horizontalCardListStyles.label}>
                      {keyMapping[key]}:
                    </Paragraph>
                    <Paragraph  level="Small" weight="Medium" style={horizontalCardListStyles.value}>
                      {String(selectedItem[key])}
                    </Paragraph>
                  </View>
                )
              ))}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default HorizontalCardList;
