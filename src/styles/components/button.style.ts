import { StyleSheet } from "react-native";
import { Colors } from "../../configs/colors";
import { Fonts } from "../../configs/fonts";

const buttonStyles = StyleSheet.create({
    appButtonPrimary: {
      width:'100%',
      paddingVertical: 14,
      backgroundColor: Colors.primary,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 10,
    },
    buttonTextPrimary:{
        color:Colors.light,
        fontFamily: Fonts.QUICKSAND_SEMIBOLD
    },
    appButtonOutline: {
        width:'100%',
        paddingVertical: 14,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.dark,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 10,
      },
      buttonTextOutline:{
        color: Colors.dark,
        fontFamily: Fonts.QUICKSAND_SEMIBOLD
      }
  });
  
  export default buttonStyles;