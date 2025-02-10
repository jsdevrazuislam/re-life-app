import {ScaledSheet} from 'react-native-size-matters';
import { Colors } from '../../configs/colors';

export const dropdownStyles = ScaledSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    borderColor: '#EBEDED',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#EBEDED',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    marginBottom:5,
    color:Colors.text
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
