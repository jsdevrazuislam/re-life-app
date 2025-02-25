import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ScaledSheet, scale } from "react-native-size-matters";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from "../configs/colors";
import Paragraph from "../components/ui/Paragraph";
import Heading from "../components/ui/Heading";

const BlockedUserScreen = () => {
    const handleContactSupport = () => {
        // Handle support contact (open email, chat, etc.)
        console.log("Contacting Support...");
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="block" size={scale(80)} color="red" />
            <Heading level={5} weight='Bold' style={styles.title}>You are Blocked</Heading>
            <Paragraph level='Small' style={styles.message}>
                Your account has been blocked by the admin. If you think this is a mistake, please contact our support team.
            </Paragraph>
            <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
                <Text style={styles.buttonText}>Contact Support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.white,
        paddingHorizontal: "20@s",
    },
    title: {
        color: Colors.danger,
        marginTop: "15@s",
    },
    message: {
        textAlign: "center",
        color: "#555",
        marginTop: "10@s",
        paddingHorizontal: "10@s",
    },
    button: {
        marginTop: "20@s",
        backgroundColor: Colors.danger,
        paddingVertical: "10@s",
        paddingHorizontal: "25@s",
        borderRadius: "8@s",
    },
    buttonText: {
        color: "#fff",
        fontSize: "14@s",
        fontWeight: "bold",
    },
});

export default BlockedUserScreen;
