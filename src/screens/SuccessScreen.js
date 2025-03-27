import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from '../translations/i18n';
import { useLanguage } from '../translations/i18n';

const SuccessScreen = ({ navigation, route }) => {
  const { property, mediaFiles } = route.params;
  const { currentLocale } = useLanguage();
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('PropertyDetails', { property });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={['#4CAF50', '#2196F3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <MaterialIcons name="check-circle" size={120} color="white" />
      </Animated.View>

      <Animated.Text
        style={[
          styles.title,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        {i18n.t('success.congratulations')}
      </Animated.Text>

      <Animated.Text
        style={[
          styles.subtitle,
          {
            opacity: opacityAnim,
          },
        ]}
      >
        {i18n.t('success.propertyAdded')}
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    fontFamily: 'Nunito_700Bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
});

export default SuccessScreen; 