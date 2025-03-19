import React from "react";
import { View, ActivityIndicator, Modal } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ visible, message = "আমরা আপনার তথ্যটি অনুসন্ধান করছি, দয়া করে কিছু সময় অপেক্ষা করুন।" }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator size="large" color="white" style={styles.loader} />
        </View>
      </View>
    </Modal>
  );
};

const styles = ScaledSheet.create({
  overlay: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000000,
  },
  container: {
    // backgroundColor: Colors.black,
    padding: "20@ms",
    borderRadius: "10@ms",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    marginVertical: "10@ms",
  },
  message: {
    color: "white",
    fontSize: "16@ms",
    textAlign: "center",
  },
});

export default LoadingOverlay;
