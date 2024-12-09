import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const openingStyles = StyleSheet.create({
    skipButton: {
      justifyContent:'flex-end',
      alignItems:'flex-end'
    },
    container:{
      marginTop: 10
    },
    mb:{
      marginBottom: 14
    },
    image:{
      width: '100%',
      height: 300,
    },
    appTitle:{
      justifyContent:'center',
      alignItems:'center',
      textAlign:'center'
    },
    appDescription:{
      textAlign:"center",
      color: Colors.dark,
      opacity: 0.7,
      marginTop: 5
    },
    bottomSection: {
      marginTop: moderateScale(25, 1)
    }
  });
  
  export default openingStyles;