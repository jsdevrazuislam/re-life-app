import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";


const styles = ScaledSheet.create({
    headerTitle: {
      color: Colors.text,
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    profileSection: {
      alignItems: 'center',
      paddingTop: '20@vs',
      paddingBottom: '20@vs',
    },
    avatarContainer: {
      position: 'relative',
      marginBottom: '15@vs',
    },
    avatar: {
      width: '100@ms',
      height: '100@ms',
      borderRadius: '50@ms',
      backgroundColor: Colors.lightGray
    },
    editIcon: {
      position: 'absolute',
      bottom: 0,
      right: -10,
      backgroundColor: Colors.primary,
      borderRadius: '15@ms',
      padding: '8@ms',
    },
    deleteIcon: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: '#FFF',
      borderRadius: '15@ms',
      padding: '8@ms',
    },
    userName: {
      color: Colors.text,
      marginTop: '10@vs',
    },
    userEmail: {
      color: '#666',
      marginTop: '5@vs',
    },
    settingsGroup: {
      backgroundColor: Colors.white,
      borderRadius: '12@s',
      elevation: 2,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15@s',
      borderBottomWidth: 1,
      borderBottomColor: '#EEE',
    },
    itemLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '15@s',
    },
    itemLabel: {
      color: Colors.text,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10@s',
      marginTop: '20@vs',
      padding: '15@s',
      borderTopWidth: 1,
      borderTopColor: '#EEE',
      backgroundColor: Colors.white,
    },
  });


export default styles;