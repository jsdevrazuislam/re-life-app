import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const styles = ScaledSheet.create({
  header: {
    margin: 'auto'
  },
  appInput: {
    backgroundColor: Colors.white
  },
  firstStep: {
    marginTop: '30@ms',
    flex: 1
  },
  row: {
    flexDirection: 'row',
    marginTop: '40@ms',
    gap: '20@ms'
  },
  image: {
    // width: '100%',
    height: '100%',
    resizeMode: 'cover', 
    borderRadius: 4,
    alignSelf: 'center',  
    aspectRatio: 3.6 / 4,
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
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10@ms'
  },
  step: {
    width: '48%',
    height: '10@s',
    borderRadius: '3@s',
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20@ms'
  },
  activeStep: {
    backgroundColor: Colors.primary,
  },
  stepText: {
    fontSize: '14@ms',
    color: Colors.text,
  },
  activeStepText: {
    color: Colors.white,
  },
  formContainer: {
    marginTop: '30@s',
  },
  inputContainer: {
    marginBottom: '20@vs',
  },
  inputLabel: {
    fontSize: '14@ms',
    color: Colors.text,
    marginBottom: '8@vs',
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: '8@s',
    padding: '12@s',
    fontSize: '14@ms',
  },
  sectionTitle: {
    color: Colors.text,
    marginBottom: '5@ms'
  },
  docTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '10@s',
    marginBottom: '20@vs',
    marginTop: '5@vs',
  },
  docTypeButton: {
    backgroundColor: Colors.secondaryLight,
    paddingVertical: '8@vs',
    paddingHorizontal: '15@s',
    borderRadius: '5@ms'
  },
  selectedDocType: {
    backgroundColor: Colors.primary,
  },
  docTypeText: {
    color: Colors.text,
    textTransform: 'capitalize'
  },
  selectedDocTypeText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  uploadSection: {
    marginTop: '20@vs',
  },
  uploadDescription: {
    color: Colors.text,
    marginBottom: '20@vs',
    lineHeight: '20@vs',
  },
  uploadRow: {
    marginBottom: '20@vs',
    flexDirection:'row',
    alignItems:'center',
    gap:'10@ms'
  },
  uploadArea: {
    flex: 1,
    height: '120@vs',
    borderWidth: 2,
    padding: '10@ms',
    borderColor: Colors.primary,
    borderRadius: '10@s',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  multipleUploadArea:{
    flexDirection:'row', flexWrap: 'wrap', gap: 15
  },
  multipleImageContainer:{
    width: '30%', height: '100%'
  },
  uploadAreaError: {
    flex: 1,
    height: '120@vs',
    borderWidth: 2,
    padding: '10@ms',
    borderColor: Colors.danger,
    borderRadius: '10@s',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  uploadAreaText: {
    marginTop: '10@vs',
    color: Colors.primary,
    textAlign: 'center',
  },
  uploadAreaTextError: {
    marginTop: '10@vs',
    color: Colors.danger,
    textAlign: 'center',
  },
  uploadButtonText: {
    marginLeft: '10@s',
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;