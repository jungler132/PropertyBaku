import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, useEffect } from 'react';
import { AppState } from 'react-native';

import az from './az';
import ru from './ru';
import en from './en';
import tr from './tr';

const i18n = new I18n({
  az,
  ru,
  en,
  tr,
});

// Установка языка по умолчанию
i18n.defaultLocale = 'az';
i18n.locale = 'az';

// Включение fallback
i18n.enableFallback = true;
i18n.fallbackLocale = 'az';

// Создаем контекст для языка
const LanguageContext = createContext();

// Хук для использования языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Провайдер языка
export const LanguageProvider = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState('az');
  const [appState, setAppState] = useState(AppState.currentState);

  // Функция для изменения языка
  const setLanguage = async (language) => {
    try {
      console.log('Setting language to:', language);
      await AsyncStorage.setItem('userLanguage', language);
      console.log('Language saved to AsyncStorage');
      i18n.locale = language;
      console.log('i18n.locale set to:', i18n.locale);
      setCurrentLocale(language);
      console.log('currentLocale set to:', language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  // Функция для получения сохраненного языка
  const getSavedLanguage = async () => {
    try {
      console.log('Getting saved language...');
      const savedLanguage = await AsyncStorage.getItem('userLanguage');
      console.log('Saved language from AsyncStorage:', savedLanguage);
      
      if (savedLanguage) {
        i18n.locale = savedLanguage;
        console.log('i18n.locale set to saved language:', i18n.locale);
        setCurrentLocale(savedLanguage);
        console.log('currentLocale set to saved language:', savedLanguage);
      } else {
        // Если язык не сохранен, используем системную локаль
        const locales = getLocales();
        console.log('System locales:', locales);
        const systemLocale = locales[0].languageCode;
        console.log('System locale:', systemLocale);
        const supportedLocales = ['az', 'ru', 'tr', 'en'];
        
        if (supportedLocales.includes(systemLocale)) {
          i18n.locale = systemLocale;
          console.log('i18n.locale set to system locale:', i18n.locale);
          setCurrentLocale(systemLocale);
          console.log('currentLocale set to system locale:', systemLocale);
          await AsyncStorage.setItem('userLanguage', systemLocale);
          console.log('System locale saved to AsyncStorage');
        }
      }
    } catch (error) {
      console.error('Error getting saved language:', error);
    }
  };

  // Обработчик изменения состояния приложения
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // Приложение вернулось на передний план
        getSavedLanguage();
      }
      setAppState(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [appState]);

  // Инициализация языка при монтировании
  useEffect(() => {
    getSavedLanguage();
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLocale, setLanguage, getSavedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default i18n; 