import {FC} from 'react';
import {SafeAreaView, Platform, StatusBar, Dimensions} from 'react-native';
import {SafeAreaWrapperProps} from '../types/safeArea';
import { Colors } from '../configs/colors';

const SafeAreaWrapper: FC<SafeAreaWrapperProps> = ({
  children,
  bg = Colors.white,
  flex = 1,
  ...props
}) => {
  const { height } = Dimensions.get('window');
  return (
    <SafeAreaView
      style={{
        backgroundColor: bg,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        height,
        flex
      }}
      {...props}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
