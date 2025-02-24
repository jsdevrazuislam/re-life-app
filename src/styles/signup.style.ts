import {Colors} from '../configs/colors';
import { ScaledSheet } from 'react-native-size-matters';

const signupStyles = ScaledSheet.create({
  logo: {
    width: '60@ms',
    height: '44@ms',
    objectFit:'fill'
  },
  form:{
    marginTop: '20@ms'
  },
  appButton:{
    marginTop: '20@ms'
  },
  bottomCenter:{
    justifyContent:'center',
    alignItems:'center',
    marginTop: '10@ms',
    flexDirection:'row'
  },
  bottomTextFirst:{
    fontFamily: 'Quicksand-Regular',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  bottomTextSecond:{
    fontFamily: 'Quicksand-Bold',
    fontSize: '14@ms',
    lineHeight: '20@ms',
    letterSpacing: '0@ms',
    fontWeight: '500',
  },
  deleteButton:{
    backgroundColor: Colors.danger,
    width: '30@ms',
    height: '30@ms',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: '50@ms',
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
});

export default signupStyles;
