import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import horizontalCardListStyles from '../styles/components/horizontalCardList.styles';
import {useState} from 'react';
import ImageViewing from 'react-native-image-viewing';
import Heading from './ui/Heading';
import Paragraph from './ui/Paragraph';

const HorizontalCardList: React.FC<HorizontalCardListProps> = ({
  title,
  subTitle,
  data,
  imageKey,
}) => {
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<{ uri: string }[]>([]);

  const openImage = (url: string) => {
    setImages([{ uri: url }]);
    setTimeout(() => setVisible(true), 100)
  };

  return (
    <View style={horizontalCardListStyles.container}>
      <Heading level={5} weight='Bold'>{title}</Heading>
      {subTitle && (
        <Text style={horizontalCardListStyles.membersCount}>{subTitle}</Text>
      )}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={horizontalCardListStyles.card}>
            {imageKey && item[imageKey] && (
              <TouchableOpacity onPress={() => openImage(item.photo)}>
                <Image
                  source={{uri: item[imageKey]}}
                  style={horizontalCardListStyles.detailsProfilePicture}
                />
              </TouchableOpacity>
            )}

            <View style={horizontalCardListStyles.content}>
              {Object.entries(item).map(
                ([key, value]) =>
                  key !== imageKey && (
                    <View key={key} style={horizontalCardListStyles.flexLayout}>
                      <Paragraph  level='Small' weight='Bold'  style={horizontalCardListStyles.label}>
                        {key.replace(/_/g, ' ')}:
                      </Paragraph>
                      <Paragraph level='Small' weight='Medium' style={horizontalCardListStyles.value}>
                        {value}
                      </Paragraph>
                    </View>
                  ),
              )}
            </View>
          </View>
        )}
      />
      <ImageViewing
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

export default HorizontalCardList;
