import { ms, ScaledSheet } from 'react-native-size-matters';
import { Colors } from '../configs/colors';


export const styles = ScaledSheet.create({
    header: {
        paddingHorizontal: ms(20),
        paddingVertical: '15@vs',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: ms(24),
        fontWeight: '600',
        color: '#1A1A1A',
    },
    segmentContainer: {
        flexDirection: 'row',
        marginVertical: '15@vs',
        backgroundColor: '#F5F5F5',
        borderRadius: ms(8),
    },
    segmentButton: {
        flex: 1,
        paddingVertical: '12@vs',
        borderRadius: ms(8),
        alignItems: 'center',
    },
    activeSegment: {
        backgroundColor: Colors.primary,
    },
    segmentText: {
        fontSize: ms(14),
        fontWeight: '500',
        color: '#666666',
    },
    activeSegmentText: {
        color: '#FFFFFF',
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#FFFFFF',
        borderRadius: ms(12),
    },
    unreadNotification: {
        backgroundColor: '#F8FAFF',
    },
    iconContainer: {
        width: ms(40),
        height: ms(40),
        borderRadius: ms(20),
        backgroundColor: '#E8F0FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ms(15),
    },
    contentContainer: {
        flex: 1,
    },
    notifictionTitle: {
        fontSize: ms(16),
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: '4@vs',
    },
    notificationMessage: {
        color: '#4A4A4A',
        marginBottom: '4@vs',
    },
    readMessage: {
        opacity: 0.7,
    },
    timestamp: {
        color: '#888888',
    },
    unreadIndicator: {
        width: ms(8),
        height: ms(8),
        borderRadius: ms(4),
        backgroundColor: Colors.primary,
        marginLeft: ms(10),
        marginTop: '8@vs',
    },
    separator: {
        height: 1,
        backgroundColor: '#F0F0F0',
        marginVertical: '15@vs',
    },
    listContent: {
        paddingBottom: '20@vs',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: ms(50),
      },
      
      emptyImage: {
        width: ms(120),
        height: ms(120),
        marginBottom: ms(20),
        resizeMode: 'contain',
      },
      
      emptyText: {
        fontSize: ms(16),
        color: Colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
      },
});