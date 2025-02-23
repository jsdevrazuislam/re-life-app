import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScaledSheet } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "./BackButton";
import Heading from "./ui/Heading";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightIconName?: string;
  onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = true, rightIconName, onRightIconPress }) => {

  return (
    <View style={styles.container}>
      {showBackButton ? (
        <BackButton />
      ) : (
        <View style={styles.leftIcon} />
      )}

      <Heading level={5} weight='Bold' style={styles.title}>{title}</Heading>

      {rightIconName ? (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIcon}>
          <Icon name={rightIconName} size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightIcon} />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftIcon: {
    width: "40@ms",
    alignItems: "flex-start",
  },
  title: {
    textAlign: "center",
    flex: 1,
  },
  rightIcon: {
    width: "40@ms",
    alignItems: "flex-end",
  },
});

export default Header;
