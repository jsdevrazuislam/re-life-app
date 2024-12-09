import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const loginStyles = ScaledSheet.create({
    loginForm:{
        marginTop: '20@ms'
    },
    forgotPassword:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginTop: '2@ms',
        marginBottom: '30@ms'
    },
    bottom:{
        marginTop:'60@ms'
    },
    lineContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"center",
        gap: 10,
        marginBottom: '10@ms'
    },
    line:{
        width: '70@ms',
        height: 1,
        backgroundColor:Colors.neutral[300]
    },
    bottomSecondTextStyle:{
        textAlign:'center'
    },
    flex:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    }
  });
  
  export default loginStyles;