import {Colors} from '../configs/colors';
import {Fonts} from '../configs/fonts';
import { ScaledSheet } from 'react-native-size-matters';

const signupStyles = ScaledSheet.create({
  logo: {
    width: '46@ms',
    height: '44@ms',
    objectFit:'cover'
  },
  container:{
    justifyContent: 'flex-end',
    alignItems:'flex-end'
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
    fontFamily: 'Quicksand-Medium',
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
  }
});

export default signupStyles;
