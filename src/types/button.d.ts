import { ViewStyle } from "react-native";

export interface AppButtonProps{
    variant?: 'primary' | 'outline';
    text: string;
    style?:ViewStyle,
    disabled?:boolean,
    onPress?:(event:GestureResponderEvent) => void
    loading?:boolean
  };
  

  