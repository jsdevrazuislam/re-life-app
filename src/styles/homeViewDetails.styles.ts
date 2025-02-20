import { Colors } from "../configs/colors";
import { ScaledSheet } from "react-native-size-matters";

const homeViewDetailsStyles = ScaledSheet.create({
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelIcon:{
        flexDirection:'row',
        alignItems:'center',
        gap:'5@ms'
    },
    imamCard: {
        marginTop: '10@ms',
        width: '100%',
    },
    membersCount: {
        fontWeight: '400',
        color: Colors.text,
        fontSize: '14@ms',
        marginTop: '5@ms'
    },
    headerTitle: {
        color: Colors.text
    },
    masjidImage: { width: '100%', height: '200@ms', borderRadius: '10@ms' },
    label: { color: Colors.text },
    value: {  color: '#666' },

    imamDetails: {
        marginTop: '20@ms',
        width: '100%',
    },
    profileImage: { width: '82@ms', height: '82@ms', borderRadius: '50@ms', alignSelf: 'center', objectFit: 'cover' },

    mainContent: {
        marginTop: '20@ms'
    },
    flexLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '5@ms',
        gap: '10@ms'
    },
    content: {
        marginTop: '25@ms'
    },
    subTitle:{
        color: Colors.white,
        backgroundColor: Colors.success,
        width:'100@ms',
        padding:'4@ms',
        textAlign:'center',
        borderRadius: '10@ms',
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
      },
      dot: {
        width: 10,
        height: 10,
        marginHorizontal: 5,
        borderRadius: 5,
      },
      activeDot: {
        backgroundColor: Colors.primary, 
      },
      inactiveDot: {
        backgroundColor: '#ccc', 
      },
});

export default homeViewDetailsStyles;