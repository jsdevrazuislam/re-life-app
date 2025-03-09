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
    marginTop: '10@ms',
    width: '100%',
    paddingVertical: 12,
    backgroundColor: Colors.primary,
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
  }
});

export default homeStyles;