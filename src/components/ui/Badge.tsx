import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import Paragraph from "./Paragraph";
import { Colors } from "../../configs/colors";

const Badge: FC<BadgeProps> = ({ label, variant = "gray" }) => {
    const variantStyles = {
        green: styles.green,
        yellow: styles.yellow,
        gray: styles.gray,
        red: styles.red,
    };

    return (
        <View style={[styles.badge, variantStyles[variant] || styles.gray]}>
            <Paragraph weight='SemiBold' level='Small' style={styles.text}>{label}</Paragraph>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingVertical: 2,
        paddingHorizontal: 10,
        borderRadius: 12,
        alignSelf: "flex-start",
    },
    text: {
        color: Colors.text,
        textTransform:'capitalize'
    },
    green: {
        backgroundColor: "#4CAF50",
    },
    yellow: {
        backgroundColor: "#FFC107",
    },
    gray: {
        backgroundColor: "#e6e6e6"
    },
    red: {
        backgroundColor: "#F44336",
    },
});

export default Badge;
