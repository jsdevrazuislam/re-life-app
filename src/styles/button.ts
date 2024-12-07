import { StyleSheet } from "react-native";
import { Colors } from "../configs/colors";
import { moderateScale } from "react-native-size-matters";

const buttonStyles = StyleSheet.create({
    appButtonPrimary: {
      width:'100%',
      paddingVertical: 17,
      backgroundColor: Colors.primary,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
    },
    buttonTextPrimary:{
        color:Colors.light
    },
    appButtonOutline: {
        width:'100%',
        paddingVertical: 17,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.dark,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
      },
      buttonTextOutline:{
        color: Colors.dark,
      }
  });
  
  export default buttonStyles;