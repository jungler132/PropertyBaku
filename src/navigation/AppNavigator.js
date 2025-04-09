import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import PropertyFormScreen from '../screens/PropertyFormScreen';
import PropertySummaryScreen from '../screens/PropertySummaryScreen';
import SuccessScreen from '../screens/SuccessScreen';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../translations/i18n';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackground: () => (
            <LinearGradient
              colors={['#4CAF50', '#2196F3']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />
          ),
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: i18n.t('navigation.login'),
          }}
        />
        <Stack.Screen
          name="PropertyForm"
          component={PropertyFormScreen}
          options={{
            title: i18n.t('navigation.addProperty'),
          }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PropertySummary"
          component={PropertySummaryScreen}
          options={{
            title: i18n.t('navigation.propertyDetails'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 