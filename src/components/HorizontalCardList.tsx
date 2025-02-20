import { View, Text, Image, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import horizontalCardListStyles from '../styles/components/horizontalCardList.styles';
import Heading from './ui/Heading';
import Paragraph from './ui/Paragraph';

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  title,
  subTitle,
  data,
  imageKey,
  onPress,
}) => {
  const [visible, setVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Prepare images for the viewer
  const images = data.map((item) => ({ url: item[imageKey] || '' })).filter((img) => img.url);

  const openImage = (selectedUri: string) => {
    const index = data.findIndex((item) => item[imageKey] === selectedUri);
    if (index !== -1) {
      setImageIndex(index);
      setVisible(true);
    }
  };

  // Define the keys that should be displayed
  const allowedKeys = ['name', 'age', 'profession', 'address', 'mobile']; // Only render these fields

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
          <TouchableOpacity onPress={() => onPress?.(item)} style={horizontalCardListStyles.card}>
            {imageKey && item[imageKey] && (
              <TouchableOpacity onPress={() => openImage(item[imageKey])}>
                <Image
                  source={{ uri: item[imageKey] }}
                  style={horizontalCardListStyles.detailsProfilePicture}
                />
              </TouchableOpacity>
            )}

            <View style={horizontalCardListStyles.content}>
              {allowedKeys.map((key) => (
                item[key] && (
                  <View key={key} style={horizontalCardListStyles.flexLayout}>
                    <Paragraph level="Small" weight="Bold" style={horizontalCardListStyles.label}>
                      {key.replace(/_/g, ' ')}:
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

      {/* Image Viewer Modal */}
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          imageUrls={images}
          index={imageIndex}
          enableSwipeDown
          onSwipeDown={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </View>
  );
};

export default HorizontalCardList;
