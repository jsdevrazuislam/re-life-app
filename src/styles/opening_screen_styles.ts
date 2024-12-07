import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

const openingStyles = StyleSheet.create({
    skipButton: {
      justifyContent:'flex-end',
      alignItems:'flex-end'
    },
    container:{
      marginTop: 10
    },
    mb:{
      marginBottom: 20
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
      textAlign:"center"
    },
    bottomSection: {
      marginTop: moderateScale(25, 1)
    }
  });
  
  export default openingStyles;