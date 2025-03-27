import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

const PropertySummaryScreen = ({ route, navigation }) => {
  const { property, mediaFiles } = route.params;

  const renderFeatureRow = (icon, label, value, isRequired = false) => {
    if (!value && !isRequired) return null;
    return (
      <View style={styles.infoRow}>
        <FontAwesome5 name={icon} size={24} color="#4CAF50" />
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value ? 'Var' : 'Yox'}</Text>
      </View>
    );
  };

  const renderMediaItem = (item, index) => {
    if (item.type === 'image') {
      return (
        <View key={index} style={styles.mediaItem}>
          <Image source={{ uri: item.uri }} style={styles.mediaPreview} />
        </View>
      );
    } else {
      return (
        <View key={index} style={styles.mediaItem}>
          <Video
            source={{ uri: item.uri }}
            style={styles.mediaPreview}
            useNativeControls
            resizeMode="cover"
            isLooping
          />
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Əmlak Məlumatları</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Sahibkar məlumatları</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="person" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Sahibkar:</Text>
            <Text style={styles.infoValue}>{property.owner}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Telefon:</Text>
            <Text style={styles.infoValue}>{property.phoneCode}{property.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Əsas məlumatlar</Text>

          <View style={styles.infoRow}>
            <MaterialIcons name="home" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Ev növü:</Text>
            <Text style={styles.infoValue}>{property.type}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="square-foot" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Sahə:</Text>
            <Text style={styles.infoValue}>{property.area} m²</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="landscape" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Torpaq sahəsi:</Text>
            <Text style={styles.infoValue}>{property.landArea} sot</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="bed" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Yataq otaqları:</Text>
            <Text style={styles.infoValue}>{property.bedrooms}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="bathroom" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Sanitar qovşaqlar:</Text>
            <Text style={styles.infoValue}>{property.bathrooms}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="garage" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Qaraj:</Text>
            <Text style={styles.infoValue}>{property.hasGarage ? 'Var' : 'Yox'}</Text>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Əlavə imkanlar</Text>

          {renderFeatureRow('parking', 'Avto dayanacaq', property.hasParking)}
          {renderFeatureRow('swimming-pool', 'Hovuz', property.hasPool)}
          {renderFeatureRow('child', 'Uşaq otağı', property.hasKidsRoom)}
          {renderFeatureRow('tree', 'Qış bağı', property.hasWinterGarden)}
          {renderFeatureRow('water', 'Bio hovuz', property.hasBioPool)}
          {renderFeatureRow('futbol', 'Futbol meydançası', property.hasFootballField)}
          {renderFeatureRow('basketball-ball', 'Basketbol meydançası', property.hasBasketballCourt)}
          {renderFeatureRow('table-tennis', 'Tennis kortu', property.hasTennisCourt)}
          {renderFeatureRow('dumbbell', 'Trenajor zalı', property.hasGym)}
          {renderFeatureRow('hot-tub', 'Sauna', property.hasSauna)}
          {renderFeatureRow('bath', 'Jakuzi', property.hasJacuzzi)}
          {renderFeatureRow('wine-bottle', 'Şərab zirzəmisi', property.hasWineCellar)}
        </View>

        {mediaFiles.length > 0 && (
          <View style={styles.mediaSection}>
            <Text style={styles.sectionTitle}>Şəkillər və Videolar</Text>
            <View style={styles.mediaGrid}>
              {mediaFiles.map((item, index) => renderMediaItem(item, index))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');
const mediaItemSize = (width - 60) / 2;

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
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    fontFamily: 'Nunito_700Bold',
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
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mediaItem: {
    width: mediaItemSize,
    height: mediaItemSize,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
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
});

export default PropertySummaryScreen; 