import { Colors } from "../configs/colors";
import { ms, mvs, ScaledSheet } from "react-native-size-matters";

const homeViewDetailsStyles = ScaledSheet.create({
    headerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    labelIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '5@ms'
    },
    expanded:{
      width: 30,
      height: 30,
      backgroundColor: Colors.black,
      position:'absolute',
      justifyContent:'center',
      alignItems:'center',
      bottom: 0,
      right:0
    },
    call:{
      width: 40,
      height:40,
      backgroundColor: Colors.primary,
      justifyContent:'center',
      alignItems:'center',
      borderRadius: 50
    },
    imamCard: {
        marginTop: '10@ms',
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    membersCount: {
        fontWeight: '400',
        color: Colors.text,
        fontSize: '14@ms',
        marginTop: '5@ms'
    },
    headerTitle: {
        color: Colors.text
    },
    masjidImage: { 
      position:'relative'
     },
     imamCardLeft:{
      flexDirection:'row',
      gap:15
     },
    label: { color: Colors.text },
    value: { color: '#666' },

    imamDetails: {
        marginTop: '20@ms',
        marginBottom: '20@ms',
        width: '100%',
    },
    profileImage: { width: '50@ms', height: '50@ms', borderRadius: '50@ms', alignSelf: 'center', objectFit: 'cover' },

    mainContent: {
        marginTop: '20@ms'
    },
    scrollContent:{
      flexDirection: 'row', height: 120, gap:15, marginTop: 10
    },
    flexLayout: {
        flexDirection: 'row',
    },
    content: {
        marginTop: '5@ms'
    },
    subTitle: {
        color: Colors.white,
        backgroundColor: Colors.success,
        width: '100@ms',
        padding: '4@ms',
        textAlign: 'center',
        borderRadius: '10@ms',
    },
    poorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: mvs(16),
      },
      tabContainer: {
        flexDirection: 'row',
        marginBottom: mvs(16),
        marginTop: mvs(16),
        backgroundColor: Colors.white,
        borderRadius: 10
      },
      tab: {
        flex: 1,
        paddingVertical: ms(8),
        borderBottomWidth: 2,
        borderColor: 'transparent',
      },
      activeTab: {
        borderColor: Colors.primary,
        backgroundColor: Colors.white
      },
      tabText: {
        textAlign: 'center',
        color: Colors.text,
      },
      activeTabText: {
        color: Colors.primary,
      },
      detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: mvs(16),
      },
      detailText: {
        marginLeft: ms(12),
      },
      detailTitle: {
        fontSize: ms(14),
        color: '#666',
      },
      detailValue: {
        fontSize: ms(16),
        color: '#1A1A1A',
      },
      documentItem: {
        flex: 1,
        margin: ms(8),
      },
      documentImage: {
        width: '100%',
        height: mvs(150),
        borderRadius: ms(8),
      },
      houseImage: {
        width: ms(200),
        height: mvs(150),
        borderRadius: ms(8),
        marginRight: ms(8),
      },
      section: {
        marginBottom: mvs(16),
      },
      personalImage:{
        width: '100%',
        height: '50%',
        objectFit: 'scale-down'
      }
});

export default homeViewDetailsStyles;