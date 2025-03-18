import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Paragraph from "./ui/Paragraph";
import { Colors } from "../configs/colors";
import AppButton from "./ui/AppButton";
import BackButton from "./BackButton";
import globalStyles from "../styles/global.style";

interface DonationRestrictionModalProps {
  lastDonationDate: string;
  onViewHistory: () => void;
}

const DonationRestrictionModal: React.FC<DonationRestrictionModalProps> = ({
  lastDonationDate,
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
    lastDonation.setDate(lastDonation.getDate() + 7);
    setNextDonationDate(lastDonation.toDateString());

    const currentDate = new Date();
    setIsRestricted(currentDate < lastDonation);
  };

  if (!isRestricted) return null;

  return (
    <>
      <View style={styles.modal}>
        <Paragraph weight='Bold' level='Medium' style={styles.title}>আপনি ইতিমধ্যে এই ব্যক্তিকে দান করেছেন</Paragraph>
        <Paragraph weight='Regular' level='Small' style={styles.subtitle}>
          আপনি আবার {" "}
          <Paragraph weight="Bold" level='Small' style={styles.date}>{nextDonationDate} {" "}</Paragraph>
          তারিখে এই ব্যক্তিকে দান করতে পারবেন।
        </Paragraph>
        <AppButton onPress={onViewHistory} text="অনুদানের ইতিহাস দেখুন" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: 'center',
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
});

export default DonationRestrictionModal;
