import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const styles = ScaledSheet.create({
    uploadPhotoContainer: {
        alignItems: 'center',
        marginVertical: '20@vs',
    },
    income:{
            flexDirection:'row',
            gap:'10@ms',
            alignItems:'center'
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
    },
    label: {
        fontSize: '14@ms',
        color: '#333',
        marginBottom: '8@vs',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: '8@s',
        padding: '12@s',
        fontSize: '14@ms',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: '8@s',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10@s',
        alignItems:'center',
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
        color: '#666',
        marginBottom: '15@vs',
    },
    uploadField: {
        borderWidth: 2,
        borderColor: '#3F51B5',
        borderRadius: '8@s',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '15@s',
        borderStyle: 'dashed',
    },
    uploadFieldText: {
        color: '#3F51B5',
        marginTop: '8@vs',
    },
    submitButton: {
        backgroundColor: '#3F51B5',
        padding: '15@s',
        borderRadius: '8@s',
        alignItems: 'center',
        marginVertical: '20@vs',
    },
    submitText: {
        color: 'white',
        fontSize: '16@ms',
        fontWeight: 'bold',
    },
    childSection: {
        backgroundColor: '#f5f5f5',
        borderRadius: '8@s',
        padding: '15@s',
        marginVertical: '10@vs',
    },
    childHeader: {
        fontWeight: 'bold',
        marginBottom: '10@vs',
        color: '#333',
    },
});

export default styles;