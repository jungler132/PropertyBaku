import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';
import { useProperty } from '../context/PropertyContext';
import i18n from '../translations/i18n';
import { useLanguage } from '../translations/i18n';

const { width } = Dimensions.get('window');

const PropertyDetailsScreen = ({ route, navigation }) => {
  const { property } = route.params;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { removeProperty } = useProperty();
  const { currentLocale } = useLanguage();

  const handleDelete = () => {
    removeProperty(property.id);
    navigation.goBack();
  };

  const renderFeatureRow = (icon, label, value, isRequired = false) => {
    if (!value && !isRequired) return null;
    return (
      <View style={styles.infoRow}>
        <FontAwesome5 name={icon} size={24} color="#4CAF50" />
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value ? i18n.t('common.yes') : i18n.t('common.no')}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: property.mediaFiles?.[0]?.uri || 'https://picsum.photos/800/600' }} 
          style={styles.mainImage} 
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        >
          <Text style={styles.imageTitle}>{property.type}</Text>
          <Text style={styles.imageSubtitle}>{property.location}</Text>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{property.price}</Text>
          <Text style={styles.area}>{property.area} {i18n.t('common.squareMeters')}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>{i18n.t('propertyDetails.mainInfo')}</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="location-city" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyForm.city')}:</Text>
            <Text style={styles.infoValue}>{property.city}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="map" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyForm.region')}:</Text>
            <Text style={styles.infoValue}>{property.region}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="home" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyForm.address')}:</Text>
            <Text style={styles.infoValue}>{property.address}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="bed" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyDetails.bedrooms')}:</Text>
            <Text style={styles.infoValue}>{property.bedrooms}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="bathroom" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyDetails.bathrooms')}:</Text>
            <Text style={styles.infoValue}>{property.bathrooms}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="garage" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyDetails.garage')}:</Text>
            <Text style={styles.infoValue}>{property.hasGarage ? i18n.t('common.yes') : i18n.t('common.no')}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>{i18n.t('propertyDetails.additionalFeatures')}</Text>

          {renderFeatureRow('swimming-pool', i18n.t('propertyDetails.pool'), property.hasPool)}
          {renderFeatureRow('child', i18n.t('propertyDetails.kidsRoom'), property.hasKidsRoom)}
          {renderFeatureRow('tree', i18n.t('propertyDetails.winterGarden'), property.hasWinterGarden)}
          {renderFeatureRow('water', i18n.t('propertyDetails.bioPool'), property.hasBioPool)}
          {renderFeatureRow('futbol', i18n.t('propertyDetails.footballField'), property.hasFootballField)}
          {renderFeatureRow('basketball-ball', i18n.t('propertyDetails.basketballCourt'), property.hasBasketballCourt)}
          {renderFeatureRow('table-tennis', i18n.t('propertyDetails.tennisCourt'), property.hasTennisCourt)}
          {renderFeatureRow('dumbbell', i18n.t('propertyDetails.gym'), property.hasGym)}
          {renderFeatureRow('hot-tub', i18n.t('propertyDetails.sauna'), property.hasSauna)}
          {renderFeatureRow('bath', i18n.t('propertyDetails.jacuzzi'), property.hasJacuzzi)}
          {renderFeatureRow('wine-bottle', i18n.t('propertyDetails.wineCellar'), property.hasWineCellar)}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>{i18n.t('propertyDetails.ownerInfo')}</Text>
          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyDetails.fullName')}:</Text>
            <Text style={styles.infoValue}>{property.ownerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>{i18n.t('propertyDetails.phone')}:</Text>
            <Text style={styles.infoValue}>{property.ownerPhone}</Text>
          </View>
        </View>

        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>{i18n.t('propertyDetails.media')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.mediaScroll}
          >
            {property.mediaFiles?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.mediaItem}
                onPress={() => setActiveImageIndex(index)}
              >
                {item.type === 'image' ? (
                  <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
                ) : (
                  <Video
                    source={{ uri: item.uri }}
                    style={styles.mediaPreview}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color="white" />
          <Text style={styles.deleteButtonText}>{i18n.t('propertyDetails.deleteProperty')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: 20,
    justifyContent: 'flex-end',
  },
  imageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Nunito_700Bold',
  },
  imageSubtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    fontFamily: 'Nunito_400Regular',
  },
  content: {
    padding: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    fontFamily: 'Nunito_700Bold',
    alignSelf:'center'
  },
  area: {
    fontSize: 18,
    color: '#666',
    fontFamily: 'Nunito_400Regular',
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Nunito_700Bold',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    fontFamily: 'Nunito_400Regular',
  },
  infoValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
    fontFamily: 'Nunito_700Bold',
  },
  mediaSection: {
    marginBottom: 20,
  },
  mediaScroll: {
    flexDirection: 'row',
  },
  mediaItem: {
    width: 200,
    height: 150,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'Nunito_700Bold',
  },
});

export default PropertyDetailsScreen; 