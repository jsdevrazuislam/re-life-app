import React, { useState } from 'react';
import { View, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { styles } from './PersonalScreen'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImageComponent from './ui/Image';
import { Colors } from '../configs/colors';
import ImageView from 'react-native-image-zoom-viewer';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Paragraph from './ui/Paragraph';
import Heading from './ui/Heading';
import { useTranslation } from '../hooks/useTranslation';


export const IDProofSection = ({ documents, openImage }: { documents: IdProofDocumentsEntity[], openImage: (url: string) => void }) => {
  if (documents?.length === 0) return null;

  return (
    <View style={styles.scrollContent}>
      {documents.map((item, index) => (
        <View key={item._id || index} style={styles.masjidImage}>
          <Paragraph weight="Bold" level="Small">{item.label}</Paragraph>
          <ImageComponent
            source={item?.value}
            style={{ width: Dimensions.get('window').width / 3.2, height: 92, borderRadius: 10, marginTop: 10 }}
          />
          <TouchableOpacity style={styles.expanded} onPress={() => openImage(item.value)}>
            <SimpleLineIcons color={Colors.white} name="size-fullscreen" size={12} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};



const DocumentsScreen = ({ data }: { data: HomeSearchResultDatas}) => {

  const singleData = data.poorPeopleInformations;
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { t } = useTranslation()

  const openImage = (imageUrl: string) => {
    if (imageUrl) {
      setSelectedImage(imageUrl);
      setVisible(true);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <Paragraph level='Large' style={{ maxWidth: 300}} weight='Bold'>{t("beggarIdCardAndFamilyInfo")}</Paragraph>
      <IDProofSection documents={singleData.idProofDocuments ?? []} openImage={openImage} />
      <IDProofSection documents={singleData.husbandIdProofDocuments ?? []} openImage={openImage} />
      <IDProofSection documents={singleData.wifeIdProofDocuments ?? []} openImage={openImage} />
      <IDProofSection documents={singleData.motherIdProofDocuments ?? []} openImage={openImage} />
      <IDProofSection documents={singleData.fatherIdProofDocuments ?? []} openImage={openImage} />
      <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
        <ImageView renderHeader={() => (
          <TouchableOpacity
            style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        )} imageUrls={[{ url: selectedImage }]} onCancel={() => setVisible(false)} enableSwipeDown />
      </Modal>
    </ScrollView>
  );
};

export default DocumentsScreen;
