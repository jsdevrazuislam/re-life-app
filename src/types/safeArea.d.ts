import React from "react";
import { ViewProps } from "react-native";

export interface SafeAreaWrapperProps extends ViewProps{
    children:React.ReactNode,
    bg?:string,
    flex?:number
}