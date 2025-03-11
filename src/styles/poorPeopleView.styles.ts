import { Colors } from "../configs/colors";
import { ScaledSheet } from "react-native-size-matters";

const poorPeopleViewStyles = ScaledSheet.create({
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    profileSection: {
        alignItems: 'center',
        marginBottom: '20@ms',
    },
    profileImage: {
        width: '100@ms',
        height: '100@ms',
        borderRadius: '50@ms',
        marginBottom: '10@ms',
    },
    name: {
        color:  Colors.text,
        marginBottom: '10@ms',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10@ms',
    },
    docImageRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:'10@ms'
      },
      docImageContainer: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 10,
        overflow: 'hidden',
      },
      docImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius:'10@ms'
      },
    detailText: {
        color: Colors.text,
        marginLeft: '10@ms',
        flexShrink: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.light,
        padding: '15@ms',
        borderRadius: '10@ms',
        elevation: 3,
        marginBottom: '10@ms',
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sectionTitle: {
        color: Colors.text,
        marginLeft: '10@ms',
    },
    sectionContent: {
        backgroundColor: Colors.white,
        padding: '15@ms',
        borderRadius: '10@ms',
        marginBottom: '10@ms',
    },
    childDetail: {
        marginLeft: '20@ms',
        marginBottom: '15@ms',
    },
});

export default poorPeopleViewStyles;