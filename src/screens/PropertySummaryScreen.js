import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PropertySummaryScreen = ({ route, navigation }) => {
  const { property, mediaFiles } = route.params;

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
            <MaterialIcons name="local-parking" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Avto dayanacaq:</Text>
            <Text style={styles.infoValue}>{property.hasParking ? 'Var' : 'Yox'}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="garage" size={24} color="#4CAF50" />
            <Text style={styles.infoLabel}>Qaraj:</Text>
            <Text style={styles.infoValue}>{property.hasGarage ? 'Var' : 'Yox'}</Text>
          </View>
        </View>

        {mediaFiles.length > 0 && (
          <View style={styles.mediaSection}>
            <Text style={styles.mediaSectionTitle}>Şəkillər və Videolar</Text>
            <View style={styles.mediaGrid}>
              {mediaFiles.map((item, index) => renderMediaItem(item, index))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('PropertyForm')}
        >
          <LinearGradient
            colors={['#4CAF50', '#2196F3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Yeni Əmlak Əlavə Et</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    padding: 20,
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
    shadowOpacity: 0.25,
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
  },
  infoValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'right',
  },
  mediaSection: {
    marginBottom: 20,
  },
  mediaSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mediaItem: {
    width: mediaItemSize,
    height: mediaItemSize,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mediaPreview: {
    width: '100%',
    height: '100%',
  },
  button: {
    marginVertical: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PropertySummaryScreen; 