import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
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
                        {t('modifiedValue')}: {change.modifiedValue}
                    </Paragraph>
                </View>
            ))}

            <View
                style={[
                    styles.statusContainer,
                    item.status === 'approved' ? styles.approvedStatus : styles.pendingStatus,
                ]}
            >
                <Paragraph level='Small' weight='Bold' style={styles.statusText}>
                    {item.status}
                </Paragraph>
            </View>

            <TouchableOpacity onPress={() => console.log('View')} style={styles.viewDetailsButton}>
                <Paragraph level='Small' style={styles.viewDetailsText}>
                    {t('viewDetails')}
                </Paragraph>
            </TouchableOpacity>
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
            />
            </View>
        </SafeAreaWrapper>
    );
};

const styles = StyleSheet.create({
    
    headerTitle: {
        color: '#1A1A1A',
        marginTop: mvs(4),
    },
    subtitle: {
        color: '#666666',
        marginBottom: mvs(16),
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: ms(8),
        padding: ms(16),
        marginBottom: mvs(16),
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    cardHeader: {
        marginBottom: mvs(12),
    },
    requestTitle: {
        color: '#1A1A1A',
    },
    requestDate: {
        color: '#666666',
    },
    detailItem: {
        marginBottom: mvs(8),
    },
    detailLabel: {
        color: '#666666',
        width: ms(64),
    },
    detailValue: {
        color: '#1A1A1A',
        flex: 1,
    },
    statusContainer: {
        alignSelf: 'flex-start',
        borderRadius: ms(4),
        paddingVertical: mvs(4),
        paddingHorizontal: ms(8),
        marginTop: mvs(12),
    },
    approvedStatus: {
        backgroundColor: '#E8F5E9',
    },
    pendingStatus: {
        backgroundColor: '#FFF3E0',
    },
    statusText: {
        fontSize: ms(12),
        fontWeight: '500',
    },
    viewDetailsButton: {
        marginTop: mvs(8),
    },
    viewDetailsText: {
        color: Colors.secondary,
    },

    // Skeleton styles
    skeletonTitle: {
        width: '60%',
        height: 20,
        backgroundColor: '#E0E0E0',
        marginBottom: mvs(8),
    },
    skeletonSubtitle: {
        width: '40%',
        height: 15,
        backgroundColor: '#E0E0E0',
        marginBottom: mvs(12),
    },
    skeletonLine: {
        width: '80%',
        height: 15,
        backgroundColor: '#E0E0E0',
        marginBottom: mvs(8),
    },
    skeletonStatus: {
        width: '30%',
        height: 20,
        backgroundColor: '#E0E0E0',
        marginTop: mvs(12),
    },
    skeletonButton: {
        width: '50%',
        height: 20,
        backgroundColor: '#E0E0E0',
        marginTop: mvs(8),
    },
});

export default RequestHistoryScreen;
