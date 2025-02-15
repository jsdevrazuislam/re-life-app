import Toast from "react-native-toast-message";

export const showToast = (
  type: "success" | "error" | "info" = "error", 
  message: string,
  duration: number = 1000
) => {
  Toast.show({
    type: type,
    position: 'top', 
    text1: message,
    visibilityTime: duration,
    autoHide: true,
  });
};
