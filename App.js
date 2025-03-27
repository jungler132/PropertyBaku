import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, ActivityIndicator } from 'react-native';
import { PropertyProvider } from './src/context/PropertyContext';
import { LanguageProvider, useLanguage } from './src/translations/i18n';
import LoginScreen from './src/screens/LoginScreen';
import PropertyFormScreen from './src/screens/PropertyFormScreen';
import PropertyListScreen from './src/screens/PropertyListScreen';
import PropertyDetailsScreen from './src/screens/PropertyDetailsScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import i18n from './src/translations/i18n';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { currentLocale } = useLanguage();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_400Regular',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Properties"
        component={PropertyListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarLabel: i18n.t('bottomTabs.properties'),
        }}
      />
      <Tab.Screen
        name="AddProperty"
        component={PropertyFormScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: i18n.t('bottomTabs.add'),
        }}
      />
    </Tab.Navigator>
  );
};

const LoadingScreen = () => {
  const { currentLocale } = useLanguage();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={{ marginTop: 20, color: '#666', fontFamily: 'Nunito_400Regular' }}>
        {i18n.t('common.loading')}
      </Text>
    </View>
  );
};

const AppContent = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);
  const { getSavedLanguage } = useLanguage();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await getSavedLanguage();
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
          setIsReady(true);
        }
      } catch (e) {
        console.warn(e);
        setError(e.message);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text style={{ color: '#FF3B30', fontFamily: 'Nunito_400Regular', textAlign: 'center', padding: 20 }}>
          {i18n.t('common.error')}
        </Text>
      </View>
    );
  }

  if (!isReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={({ route }) => ({
          headerShown: route.name !== 'Login',
          headerStyle: {
            backgroundColor: '#4CAF50',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
          },
          headerBackTitle: i18n.t('common.back'),
          headerBackTitleStyle: {
            fontFamily: 'Nunito_400Regular',
          },
        })}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{
            title: i18n.t('common.mainPage'),
          }}
        />
        <Stack.Screen 
          name="PropertyDetails" 
          component={PropertyDetailsScreen}
          options={{
            title: i18n.t('common.propertyDetails'),
          }}
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{
            headerBackVisible: false,
            title: i18n.t('common.success'),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <PropertyProvider>
        <AppContent />
      </PropertyProvider>
    </LanguageProvider>
  );
}
