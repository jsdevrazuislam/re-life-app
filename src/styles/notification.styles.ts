import { ms, ScaledSheet } from 'react-native-size-matters';
import { Colors } from '../configs/colors';


export const styles = ScaledSheet.create({
    header: {
        paddingHorizontal: ms(20),
        paddingVertical: '15@vs',
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: ms(24),
        fontWeight: '600',
        color: Colors.text,
    },
    deleteButton:{
        width: '40@ms',
        height: '40@ms',
        backgroundColor: Colors.danger,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'2@ms',
        marginTop: '30@ms'
    },
    segmentContainer: {
        flexDirection: 'row',
        marginVertical: '15@vs',
        backgroundColor: Colors.border,
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
        color: Colors.text,
    },
    activeSegmentText: {
        color: Colors.white,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: Colors.white,
        borderRadius: ms(12),
    },
    unreadNotification: {
        backgroundColor: Colors.secondaryLight,
    },
    iconContainer: {
        width: ms(40),
        height: ms(40),
        borderRadius: ms(20),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: ms(15),
    },
    contentContainer: {
        flex: 1,
    },
    notifictionTitle: {
        color: Colors.text,
        marginBottom: '4@vs',
    },
    notificationMessage: {
        color: Colors.textSecondary,
        marginBottom: '4@vs',
    },
    readMessage: {
        opacity: 0.7,
    },
    timestamp: {
        color: Colors.neutral[400],
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
        backgroundColor: Colors.border,
        marginVertical: '15@vs',
    },
    listContent: {
        paddingBottom: '20@vs',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      
      emptyImage: {
        width: ms(200),
        height: ms(200),
        resizeMode: 'cover',
      },
      
      emptyText: {
        marginTop: 20,
        color: Colors.textSecondary,
        textAlign: 'center',
      },
});