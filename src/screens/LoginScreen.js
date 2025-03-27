import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import i18n from '../translations/i18n';
import Logo from '../components/Logo';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../translations/i18n';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentLocale } = useLanguage();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigation.replace('MainTabs');
    } else {
      setError(i18n.t('common.errorLogin'));
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#363237', '#2D4262']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoContainer}>
          <Logo size="large" />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#896E69" />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('common.email')}
              placeholderTextColor="#896E69"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#896E69" />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('common.password')}
              placeholderTextColor="#896E69"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#73605B', '#D09683']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButtonGradient}
            >
              <Text style={styles.loginButtonText}>{i18n.t('common.login')}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.languageSelectorContainer}>
            <LanguageSelector />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FF',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderColor: '#FFA577',
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    color: '#896E69',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  loginButtonGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loginButtonText: {
    color: '#F9F9FF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Nunito_700Bold',
  },
  errorText: {
    color: '#D55448',
    fontSize: 14,
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    marginTop: 10,
  },
  languageSelectorContainer: {
    marginTop: 20,
    width: '100%',
  },
});

export default LoginScreen; 