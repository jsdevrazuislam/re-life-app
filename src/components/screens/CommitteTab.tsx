import React, {useState} from 'react';
import {imamStyles} from '../../styles/imamHomeStyles';
import {View, ScrollView, Text, TouchableOpacity, Image} from 'react-native';
import Paragraph from '../ui/Paragraph';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '../../constants/route';
import Heading from '../ui/Heading';
import {baseURLPhoto} from '../../lib/api';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useAuthStore} from '../../store/store';
import {useApi} from '../../hooks/useApi';
import ApiStrings from '../../lib/apis_string';
import {showToast} from '../../utils/toast';
import Modal from 'react-native-modal';
import Input from '../ui/AppInput';
import Textarea from '../ui/Textarea';
import ErrorMessage from '../ErrorMessage';
import AppButton from '../ui/AppButton';
import {useTranslation} from '../../hooks/useTranslation';
import ImageComponent from '../ui/Image';

const CommitteeTab: React.FC<CommitteeTabProps> = ({data, loading}) => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const [modalType, setModalType] = useState<'edit' | 'delete' | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const {request, loading: requestLoading, error} = useApi();
  const {user} = useAuthStore();
  const {t} = useTranslation();

  const openModal = (type: 'edit' | 'delete') => {
    setModalType(type);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    const payload = {
      masjidId: user?.masjid?._id,
      imamId: user?._id,
      type: modalType,
      subject,
      reason: description,
    };
    const {message} = await request(
      'post',
      ApiStrings.REQUEST_TO_ADMIN,
      payload,
    );
    showToast('success', message);
    setDescription('');
    setSubject('');
    setModalVisible(false);
  };

  return (
    <View style={imamStyles.tabContainer}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={imamStyles.container}>
        <View style={imamStyles.content}>
          <View style={imamStyles.headerModal}>
            <Paragraph level="Medium" weight="Medium">
              {modalType === 'edit'
                ? 'Edit Access Request'
                : 'Delete Access Request'}
            </Paragraph>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Icon name="close" size={22} color="#555" />
            </TouchableOpacity>
          </View>

          <Input
            label="Subject"
            placeholder="Subject"
            value={subject}
            onChangeText={setSubject}
          />
          <Textarea
            label="Reason"
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            maxLength={300}
            numberOfLines={5}
          />

          {error && <ErrorMessage error={error} />}

          <AppButton
            loading={requestLoading}
            disabled={requestLoading}
            style={{marginTop: 20}}
            onPress={handleSubmit}
            text="Submit"
          />
        </View>
      </Modal>

      <TouchableOpacity
        style={imamStyles.addButton}
        onPress={() => navigation.navigate('AddCommitteeScreen')}>
        <Icon name="group-add" size={20} color="white" />
        <Text style={imamStyles.buttonText}>{t('addCommittee')}</Text>
      </TouchableOpacity>

      {loading ? (
        <ScrollView>
          {Array.from({length: 3}).map((_, index) => (
            <SkeletonPlaceholder key={index}>
              <View style={imamStyles.infoCard}>
                <View style={imamStyles.cardContent}>
                  <View style={imamStyles.skeletonPhoto} />
                  <View style={{marginLeft: 10}}>
                    <View style={imamStyles.skeletonText} />
                    <View style={imamStyles.skeletonTextSmall} />
                    <View style={imamStyles.skeletonTextSmall} />
                  </View>
                </View>
              </View>
            </SkeletonPlaceholder>
          ))}
        </ScrollView>
      ) : data.length === 0 ? (
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
          {data.map((item, index) => (
            <View key={index} style={imamStyles.infoCard}>
              <View style={imamStyles.cardContent}>
                {/* Profile Picture */}
                <ImageComponent
                  source={baseURLPhoto(item?.profilePicture)}
                  style={imamStyles.infoPhoto}
                  imageStyle={{borderRadius: 3}}
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

                {/* Action Buttons */}
                <View style={imamStyles.actionButtons}>
                  <TouchableOpacity onPress={() => openModal('edit')}>
                    <Icon name="edit" size={20} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openModal('delete')}>
                    <Icon name="delete" size={20} color="#F44336" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default CommitteeTab;
