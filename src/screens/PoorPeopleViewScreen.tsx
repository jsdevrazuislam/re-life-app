import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import {Colors} from '../configs/colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from '../styles/global.style';
import poorPeopleViewStyles from '../styles/poorPeopleView.styles';
import BackButton from '../components/BackButton';
import Paragraph from '../components/ui/Paragraph';
import {useTranslation} from '../hooks/useTranslation';
import {fokirData} from '../data/dump';
import Heading from '../components/ui/Heading';
import ImageViewing from 'react-native-image-viewing';

interface InfoRowProps {
  icon: React.ElementType;
  iconName: string;
  label: string;
  value: string | number;
  iconSize?: number;
}

const InfoRow: React.FC<InfoRowProps> = ({
  icon: IconComponent,
  iconName,
  label,
  value,
  iconSize = 24,
}) => {
  return (
    <View style={poorPeopleViewStyles.flex}>
      <View style={{width: 36}}>
        <IconComponent name={iconName} size={iconSize} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Paragraph level="Small" weight="Bold">
          {label}
        </Paragraph>
        <Paragraph level="Small" weight="Regular">
          {value}
        </Paragraph>
      </View>
    </View>
  );
};

const Row = ({label, value}: {label: string; value: string | number}) => (
  <View style={poorPeopleViewStyles.flexLayout}>
    <Paragraph level="Small" weight="Bold" style={poorPeopleViewStyles.label}>
      {label}
    </Paragraph>
    <Paragraph level="Small" weight="Medium" style={poorPeopleViewStyles.value}>
      {value}
    </Paragraph>
  </View>
);

const PoorPeopleViewScreen = () => {
  const {t} = useTranslation();
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState<{uri: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = (url: string, index: number) => {
    setImages([{uri: url}]);
    setCurrentIndex(index);
    setTimeout(() => setVisible(true), 100);
  };

  return (
    <SafeAreaWrapper bg={Colors.light}>
      <ScrollView>
        <View style={globalStyles.container}>
          <View style={poorPeopleViewStyles.headerSection}>
            <BackButton styles={{padding: 0}} />
            <Paragraph
              level="Medium"
              weight="Bold"
              style={poorPeopleViewStyles.headerTitle}>
              {t('masjidDetails')}
            </Paragraph>
            <Icon name="user-circle" size={24} />
          </View>

          <View style={poorPeopleViewStyles.mainContent}>
            <Image
              source={{uri: fokirData.photo}}
              style={poorPeopleViewStyles.masjidImage}
            />
            <Row label="Name:" value={fokirData.name} />
            <Row label="Location:" value={fokirData.address} />
            <Row label="Age:" value={fokirData.age} />
            <Row
              label="Number of Children:"
              value={fokirData.number_of_children}
            />
            <Row
              label="Dependent Family Members:"
              value={fokirData.dependent_family_members}
            />
            <Row label="Profession:" value={fokirData.profession} />
            <Row
              label="Receiving Government Aid:"
              value={fokirData.government_assistance ? 'Yes' : 'No'}
            />

            <View style={poorPeopleViewStyles.mainContent}>
              <Heading level={5} weight="Bold">
                Verification Documents
              </Heading>
              <View style={poorPeopleViewStyles.documents}>
                <TouchableOpacity
                  style={poorPeopleViewStyles.documentsImageContainer}
                  onPress={() =>
                    openImage(fokirData.verification_documents.front_photo, 0)
                  }>
                  <Image
                    source={{uri: fokirData.verification_documents.front_photo}}
                    style={poorPeopleViewStyles.documentsImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={poorPeopleViewStyles.documentsImageContainer}
                  onPress={() =>
                    openImage(fokirData.verification_documents.back_photo, 1)
                  }>
                  <Image
                    source={{uri: fokirData.verification_documents.back_photo}}
                    style={poorPeopleViewStyles.documentsImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {fokirData.government_assistance && (
              <View style={poorPeopleViewStyles.mainContent}>
                <Heading level={5} weight="Bold">
                  Government Assistance
                </Heading>
                <View style={poorPeopleViewStyles.govermentAid}>
                  <InfoRow
                    icon={MaterialIcons}
                    label="Aid Type: "
                    value={fokirData.government_assistance.aid_type}
                    iconName="food-bank"
                  />
                  <InfoRow
                    icon={Ionicons}
                    label="Frequency: "
                    value={fokirData.government_assistance.frequency}
                    iconName="calendar-clear-outline"
                  />
                  <InfoRow
                    icon={Ionicons}
                    label="Last Received Date: "
                    value={fokirData.government_assistance.last_received_date}
                    iconName="calendar-clear-outline"
                  />
                  <InfoRow
                    icon={FontAwesome}
                    label="Aid Amount: "
                    value={`${fokirData.government_assistance.aid_details.rice} rice`}
                    iconName="money"
                  />
                </View>
              </View>
            )}
            {
              fokirData.additional_notes && (
                <View style={poorPeopleViewStyles.mainContent}>
                  <Heading level={5} weight="Bold">
                    Additional Notes
                  </Heading>
                  <Paragraph level="Small" weight="Regular">
                    {fokirData.additional_notes}
                  </Paragraph>
                </View>
              )
            }
          </View>
        </View>

        <ImageViewing
          images={images}
          imageIndex={currentIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />
      </ScrollView>
    </SafeAreaWrapper>
  );
};

export default PoorPeopleViewScreen;
