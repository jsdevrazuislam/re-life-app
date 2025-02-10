import { Colors } from "../configs/colors";
import { Fonts } from "../configs/fonts";
import { ScaledSheet } from "react-native-size-matters";

const homeStyles = ScaledSheet.create({
      headerSection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
      },
      button:{
        marginTop: '10@ms'
      },
      viewArea:{
        marginTop: '30@ms',
      }
  });
  
  export default homeStyles;