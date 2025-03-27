import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Switch, Image, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';

const PropertyFormScreen = () => {
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

  const handleSubmit = () => {
    console.log('Property data:', property);
    console.log('Media files:', mediaFiles);
    // Здесь будет логика отправки данных
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <MaterialIcons name="add-home" size={40} color="#2196F3" />
        <Text style={styles.title}>Əmlak əlavə et</Text>

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
            thumbColor={property.hasParking ? '#4CAF50' : '#f4ddb2'}
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
            thumbColor={property.hasGarage ? '#4CAF50' : '#f4ddb2'}
          />
        </View>

        <View style={styles.mediaSection}>
          <Text style={styles.mediaTitle}>Şəkil və video əlavə et</Text>
          
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
              <Text style={styles.mediaButtonText}>Şəkil</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
              <MaterialIcons name="videocam" size={24} color="white" />
              <Text style={styles.mediaButtonText}>Video</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <MaterialIcons name="save" size={24} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Yadda saxla</Text>
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
    backgroundColor: '#E3F2FD',
  },
  formContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#4CAF50',
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
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
    borderWidth: 1,
    borderColor: '#4CAF50',
    width: '100%',
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
    width: '100%',
    marginBottom: 20,
  },
  mediaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  mediaButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
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
    borderRadius: 8,
    overflow: 'hidden',
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
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PropertyFormScreen; 