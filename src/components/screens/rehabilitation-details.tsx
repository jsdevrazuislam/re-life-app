import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import SafeAreaWrapper from '../SafeAreaWrapper';
import globalStyles from '../../styles/global.style';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ImageComponent from '../ui/Image';
import AppButton from '../ui/AppButton';
import BackButton from '../BackButton';
import Paragraph from '../ui/Paragraph';
import { Colors } from '../../configs/colors';
import { AppStackParamList } from '../../constants/route';
import { useApi } from '../../hooks/useApi';
import LoadingOverlay from '../LoadingOverlay';
import ApiStrings from '../../lib/apis_string';
import { showToast } from '../../utils/toast';
import FollowUpCard from './follow-up-card';
import { useTranslation } from '../../hooks/useTranslation';
import { EmptyState } from '../../screens/RequestAccessViewScreen';



const RehabilitationDetailsScreen = () => {
  const route = useRoute<ImamHomeScreenRouteProp>();
  const poorPeople = route.params?.item as PersonItemProps;
  const person = poorPeople.personId;
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { request, loading } = useApi()
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false);


  const handleMarkComplete = async (status:string) => {
    if (!status) {
      setModalVisible(true);
      return;
    }
    const { message } = await request('post', ApiStrings.ADD_MARK_COMPLETE(poorPeople._id), { status })
    showToast('success', message)
    navigation.navigate('RehabilitationDashboard')
  };


  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <LoadingOverlay visible={loading} />
        <BackButton />
        <View style={styles.card}>
          <ImageComponent source={person.photoUrl} style={styles.profileImage} />
          <Paragraph level='Large' weight='Bold'>{person.name}</Paragraph>
          <Paragraph level='Small' weight='Medium' style={styles.contact}>📞 {person.contactNumber}</Paragraph>
          <Paragraph level='Small' weight='Medium' style={styles.location}>📍 {person.address}</Paragraph>
          <Paragraph level='Small' weight='Medium' style={styles.issue}>⚠️ {t('rehabilitation.problem')}: {person.overview}</Paragraph>
          <Paragraph level='Small' weight='Medium' style={styles.date}>📅 {t('rehabilitation.date')}: {format(poorPeople.startDate, "yyyy-MM-dd")}</Paragraph>
        </View>
        <Paragraph style={{ marginBottom: 10 }} level='Large' weight='Bold'>
          {t("rehabilitation.followUpReports")}
        </Paragraph>
        <FlatList
          data={poorPeople.followUpRecords}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <FollowUpCard
              date={format(item.date, "yyyy-MM-dd")}
              comment={item.comments}
              status={poorPeople.status}
              mediaFiles={item.mediaFiles ?? []}
            />
          )}
          ListEmptyComponent={<EmptyState title={t('rehabilitation.noFollowUps')} viewStyle={{ marginTop: 10 }} />}
        />
        <View style={styles.buttonContainer}>
          {
            poorPeople.status === 'in-progress' &&  <>
              <AppButton text={t('rehabilitation.markAsComplete')} onPress={() => setModalVisible(true)} />
              <AppButton variant='outline' style={{ marginTop: 10 }} text={t('rehabilitation.createFollowUp')} onPress={() => navigation.navigate('AddFollowUpScreen', { item: poorPeople })} />
            </>
          }
        </View>
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Paragraph level="Large" weight="Bold">
                {t('rehabilitation.selectStatus')}
              </Paragraph>

              <AppButton style={{ marginBottom: 10, marginTop: 20 }} text={t('rehabilitation.markAsComplete')} onPress={() => handleMarkComplete('completed')} />
              <AppButton text={t('rehabilitation.status.failed')} variant="outline" onPress={() => handleMarkComplete('failed')} />

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Paragraph level="Medium">{t('cancel')}</Paragraph>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  contact: { color: Colors.text, marginTop: 5 },
  location: { color: Colors.dark, marginTop: 5 },
  issue: { color: Colors.danger, marginTop: 5, textAlign: 'center' },
  date: { color: Colors.text, marginTop: 5 },
  followUpCard: {
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: Colors.neutral[200]
  },
  emptyText: { color: Colors.dark, marginVertical: 10 },
  buttonContainer: { paddingBottom: 10 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 30,
  },
});

export default RehabilitationDetailsScreen