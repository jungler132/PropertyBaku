import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../translations/i18n';
import LanguageSelector from '../components/LanguageSelector';
import { useLanguage } from '../translations/i18n';

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
        colors={['#4CAF50', '#2196F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <MaterialIcons name="home" size={80} color="white" />
          <Text style={styles.title}>PropertyBaku</Text>

          <LanguageSelector />

          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#4CAF50" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('common.email')}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#666"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#4CAF50" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={i18n.t('common.password')}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#666"
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <LinearGradient
              colors={['#4CAF50', '#2196F3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>{i18n.t('common.login')}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    fontFamily: 'Nunito_700Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito_400Regular',
  },
  button: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito_700Bold',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
});

export default LoginScreen; 