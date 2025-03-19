import React, { useEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SafeAreaWrapper from '../SafeAreaWrapper';
import globalStyles from '../../styles/global.style';
import BackButton from '../BackButton';
import { Colors } from '../../configs/colors';
import Paragraph from '../ui/Paragraph';
import Heading from '../ui/Heading';
import ImageComponent from '../ui/Image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList } from '../../constants/route';
import { useApi } from '../../hooks/useApi';
import ApiStrings from '../../lib/apis_string';
import { useAuthStore } from '../../store/store';
import AppButton from '../ui/AppButton';
import { useTranslation } from '../../hooks/useTranslation';


const PersonItem: React.FC<PersonItemProps> = ({ personId, status, onPress }) => {
  

  const { t } = useTranslation()

  const statusColors = {
    'completed': Colors.primary,
    'in-progress': Colors.warning,
    'failed': Colors.danger
  };
  
  const statusLabels = {
    'completed': t('rehabilitation.successful'),
    'in-progress': t('rehabilitation.inProgress'),
    'failed': t('rehabilitation.failed')
  };
  

  return (
    <View style={styles.listItem}>
    <ImageComponent style={{ width: 60, height: 60, borderRadius: 10, marginRight: 10 }} source={personId.photoUrl} />
    <View style={styles.listContent}>
      <Paragraph level='Medium' weight='Medium' style={styles.listTitle}>{personId.name}</Paragraph>
      <Paragraph level='Small' weight='Regular' style={styles.listTitle}>{personId.age} {t('years')}</Paragraph>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator,
        { backgroundColor: statusColors[status] }]} />
        <Text style={styles.statusText}>{statusLabels[status]}</Text>
      </View>
    </View>
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name="chevron-right" size={24} color={Colors.primary} />
    </TouchableOpacity>
  </View>
  )
}



const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Heading level={5} weight='Bold' style={styles.statValue}>{value}</Heading>
    <Paragraph level='Small' style={styles.statTitle}>{title}</Paragraph>
  </View>
);

const RehabilitationListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>();
  const { loading, request, error } = useApi();
  const { user } = useAuthStore();
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState<PersonItemProps[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isEndReached, setIsEndReached] = useState(false); 
  const { t } = useTranslation()


  const fetchData = async (pageNum: number = 1, isRefresh: boolean = false) => {
    try {
        if (!isRefresh && (loadingMore || pageNum > totalPages)) return;

        setLoadingMore(true);
        setIsEndReached(true);

        const [peopleRes, statsRes] = await Promise.all([
            request(
                'get',
                ApiStrings.GET_MASJID_REHEB_PEOPLE(`${user?.masjid._id ?? ''}?page=${pageNum}`)
            ),
            request(
                'get',
                ApiStrings.GET_MASJID_REHEB_STATS(user?.masjid._id ?? '')
            )
        ]);

        if (!peopleRes || !statsRes) {
            return;
        }

        const peopleData = peopleRes?.data?.data || []; 
        const statsData = statsRes?.data || {
            ongoing: 0,
            totalCases: 0,
            failed: 0,
            completed: 0
        };

        setStats(statsData);
        setTotalPages(peopleRes?.data?.totalPages || 1);

        if (pageNum === 1) {
            setData(peopleData);
        } else {
            setData(prevData => [...prevData, ...peopleData]); 
        }

        setPage(pageNum);
    } finally {
        setLoadingMore(false);
        setTimeout(() => setIsEndReached(false), 1000); 
    }
};

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchData(1);
    };
    loadInitialData();
  }, []);
  

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData(1, true);
    setRefreshing(false);
};

const loadMore = async () => {
  if (loadingMore || isEndReached || page >= totalPages) return;
  await fetchData(page + 1);
};

  const renderSkeleton = () => (
    <View>
      {Array(6).fill(0).map((_, index) => (
        <SkeletonItem key={`skeleton-${index}`} />
      ))}
    </View>
  );

  const renderError = () => (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={40} color={Colors.danger} />
      <Text style={styles.errorText}>{error}</Text>
      <AppButton
        text="পুনরায় চেষ্টা করুন"
        onPress={onRefresh}
      />
    </View>
  );

  return (
    <SafeAreaWrapper>
      <View style={globalStyles.container}>
        <BackButton onPress={() => navigation.navigate('ImamSettingsScreen')} />

        {stats ? (
          <>
            <View style={[styles.row, { marginTop: 20 }]}>
              <StatCard title={t('rehabilitation.totalCandidates')} value={stats.totalCases} color={Colors.secondary} />
              <StatCard title={t('rehabilitation.successful')} value={stats.completed} color={Colors.primary} />
            </View>
            <View style={styles.row}>
              <StatCard title={t('rehabilitation.inProgress')} value={stats.ongoing} color={Colors.warning} />
              <StatCard title={t('rehabilitation.failed')} value={stats.failed} color={Colors.danger} />
            </View>
          </>
        ) : (
          <StatsSkeleton />
        )}

        {error ? renderError() : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PersonItem
                onPress={() => navigation.navigate("RehabilitationDetails", { item: item })}
                {...item}
              />
            )}
            keyExtractor={item => item._id}
            onEndReachedThreshold={0.2}
            onMomentumScrollBegin={() => setIsEndReached(false)} 
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[Colors.primary]}
              />
            }
            onEndReached={loadMore}
            ListFooterComponent={
              loadingMore ? (
                <ActivityIndicator color={Colors.primary} />
              ) : page < totalPages ? (
                <Text style={styles.loadMoreText}>আরো লোড করুন...</Text>
              ) : null
            }
            ListEmptyComponent={
              !loading && data.length === 0 ? (
                <Text style={styles.emptyText}>কোন ডেটা পাওয়া যায়নি</Text>
              ) : null
            }
          />
        )}

        {loading && !refreshing && renderSkeleton()}
      </View>
    </SafeAreaWrapper>
  );
};

export const SkeletonItem = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonAvatar} />
      <View style={styles.skeletonTextContainer}>
        <View style={styles.skeletonLine} />
        <View style={[styles.skeletonLine, { width: '60%' }]} />
      </View>
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
};

export const StatsSkeleton = () => (
  <>
    <View style={[styles.row, { marginTop: 20 }]}>
      <StatCardSkeleton />
      <StatCardSkeleton />
    </View>
    <View style={styles.row}>
      <StatCardSkeleton />
      <StatCardSkeleton />
    </View>
  </>
);

export const StatCardSkeleton = () => (
  <View style={styles.statSkeleton}>
    <View style={styles.statSkeletonLine} />
    <View style={styles.statSkeletonLine} />
  </View>
);


const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    margin: 4,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  statValue: {
    color: 'white',
    marginBottom: 4,
  },
  statTitle: {
    color: 'white',
  },
  listItem: {
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth:2,
    borderColor: Colors.neutral[200]
  },
  listContent: {
    flex: 1,
  },
  listTitle: {
    color: Colors.text,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    color: Colors.dark,
  },
  dateText: {
    fontSize: 12,
    color: Colors.neutral[500],
  },
  skeletonItem: {
    backgroundColor: Colors.light,
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    overflow: 'hidden',
  },
  skeletonAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[200],
  },
  skeletonTextContainer: {
    marginTop: 8,
  },
  skeletonLine: {
    height: 12,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    marginBottom: 6,
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  statSkeleton: {
    width: '48%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.light,
  },
  statSkeletonLine: {
    height: 20,
    backgroundColor: Colors.neutral[200],
    borderRadius: 4,
    marginBottom: 8,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger,
    marginVertical: 10,
    textAlign: 'center',
  },
  loadMoreText: {
    textAlign: 'center',
    color: Colors.primary,
    padding: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.neutral[200],
    padding: 20,
  },
});

export default RehabilitationListScreen