import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts, Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';
import { MaterialIcons } from '@expo/vector-icons';
import { PropertyProvider } from './src/context/PropertyContext';
import LoginScreen from './src/screens/LoginScreen';
import PropertyFormScreen from './src/screens/PropertyFormScreen';
import PropertyListScreen from './src/screens/PropertyListScreen';
import PropertyDetailsScreen from './src/screens/PropertyDetailsScreen';
import SuccessScreen from './src/screens/SuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
          tabBarLabel: 'Əmlaklar',
        }}
      />
      <Tab.Screen
        name="AddProperty"
        component={PropertyFormScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle" size={size} color={color} />
          ),
          tabBarLabel: 'Əlavə et',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn(e);
      }
    }
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PropertyProvider>
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
            headerBackTitle: 'Geri',
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
              title: 'Əsas Səhifə',
            }}
          />
          <Stack.Screen 
            name="PropertyDetails" 
            component={PropertyDetailsScreen}
            options={{
              title: 'Əmlak Məlumatları',
            }}
          />
          <Stack.Screen 
            name="Success" 
            component={SuccessScreen}
            options={{
              headerBackVisible: false,
              title: 'Uğurlu',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PropertyProvider>
  );
}
