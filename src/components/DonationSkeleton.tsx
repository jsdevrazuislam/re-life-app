import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const DonationHistorySkeleton = () => {
    return (
        <SkeletonPlaceholder
            backgroundColor="#d9f3eb"
            highlightColor="#e0f0fa"
        >
            <View style={styles.container}>
                {[1, 2, 3, 4,5].map((_, index) => (
                    <View key={index} style={styles.card}>
                        <View style={styles.row}>
                            <SkeletonPlaceholder.Item width={100} height={14} borderRadius={4} />
                            <SkeletonPlaceholder.Item width={80} height={14} borderRadius={4} />
                        </View>

                        <View style={[styles.row, styles.userInfoContainer]}>
                            <SkeletonPlaceholder.Item width={48} height={48} borderRadius={24} />
                            <View style={styles.userDetails}>
                                <SkeletonPlaceholder.Item width={120} height={16} borderRadius={4} />
                                <SkeletonPlaceholder.Item
                                    width={80}
                                    height={14}
                                    borderRadius={4}
                                    marginTop={4}
                                />
                            </View>
                            <SkeletonPlaceholder.Item width={60} height={20} borderRadius={4} />
                        </View>

                        <View style={[styles.row, styles.amountRow]}>
                            <View>
                                <SkeletonPlaceholder.Item width={80} height={12} borderRadius={4} />
                                <SkeletonPlaceholder.Item
                                    width={100}
                                    height={18}
                                    borderRadius={4}
                                    marginTop={4}
                                />
                            </View>
                            <View>
                                <SkeletonPlaceholder.Item width={90} height={12} borderRadius={4} />
                                <SkeletonPlaceholder.Item
                                    width={100}
                                    height={14}
                                    borderRadius={4}
                                    marginTop={4}
                                />
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </SkeletonPlaceholder>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f9fa',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    userInfoContainer: {
        marginBottom: 16,
        alignItems: 'flex-start',
    },
    userDetails: {
        flex: 1,
        marginLeft: 12,
    },
    amountRow: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
});

export default DonationHistorySkeleton;