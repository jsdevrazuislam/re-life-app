import { ms, mvs, ScaledSheet } from "react-native-size-matters";
import { Colors } from "../configs/colors";

const homeStyles = ScaledSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10@ms'
  },
  button: {
    marginTop: '5@ms',
    width: '100%',
    paddingVertical: 12,
    backgroundColor: Colors.black,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText:{
    textAlign:'center',
    marginLeft: '5@ms',
    color: Colors.white
    
  },
  viewArea: {
    marginTop: '30@ms',
  },
  filterMargin: {
    marginTop: '2@ms'
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: ms(8),
    marginTop: mvs(20),
    marginBottom: mvs(8),
    paddingHorizontal: ms(10)
  },
  input:{
    flex: 1,
    color: Colors.text,
  },
  skeletonText: {
    width: '100%',
    height: 12,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 6,
  },
  skeletonButton: {
    width: 80,
    height: 25,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginTop: 10,
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
  
});

export default homeStyles;