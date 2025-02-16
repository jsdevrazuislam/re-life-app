import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const styles = ScaledSheet.create({
    header: {
      margin:'auto'
    },
    appInput:{
      backgroundColor: Colors.white
    },
    firstStep:{
      marginTop: '30@ms'
    },
    stepperContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap:'10@ms'
    },
    step: {
      width: '48%',
      height: '10@s',
      borderRadius: '3@s',
      backgroundColor: '#EEE',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:'20@ms'
    },
    activeStep: {
      backgroundColor: '#4CAF50',
    },
    stepText: {
      fontSize: '14@ms',
      color: '#666',
    },
    activeStepText: {
      color: '#FFF',
    },
    formContainer: {
      marginTop: '30@s',
    },
    inputContainer: {
      marginBottom: '20@vs',
    },
    inputLabel: {
      fontSize: '14@ms',
      color: '#333',
      marginBottom: '8@vs',
    },
    input: {
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: '8@s',
      padding: '12@s',
      fontSize: '14@ms',
    },
    sectionTitle: {
      color: Colors.text,
      marginBottom:'5@ms'
    },
    docTypeContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: '10@s',
      marginBottom: '20@vs',
      marginTop: '5@vs',
    },
    docTypeButton: {
      backgroundColor:'#BADCF0',
      paddingVertical: '8@vs',
      paddingHorizontal: '15@s',
      borderRadius:'5@ms'
    },
    selectedDocType: {
      backgroundColor: Colors.primary,
    },
    docTypeText: {
      color: Colors.text,
    },
    selectedDocTypeText: {
      color: Colors.white,
      fontWeight: 'bold',
    },
    uploadSection: {
      marginTop: '20@vs',
    },
    uploadDescription: {
      color: '#666',
      marginBottom: '20@vs',
      lineHeight: '20@vs',
    },
    uploadRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '15@s',
      marginBottom: '20@vs',
    },
    uploadArea: {
      flex: 1,
      height: '120@vs',
      borderWidth: 2,
      borderColor: '#3F51B5',
      borderRadius: '10@s',
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadAreaText: {
      marginTop: '10@vs',
      color: '#3F51B5',
      fontSize: '14@ms',
    },
    uploadCard: {
      backgroundColor: '#F8F9FA',
      borderRadius: '10@s',
    },
    uploadCardTitle: {
      fontSize: '14@ms',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '15@vs',
    },
    uploadButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10@s',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: '8@s',
    },
    uploadButtonText: {
      marginLeft: '10@s',
      color: Colors.primary,
      fontWeight: 'bold',
    },
});

export default styles;