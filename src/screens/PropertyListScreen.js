import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProperty } from '../context/PropertyContext';
import i18n from '../translations/i18n';
import { useLanguage } from '../translations/i18n';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

const PropertyListScreen = ({ navigation }) => {
  const { properties } = useProperty();
  const { currentLocale } = useLanguage();

  const renderPropertyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => navigation.navigate('PropertyDetails', { property: item })}
    >
      <Image 
        source={{ uri: item.mediaFiles?.[0]?.uri || 'https://picsum.photos/800/600' }} 
        style={styles.propertyImage} 
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.gradient}
      >
        <Text style={styles.propertyType}>{i18n.t(`propertyTypes.${item.type}`)}</Text>
        <Text style={styles.propertyArea}>{item.area} {i18n.t('common.squareMeters')}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>{i18n.t('home.myProperties')}</Text>
      </LinearGradient>

      {properties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="home" size={80} color="#ccc" />
          <Text style={styles.emptyText}>{i18n.t('home.noProperties')}</Text>
          <Text style={styles.emptySubtext}>{i18n.t('home.addPropertyHint')}</Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          renderItem={renderPropertyItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
  },
  listContainer: {
    padding: 20,
  },
  propertyCard: {
    width: ITEM_WIDTH,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: ITEM_WIDTH,
  },
  propertyInfo: {
    padding: 10,
  },
  propertyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito_700Bold',
  },
  propertyArea: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    fontFamily: 'Nunito_400Regular',
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
    fontFamily: 'Nunito_700Bold',
  },
  propertyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
    fontFamily: 'Nunito_400Regular',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Nunito_700Bold',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 10,
  },
});

export default PropertyListScreen; 