import { ScaledSheet } from "react-native-size-matters";

const profileStyles = ScaledSheet.create({
    headerNavigation: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    form: {
        marginTop: '20@ms',
        marginBottom:'20@ms'
    },
    flexLayout:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: '50@ms',
        backgroundColor: "#ddd",
        overflow:'hidden'
    },
    relative:{
        width: '70@ms',
        height:'70@ms',
        position:'relative',
        alignItems:'center',
        justifyContent:'center',
        margin:'auto'
    },
    paddingRight:{
        paddingRight: 16
    },
    placeholder: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ccc",
      },
    image: {
        width: "100%",
        height: "100%",
    },
    iconWrapper: {
        position: "absolute",
        bottom: -5,
        right: 0,
        borderRadius: 15,
        padding: 5,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: "red",
        padding: 8,
        borderRadius: 20,
    },
  });
  
  export default profileStyles;