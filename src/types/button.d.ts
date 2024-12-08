import { ViewStyle } from "react-native";

export interface AppButtonProps{
    variant?: 'primary' | 'outline';
    text: string;
    style?:ViewStyle,
    onPress?:(event:GestureResponderEvent) => void
  };
  

  