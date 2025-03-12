import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native';
import { ms, mvs } from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import BackButton from '../components/BackButton';
import Heading from '../components/ui/Heading';
import Paragraph from '../components/ui/Paragraph';
import { Colors } from '../configs/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useTranslation } from '../hooks/useTranslation';
import { AppStackParamList } from '../constants/route';
import { useApi } from '../hooks/useApi';
import ApiStrings from '../lib/apis_string';
import globalStyles from '../styles/global.style';
import { formatValue } from '../utils/formatValue';

export const EmptyState = ({ image = require('../assets/no-request.png'), title = 'noRequests', description = 'noRequestsDescription', style }: {
    image?: ImageSourcePropType, title?: string, description?: string, style?: StyleProp<ImageStyle>
}) => {

    const { t } = useTranslation();

    return (
        <View style={styles.emptyStateContainer}>
            <Image source={image} style={[styles.emptyStateImage, style]} />
            {
                title && <Paragraph level="Large" weight="Bold" style={styles.emptyStateText}>
                    {t(title)}
                </Paragraph>
            }
            <Paragraph level="Small" weight="Medium" style={styles.emptyStateSubText}>
                {t(description)}
            </Paragraph>
        </View>
    )
}

const RequestHistoryScreen = () => {
    const navigation = useNavigation<NavigationProp<AppStackParamList>>();
    const { t } = useTranslation();
    const { request, loading } = useApi();
    const [requests, setRequests] = useState<UpdateRequest[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchRequests = async () => {
        setRefreshing(true);
        const { data } = await request('get', ApiStrings.GET_REQUEST_HISTORY);
        setRequests(data);
        setRefreshing(false);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const onRefresh = useCallback(() => {
        fetchRequests();
    }, []);

    const renderSkeleton = () => (
        <SkeletonPlaceholder borderRadius={4}>
            <View style={styles.card}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonSubtitle} />
                <View style={styles.skeletonLine} />
                <View style={styles.skeletonLine} />
                <View style={styles.skeletonStatus} />
                <View style={styles.skeletonButton} />
            </View>
        </SkeletonPlaceholder>
    );

    const renderItem = ({ item }: { item: UpdateRequest }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Paragraph level='Medium' weight='Bold' style={styles.requestTitle}>
                    {item.fieldType === 'poorPeopleInformations' ? t('poorPeopleInformations') : t('committeeDetails')}
                </Paragraph>
                <Paragraph level='XSmall' weight='Medium' style={styles.requestDate}>
                    {new Date(item.createdAt).toLocaleDateString()} · REQ-{item._id}
                </Paragraph>
            </View>

            {item.changes.map((change, index) => (
                <View style={styles.detailItem} key={index}>
                    <Paragraph level='Small' weight='Medium' style={styles.detailValue}>
                        {t('previousValue')}: {change.previousValue}
                    </Paragraph>
                    <Paragraph level='Small' weight='Medium' style={styles.detailValue}>
                        {t('modifiedValue')}: {formatValue(change.modifiedValue)}
                    </Paragraph>
                </View>
            ))}

            {
              item.adminComment &&  <Paragraph level='Small' weight='Medium' style={styles.detailValue}>
                {t('rejectedReasons')}: {item.adminComment}
                </Paragraph>
            }

            <View
                style={[
                    styles.statusContainer,
                    item.status === 'approved' ? styles.approvedStatus : item.status === 'rejected' ? styles.rejected : styles.pendingStatus,
                ]}
            >
                <Paragraph level='Small' weight='Bold' style={styles.statusText}>
                    {item.status}
                </Paragraph>
            </View>
        </View>
    );

    return (
        <SafeAreaWrapper>
            <View style={globalStyles.container}>
                <BackButton />
                <Heading level={5} weight='Bold' style={styles.headerTitle}>
                    {t('requestHistory')}
                </Heading>
                <Paragraph level='Medium' weight='Medium' style={styles.subtitle}>
                    {t('viewRequestStatus')}
                </Paragraph>

                <FlatList
                    data={loading ? new Array(5).fill({}) : requests}
                    keyExtractor={(item, index) => (item?._id || index.toString())}
                    renderItem={loading ? renderSkeleton : renderItem}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    ListEmptyComponent={!loading && requests.length === 0 ? (
                        <EmptyState />
                    ) : null}
                />
            </View>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({

    headerTitle: {
        color: Colors.text,
        marginTop: mvs(4),
    },
    subtitle: {
        color: Colors.text,
        marginBottom: mvs(16),
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: ms(8),
        padding: ms(16),
        marginBottom: mvs(16),
        borderWidth: 1,
        borderColor: Colors.border,
    },
    emptyStateImage: {
        width: '100%',
        height: 200,
        objectFit: 'cover'
    },
    cardHeader: {
        marginBottom: mvs(12),
    },
    requestTitle: {
        color: Colors.text,
    },
    requestDate: {
        color: Colors.neutral[500],
    },
    detailItem: {
        marginBottom: mvs(8),
    },
    detailLabel: {
        color: Colors.neutral[600],
        width: ms(64),
    },
    detailValue: {
        color: Colors.text,
    },
    statusContainer: {
        alignSelf: 'flex-start',
        borderRadius: ms(4),
        paddingVertical: mvs(4),
        paddingHorizontal: ms(8),
        marginTop: mvs(12),
    },
    approvedStatus: {
        backgroundColor: Colors.success,
    },
    pendingStatus: {
        backgroundColor: Colors.warning,
    },
    rejected: {
        backgroundColor: Colors.danger,
    },
    statusText: {
        fontSize: ms(12),
        fontWeight: '500',
        color: Colors.white
    },
    viewDetailsButton: {
        marginTop: mvs(8),
    },
    viewDetailsText: {
        color: Colors.secondary,
    },

    emptyStateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: mvs(100),
    },
    emptyStateText: {
        color: Colors.text,
        textAlign: 'center',
        marginBottom: mvs(4),
    },
    emptyStateSubText: {
        color: Colors.textSecondary,
        textAlign: 'center',
    },
    skeletonTitle: {
        width: '60%',
        height: 20,
        backgroundColor: Colors.border,
        marginBottom: mvs(8),
    },
    skeletonSubtitle: {
        width: '40%',
        height: 15,
        backgroundColor: Colors.border,
        marginBottom: mvs(12),
    },
    skeletonLine: {
        width: '80%',
        height: 15,
        backgroundColor: Colors.border,
        marginBottom: mvs(8),
    },
    skeletonStatus: {
        width: '30%',
        height: 20,
        backgroundColor: Colors.border,
        marginTop: mvs(12),
    },
    skeletonButton: {
        width: '50%',
        height: 20,
        backgroundColor: Colors.border,
        marginTop: mvs(8),
    },
});

export default RequestHistoryScreen;
