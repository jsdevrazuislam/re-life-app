import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTranslationStore } from '../hooks/useTranslationStore';

const LanguageToggle = () => {
  const { setLanguage, language } = useTranslationStore();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Language: {language}</Text>
      <View style={styles.buttonContainer}>
        <Button title="English" onPress={() => setLanguage('en')} />
        <Button title="বাংলা" onPress={() => setLanguage('bn')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
});

export default LanguageToggle;
