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
        tabBarActiveTintColor: '#D55448',
        tabBarInactiveTintColor: '#896E69',
        tabBarStyle: {
          backgroundColor: '#F9F9FF',
          borderTopWidth: 1,
          borderTopColor: '#FFA577',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito_700Bold',
          fontSize: 12,
          marginBottom: 5,
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F9F9FF' }}>
      <ActivityIndicator size="large" color="#D55448" />
      <Text style={{ marginTop: 20, color: '#896E69', fontFamily: 'Nunito_700Bold' }}>
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
            backgroundColor: '#D55448',
            elevation: 0,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            height: 110,
          },
          headerTintColor: '#F9F9FF',
          headerTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            fontSize: 20,
          },
          headerBackTitle: i18n.t('common.back'),
          headerBackTitleStyle: {
            fontFamily: 'Nunito_700Bold',
            color: '#F9F9FF',
          },
          cardStyle: {
            backgroundColor: '#F9F9FF',
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
