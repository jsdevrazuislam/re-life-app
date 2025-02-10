import { Colors } from "../configs/colors";
import { ScaledSheet } from "react-native-size-matters";

const poorPeopleViewStyles = ScaledSheet.create({
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    flexRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5@ms'
    },
    flex:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5@ms',
        padding: '5@ms',
        borderBottomWidth: 1,
        borderColor: Colors.border,
    },
    documentsImage:{
        width: '100%', 
        height: '180@ms',
        borderRadius: '10@ms',
        objectFit:'cover'
    },
    documentsImageContainer:{
        width: '48%'
    },
    govermentAid:{
        backgroundColor: Colors.white,
        paddingHorizontal:5
    },
    label: { color: Colors.text},
    value: {  color: '#666' },
    headerTitle:{
        color:Colors.text
    },
    mainContent:{
         marginTop: '20@ms'
    },
    documents:{
        flexDirection: 'row',
        alignItems: 'center',
        gap:'10@ms',
    },
    masjidImage:{
        width: '100%', 
        height: '200@ms',
        borderRadius: '10@ms',
        marginBottom: '20@ms'
    },
    flexLayout: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '2@ms',
        gap: '10@ms'
    },
});

export default poorPeopleViewStyles;