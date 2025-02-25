import { ScaledSheet } from "react-native-size-matters";

const homeStyles = ScaledSheet.create({
      headerSection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom: '10@ms'
      },
      button:{
        marginTop: '10@ms'
      },
      viewArea:{
        marginTop: '30@ms',
      },
      filterMargin:{
        marginTop:'2@ms'
      }
  });
  
  export default homeStyles;