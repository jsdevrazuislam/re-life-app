import {ScaledSheet} from 'react-native-size-matters';
import { Colors } from '../configs/colors';

export const splashStyles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  image:{
    width: '120@ms',
    height:'80@ms',
    objectFit:'fill'
  }
});
