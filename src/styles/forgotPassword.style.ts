import { ScaledSheet } from "react-native-size-matters";

const forgotPasswordStyles = ScaledSheet.create({
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
    }
  });
  
  export default forgotPasswordStyles;