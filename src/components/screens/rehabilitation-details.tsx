import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
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
import FollowUpCard from './follow-up-card';
import { useTranslation } from '../../hooks/useTranslation';
import { EmptyState } from '../../screens/RequestAccessViewScreen';
import RehabilitationStatusScreen from '../../screens/RehabilitationSuccessScreen';



const RehabilitationDetailsScreen = () => {
  const route = useRoute<ImamHomeScreenRouteProp>();
  const poorPeople = route.params?.item as PersonItemProps;
  const person = poorPeople.personId;
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { t } = useTranslation()


  return (

    poorPeople.status !== 'in-progress' ? <RehabilitationStatusScreen onPress={() => navigation.goBack()} poorPeople={poorPeople} status={poorPeople.status} /> : <SafeAreaWrapper>
      <View style={globalStyles.container}>
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
      </View>
      <View style={styles.buttonContainer}>
        <AppButton text={t('rehabilitation.markAsComplete')} onPress={() => navigation.navigate('MarkAsComplete', { item: poorPeople })} />
        <AppButton variant='outline' style={{ marginTop: 10 }} text={t('rehabilitation.createFollowUp')} onPress={() => navigation.navigate('AddFollowUpScreen', { item: poorPeople })} />

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
  buttonContainer: {
    padding: 16,
    elevation: 2
  },
});

export default RehabilitationDetailsScreen