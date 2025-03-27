import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Logo = ({ size = 'medium', style }) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return width * 0.2;
      case 'large':
        return width * 0.35;
      case 'medium':
      default:
        return width * 0.3;
    }
  };

  const logoSize = getSize();

  return (
    <Image
      source={require('../../assets/logo.png')}
      style={[
        styles.logo,
        {
          width: logoSize,
          height: logoSize,
          borderRadius: logoSize / 2,
          transform: [{ scale: 0.9 }],
        },
        style,
      ]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    backgroundColor: '#F9F9FF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default Logo; 