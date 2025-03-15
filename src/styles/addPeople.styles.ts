import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const styles = ScaledSheet.create({
    uploadPhotoContainer: {
        margin: 'auto'
    },
    profileSection: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatarContainer: {
        position: 'relative',
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.primary,
        borderRadius: '15@ms',
        padding: '4@ms',
    },
    avatar: {
        width: '100@ms',
        height: '100@ms',
        borderRadius: '50@ms',
        backgroundColor: Colors.lightGray
    },
    income: {
        flexDirection: 'row',
        gap: '10@ms',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    deleteButton: {
        width: '30@ms',
        height: '30@ms',
        backgroundColor: Colors.danger,
        borderRadius: '50@ms',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    uploadButton: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: '10@s',
        padding: '20@s',
        borderStyle: 'dashed',
    },
    uploadText: {
        color: Colors.primary,
        marginTop: '10@vs',
    },
    inputContainer: {
        marginBottom: '15@vs',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: '8@s',
        paddingVertical: '2@s',
        paddingHorizontal: '10@s',
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'space-between'
    },
    label: {
        fontSize: '14@ms',
        color: Colors.text,
        marginBottom: '8@vs',
    },
    input: {
    //    flex:1,
    color: Colors.placeholder
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: '8@s',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10@s',
        alignItems: 'center',
        marginTop: '10@vs'
    },
    halfInput: {
        flex: 1,
    },
    sectionTitle: {
        color: Colors.text,
        marginBottom: '5@vs'
    },
    sectionDescription: {
        color: Colors.textSecondary,
    },
    
    childSection: {
        backgroundColor: Colors.neutral[200],
        borderRadius: '8@s',
        padding: '15@s',
        marginVertical: '10@vs',
    },
    childHeader: {
        fontWeight: 'bold',
        marginBottom: '15@vs',
        color: Colors.black,
    },

});

export default styles;