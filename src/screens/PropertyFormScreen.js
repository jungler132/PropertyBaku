import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Switch, Image, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const PropertyFormScreen = ({ navigation }) => {
  const [property, setProperty] = useState({
    type: '',
    area: '',
    landArea: '',
    bedrooms: '',
    bathrooms: '',
    hasParking: false,
    hasGarage: false,
  });

  const [mediaFiles, setMediaFiles] = useState([]);
  const [videoRef, setVideoRef] = useState(null);

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Üzr istəyirik, şəkil və video seçmək üçün icazə lazımdır!');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri,
          type: 'image'
        }));
        setMediaFiles(prevFiles => [...prevFiles, ...newImages]);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Şəkil seçərkən xəta baş verdi');
    }
  };

  const pickVideo = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        const newVideos = result.assets.map(asset => ({
          uri: asset.uri,
          type: 'video'
        }));
        setMediaFiles(prevFiles => [...prevFiles, ...newVideos]);
      }
    } catch (error) {
      console.error('Error picking video:', error);
      alert('Video seçərkən xəta baş verdi');
    }
  };

  const removeMedia = (index) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!property.type || !property.area || !property.landArea || !property.bedrooms || !property.bathrooms) {
      Alert.alert('Xəta', 'Zəhmət olmasa bütün məlumatları doldurun');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    navigation.navigate('Success', {
      property,
      mediaFiles,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2196F3']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <MaterialIcons name="add-home" size={40} color="white" />
        <Text style={styles.title}>Əmlak əlavə et</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="house" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ev növü"
            value={property.type}
            onChangeText={(text) => setProperty({ ...property, type: text })}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="square-foot" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sahə (m²)"
            value={property.area}
            onChangeText={(text) => setProperty({ ...property, area: text })}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="landscape" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Torpaq sahəsi (sotka)"
            value={property.landArea}
            onChangeText={(text) => setProperty({ ...property, landArea: text })}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="bed" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Yataq otaqlarının sayı"
            value={property.bedrooms}
            onChangeText={(text) => setProperty({ ...property, bedrooms: text })}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="bathroom" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sanitar qovşaqların sayı"
            value={property.bathrooms}
            onChangeText={(text) => setProperty({ ...property, bathrooms: text })}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <MaterialIcons name="local-parking" size={24} color="#4CAF50" style={styles.switchIcon} />
            <Text style={styles.switchLabel}>Avto dayanacaq</Text>
          </View>
          <Switch
            value={property.hasParking}
            onValueChange={(value) => setProperty({ ...property, hasParking: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={property.hasParking ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabelContainer}>
            <MaterialIcons name="garage" size={24} color="#4CAF50" style={styles.switchIcon} />
            <Text style={styles.switchLabel}>Qaraj</Text>
          </View>
          <Switch
            value={property.hasGarage}
            onValueChange={(value) => setProperty({ ...property, hasGarage: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={property.hasGarage ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        <View style={styles.mediaSection}>
          <Text style={styles.mediaSectionTitle}>Şəkil və video əlavə et</Text>
          
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
              <LinearGradient
                colors={['#4CAF50', '#2196F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mediaButtonGradient}
              >
                <MaterialIcons name="photo-camera" size={24} color="white" />
                <Text style={styles.mediaButtonText}>Şəkil</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
              <LinearGradient
                colors={['#4CAF50', '#2196F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mediaButtonGradient}
              >
                <MaterialIcons name="videocam" size={24} color="white" />
                <Text style={styles.mediaButtonText}>Video</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.mediaGrid}>
            {mediaFiles.map((file, index) => (
              <View key={index} style={styles.mediaItem}>
                {file.type === 'image' ? (
                  <Image source={{ uri: file.uri }} style={styles.mediaPreview} />
                ) : (
                  <Video
                    ref={ref => setVideoRef(ref)}
                    source={{ uri: file.uri }}
                    style={styles.mediaPreview}
                    useNativeControls
                    resizeMode="cover"
                    isLooping
                  />
                )}
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => removeMedia(index)}
                >
                  <MaterialIcons name="close" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#4CAF50', '#2196F3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitButtonGradient}
          >
            <MaterialIcons name="save" size={24} color="white" style={styles.submitButtonIcon} />
            <Text style={styles.submitButtonText}>Yadda saxla</Text>
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
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchIcon: {
    marginRight: 10,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  mediaSection: {
    marginTop: 20,
  },
  mediaSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mediaButton: {
    width: '48%',
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
  mediaButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  mediaButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
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
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  submitButton: {
    marginTop: 20,
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
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  submitButtonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PropertyFormScreen; 