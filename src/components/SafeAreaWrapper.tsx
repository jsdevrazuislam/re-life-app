import {FC} from 'react';
import {SafeAreaView, Platform, StatusBar, Dimensions} from 'react-native';
import {SafeAreaWrapperProps} from '../types/safeArea';

const SafeAreaWrapper: FC<SafeAreaWrapperProps> = ({
  children,
  bg = '#fff',
  flex = 1,
  ...props
}) => {
  const { height } = Dimensions.get('window');
  return (
    <SafeAreaView
      style={{
        backgroundColor: bg,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height
      }}
      {...props}>
      {children}
    </SafeAreaView>
  );
};

export default SafeAreaWrapper;
