import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../configs/colors";

const horizontalCardListStyles = ScaledSheet.create({
    membersCount:{
        color: Colors.text,
        marginTop: '2@ms',
    },
    headerTitle: {
        color: Colors.text
    },
    label: {  color: Colors.text, textTransform: 'capitalize' },
    value: { color: Colors.lightGray },
    card: {
        backgroundColor: Colors.white,
        borderRadius: '8@ms',
        marginRight: '20@ms',
        width: '200@ms',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: '4@ms',
        elevation: 2,
        marginTop: '15@ms',
    },
    detailsProfilePicture: { width: '100%', height: '125@ms', alignSelf: 'center', borderTopLeftRadius: '10@ms', borderTopRightRadius: '10@ms', objectFit: 'cover' },
    flexLayout:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5@ms',
        gap: '10@ms'
    },
    content:{
        padding: '10@ms'
    },
    container: { marginVertical: '10@ms' },
});

export default horizontalCardListStyles;