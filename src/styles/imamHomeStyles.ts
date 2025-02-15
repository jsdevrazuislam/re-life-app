
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";


export const imamStyles = ScaledSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    greeting: {
      color: Colors.text,
    },
    infoPhoto:{
      width: '40@ms',
      height:'40@ms',
      borderRadius: '40@ms',
       objectFit:'cover'
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: '20@ms',
      marginBottom: '20@ms',
      gap:"20@ms"
    },
    statCard: {
      flex: 1,
      backgroundColor: Colors.white,
      borderRadius: '8@ms',
      padding: '16@ms',
      alignItems: 'center',
      elevation: 2,
    },
    statLabel: {
      color: '#666',
    },
    statValue: {
      color: Colors.text,
    },
    tabContainer: {
      flex: 1,
      marginTop:'16@ms'
    },
    addButton: {
      flexDirection: 'row',
      backgroundColor: Colors.primary,
      padding: '12@ms',
      borderRadius: '8@ms',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16@ms',
    },
    buttonText: {
      color: 'white',
      marginLeft: '8@ms',
      fontWeight: 'bold',
    },
    infoCard: {
      backgroundColor: 'white',
      borderRadius: '8@ms',
      padding: '16@ms',
      marginBottom: '16@ms',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 2,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardText: {
      marginLeft: '16@ms',
    },
    cardTitle: {
      color: Colors.text,
    },
    cardSubtitle: {
      color: Colors.text,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: '16@ms',
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.0)",
    },
    menu: {
      position: "absolute",
      top: 80,
      right: 15,
      backgroundColor: "#fff",
      borderRadius: 8,
      paddingVertical: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 5,
      width: 150,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
    },
    menuText: {
      marginLeft: 10,
      fontSize: 16,
    },
  });