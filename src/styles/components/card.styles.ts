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
    width: '98@ms',
    height: '95@ms',
    borderRadius: '5@ms',
  },
  flexLayout: {
    flexDirection: 'row',
    gap: '10@ms',
    backgroundColor: Colors.white,
    padding: '10@ms',
    marginBottom: '10@ms',
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
});
