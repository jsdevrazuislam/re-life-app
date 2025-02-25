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
    value: { color: Colors.lightGray, width: '120@ms' },
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        // alignItems: 'center',
      },
      modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        alignSelf: 'center',
      },
      closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
      },
      closeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
    
});

export default horizontalCardListStyles;