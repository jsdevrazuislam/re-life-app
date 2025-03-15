import Toast from 'react-native-toast-message';
import { Text, View, StyleSheet } from 'react-native';
import Paragraph from '../components/ui/Paragraph';

export const showToast = (
  type: 'success' | 'error' | 'info' = 'error', 
  message: string,
  duration: number = 2000
) => {
  Toast.show({
    type: type,
    position: 'top', 
    text1: message,
    visibilityTime: duration,
    autoHide: true,
    topOffset: 50,
    props: {
      customToast: (
        <View style={styles.toastContainer}>
          <Paragraph level='Small' style={styles.toastText}>{message}</Paragraph>
        </View>
      ),
    }
  });
};

const styles = StyleSheet.create({
  toastContainer: {
    padding: 10,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  toastText: {
    color: 'white', 
    flexWrap: 'wrap', 
    fontSize: 14,
    lineHeight: 18, 
  },
});
