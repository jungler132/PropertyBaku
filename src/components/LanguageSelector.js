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
            currentLocale === lang.code && styles.activeLanguageButton,
          ]}
          onPress={() => setLanguage(lang.code)}
        >
          <Text
            style={[
              styles.languageText,
              currentLocale === lang.code && styles.activeLanguageText,
            ]}
          >
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
    backgroundColor: '#F9F9FF',
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  languageButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeLanguageButton: {
    backgroundColor: '#D55448',
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
    color: '#896E69',
  },
  activeLanguageText: {
    color: '#F9F9FF',
    fontFamily: 'Nunito_700Bold',
  },
});

export default LanguageSelector; 