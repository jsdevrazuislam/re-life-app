import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const otpStyles = ScaledSheet.create({
    headerNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '20@ms'
    },
    form:{
        marginTop:"35@ms",
        marginBottom: '20@ms'
    },
    topSection:{
        flex:1
    },
    flex:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '30@ms',
        marginTop: '30@ms'
    },
    otpInput: {
        width: '70@ms',
        height: '70@ms',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
    },
    resendButton: {
        marginTop: 10,
    },
    resendText: {
        color: Colors.primary,
        textAlign: 'center',
        marginTop: '20@ms',
    },
  });
  
  export default otpStyles;