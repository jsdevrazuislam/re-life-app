import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import Paragraph from "./ui/Paragraph";
import { Colors } from "../configs/colors";
import AppButton from "./ui/AppButton";

interface DonationRestrictionModalProps {
  lastDonationDate: string;
  visible: boolean;
  onClose: () => void;
  onViewHistory: () => void;
}

const DonationRestrictionModal: React.FC<DonationRestrictionModalProps> = ({
  lastDonationDate,
  visible,
  onClose,
  onViewHistory,
}) => {
  const [isRestricted, setIsRestricted] = useState<boolean>(false);
  const [nextDonationDate, setNextDonationDate] = useState<string>("");

  useFocusEffect(
    useCallback(() => {
      checkRestriction(); 
    }, [])
  );

  useEffect(() => {
    checkRestriction();
  }, []);

  const checkRestriction = () => {
    const lastDonation = new Date(lastDonationDate);
    lastDonation.setMonth(lastDonation.getMonth() + 1);
    setNextDonationDate(lastDonation.toDateString());

    const currentDate = new Date();
    setIsRestricted(currentDate < lastDonation);
  };

  if (!visible || !isRestricted) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <BlurView style={styles.blur} blurType="light" blurAmount={10}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Icon name="x" size={24} color="black" />
          </TouchableOpacity>
          <Paragraph weight='Bold' level='Medium' style={styles.title}>আপনি এই মাসে অনুদান পেয়েছেন</Paragraph>
          <Paragraph weight='Regular' level='Small'  style={styles.subtitle}>
            আপনি আবার {" "}
            <Paragraph weight="Bold" level='Small' style={styles.date}>{nextDonationDate} {" "}</Paragraph>
            তারিখে অনুদান গ্রহণ করতে পারবেন।
          </Paragraph>
          <AppButton onPress={onViewHistory} text="অনুদানের ইতিহাস দেখুন" />
        </View>
      </BlurView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.black,
    textAlign: "center",
    marginBottom: 15,
  },
  date: {
    color: "#d9534f",
  },
  historyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  historyText: {
    color: "white",
  },
});

export default DonationRestrictionModal;
