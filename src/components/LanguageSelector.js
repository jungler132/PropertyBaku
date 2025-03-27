import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../translations/i18n';

const LanguageSelector = () => {
  const { currentLocale, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'az', label: 'AZ' },
    { code: 'ru', label: 'RU' },
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <View style={styles.container}>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLocale === lang.code && styles.activeButton
          ]}
          onPress={() => setLanguage(lang.code)}
        >
          <Text style={[
            styles.languageText,
            currentLocale === lang.code && styles.activeText
          ]}>
            {lang.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  languageButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeButton: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  activeText: {
    color: '#fff',
  },
});

export default LanguageSelector; 