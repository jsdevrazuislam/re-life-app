import { View, StyleSheet, RefreshControl, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO, addMonths } from 'date-fns';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import globalStyles from '../styles/global.style';
import { Colors } from '../configs/colors';
import Header from '../components/Header';
import Paragraph from '../components/ui/Paragraph';
import { useCallback, useEffect, useState } from 'react';
import { EmptyState } from './RequestAccessViewScreen';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import { useAuthStore } from '../store/store';
import ImageComponent from '../components/ui/Image';
import DonationHistorySkeleton from '../components/DonationSkeleton';
import { useTranslation } from '../hooks/useTranslation';
import { convertNumber } from '../utils/helper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../constants/route';

const DonationHistoryScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [donations, setDonations] = useState<DonationResponseData[]>([]);
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { loading, request } = useApi()
  const { user } = useAuthStore()
  const { t } = useTranslation()

  const fetchDonations = async () => {
    setRefreshing(true);
    const { data } = await request('get', ApiStrings.GET_DONATIONS(user?.masjid._id ?? ''))
    setDonations(data);
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [user])


  const getEstimatedDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(addMonths(date, 1), 'MMM dd, yyyy');
  };

  const renderItem = ({ item }: { item: DonationResponseData }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Paragraph level="Small" weight="Bold" style={styles.donationId}>
          ID: {item._id}
        </Paragraph>
        <Paragraph level="Small" weight="Medium" style={styles.date}>
          {format(parseISO(item.donationDate), 'MMM dd, yyyy')}
        </Paragraph>
      </View>

      <View style={[styles.row, styles.userInfoContainer]}>
        <ImageComponent source={item.poorPerson.photoUrl} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Paragraph level="Small" weight="Bold" style={styles.userName}>
            {item.poorPerson.name}
          </Paragraph>
          <View style={styles.userMeta}>
            <Paragraph level="Small" weight="Medium" style={styles.metaText}>
              {convertNumber(item.poorPerson.age, true)} {t('years')}
            </Paragraph>
            <Icon
              name={item.poorPerson.gender === 'male' ? 'male' : 'female'}
              size={16}
              color={Colors.black}
            />
          </View>
        </View>

        <View style={styles.receivedBadge}>
          <Paragraph level="XSmall" weight="Medium" style={styles.badgeText}>
            Received
          </Paragraph>
        </View>
      </View>

      <View style={[styles.row, styles.amountRow]}>
        <View>
          <Paragraph level="Small" weight="Medium" style={styles.amountLabel}>
            {t('totalDonation')}
          </Paragraph>
          <Paragraph level="Small" weight="Bold" style={styles.amount}>
            ৳{convertNumber(item.poorPerson.essentialsNeedsMonthly.financialNeeds, true)}
          </Paragraph>
        </View>

        <View style={styles.dateContainer}>
          <Paragraph level="Small" weight="Medium" style={styles.estimatedLabel}>
            {t('nextEstimated')}
          </Paragraph>
          <Paragraph level="Small" weight="Bold" style={styles.estimatedDate}>
            {getEstimatedDate(item.donationDate)}
          </Paragraph>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <Header title={t('donationHistory')} onPress={() => navigation.navigate('ImamSettingsScreen')} />
        {
          loading ? <DonationHistorySkeleton /> : <FlatList
          data={donations}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<EmptyState />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
        }
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    elevation: 0.5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: Colors.neutral[200]
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  donationId: {
    color: Colors.secondary,
    fontWeight: '500',
    fontSize: 14,
  },
  date: {
    color: Colors.dark,
    fontSize: 13,
  },
  userInfoContainer: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    color: Colors.dark,
    fontSize: 14,
  },
  receivedBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: Colors.primary,
  },
  amountRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  amountLabel: {
    color: Colors.dark,
    marginBottom: 4,
  },
  amount: {
    color: Colors.primary,
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  estimatedLabel: {
    color: Colors.dark
  },
  estimatedDate: {
    color: Colors.secondary,
  },
});

export default DonationHistoryScreen;