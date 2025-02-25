import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const openingStyles = StyleSheet.create({
    skipButton: {
      position: 'absolute', right: 20
    },
    container:{
      justifyContent:'center',
      alignItems:'center',
      flex:0.65
    },
    mb:{
      marginBottom: 14
    },
    image:{
      margin:'auto',
      marginBottom: 20,
      width: 120,
      height: 80,
      objectFit: 'fill'

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