import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import DatePicker from "react-native-date-picker";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../configs/colors";
import { useTranslation } from "../hooks/useTranslation";

interface CustomDatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  style?: StyleProp<ViewStyle>

}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange, error, style }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation()

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.inputContainer, error ? styles.errorBorder : null]}
      >
        <TextInput
          style={styles.input}
          value={value ? value.toLocaleDateString() : ""}
          editable={false}
          placeholder={t('rehabilitation.startDate.placeholder')}
          placeholderTextColor={Colors.neutral[400]}
        />
        <Icon name="calendar-today" size={24} color={Colors.neutral[300]} />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <DatePicker
        modal
        open={open}
        date={value || new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => setOpen(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: Colors.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    color: Colors.black,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomDatePicker;