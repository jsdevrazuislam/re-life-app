import { ScaledSheet } from "react-native-size-matters";
import { Colors } from "../../configs/colors";

export const cardStyles = ScaledSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: '10@ms',
    borderRadius: '5@ms',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '200@ms',
    borderRadius: '5@ms',
  },
  flexLayout: {
    gap: '10@ms',
    backgroundColor: Colors.white,
    padding: '10@ms',
    marginBottom: '10@ms',
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
  textContainer: {
    flex: 1, 
  },
  footer_action: {
    marginTop: '10@ms',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    color: Colors.text,
    textTransform:'capitalize'
  },
  viewButton: {
    backgroundColor: Colors.primary,
    padding: 5,
    borderRadius: 5,
    width: 92,
    marginTop: 10
  },
  viewLabel: {
    color: Colors.white,
  },
  locationName: {
    color: Colors.lightGray,
    flexWrap: 'wrap',
  },
  showPeople: {
    color: Colors.primary,
  },
  cardContainer:{
    borderRadius: 8,
    borderWidth:2,
    borderColor: Colors.neutral[200]
  }
});
