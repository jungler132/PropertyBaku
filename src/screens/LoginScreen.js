import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (login === 'admin' && password === 'admin') {
      setError(false);
      navigation.navigate('PropertyForm');
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <MaterialIcons name="apartment" size={80} color="#4CAF50" />
        <Text style={styles.title}>BakuRentProperty</Text>
        
        <View style={[styles.inputContainer, error && styles.inputError]}>
          <MaterialIcons name="person" size={24} color={error ? "#FF0000" : "#4CAF50"} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="İstifadəçi adı"
            value={login}
            onChangeText={(text) => {
              setLogin(text);
              setError(false);
            }}
            placeholderTextColor="#666"
          />
        </View>

        <View style={[styles.inputContainer, error && styles.inputError]}>
          <MaterialIcons name="lock" size={24} color={error ? "#FF0000" : "#4CAF50"} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Şifrə"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(false);
            }}
            secureTextEntry
            placeholderTextColor="#666"
          />
        </View>

        {error && (
          <Text style={styles.errorText}>Yenidən cəhd edin</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <MaterialIcons name="login" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Daxil ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'white',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#F5F5F5',
  },
  inputError: {
    borderColor: '#FF0000',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen; 