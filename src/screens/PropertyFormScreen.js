import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Switch, Image, Dimensions, Alert, Modal } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useProperty } from '../context/PropertyContext';

const COUNTRY_CODES = [
  { code: '+994', country: 'AZ' },
  { code: '+7', country: 'RU' },
  { code: '+90', country: 'TR' },
  { code: '+995', country: 'GE' },
  { code: '+374', country: 'AM' },
  { code: '+993', country: 'TM' },
  { code: '+998', country: 'UZ' },
  { code: '+996', country: 'KG' },
  { code: '+992', country: 'TJ' },
  { code: '+7', country: 'KZ' },
];

const PropertyFormScreen = ({ navigation }) => {
  const { addProperty } = useProperty();
  const [property, setProperty] = useState({
    owner: '',
    phoneCode: '+994',
    phoneNumber: '',
    type: '',
    area: '',
    landArea: '',
    bedrooms: '',
    bathrooms: '',
    hasGarage: false,
    hasParking: false,
    hasPool: false,
    hasKidsRoom: false,
    hasWinterGarden: false,
    hasBioPool: false,
    hasFootballField: false,
    hasBasketballCourt: false,
    hasTennisCourt: false,
    hasGym: false,
    hasSauna: false,
    hasJacuzzi: false,
    hasWineCellar: false,
  });

  const [showCountryPicker, setShowCountryPicker] = useState(false);
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
    if (!property.owner || !property.phoneNumber || !property.type || !property.area || !property.landArea || !property.bedrooms || !property.bathrooms || !property.hasGarage || mediaFiles.length === 0) {
      Alert.alert('Xəta', 'Zəhmət olmasa bütün vacib məlumatları doldurun və ən azı bir şəkil əlavə edin');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const propertyData = {
        ...property,
        mediaFiles,
        ownerName: property.owner,
        ownerPhone: `${property.phoneCode}${property.phoneNumber}`,
      };
      
      addProperty(propertyData);
      navigation.navigate('Success', { property: propertyData, mediaFiles });
    }
  };

  const renderFeatureSwitch = (icon, label, value, field) => (
    <View style={styles.switchContainer}>
      <View style={styles.switchLabelContainer}>
        <FontAwesome5 name={icon} size={24} color="#4CAF50" style={styles.switchIcon} />
        <Text style={styles.switchLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(newValue) => setProperty({ ...property, [field]: newValue })}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#4CAF50' : '#f4f3f4'}
      />
    </View>
  );

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
        <Text style={styles.sectionTitle}>Sahibkar məlumatları *</Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sahibkar *"
            value={property.owner}
            onChangeText={(text) => setProperty({ ...property, owner: text })}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.phoneContainer}>
          <TouchableOpacity 
            style={styles.phoneCodeButton}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.phoneCodeText}>{property.phoneCode}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#4CAF50" />
          </TouchableOpacity>
          <TextInput
            style={styles.phoneInput}
            placeholder="Telefon nömrəsi *"
            value={property.phoneNumber}
            onChangeText={(text) => setProperty({ ...property, phoneNumber: text })}
            keyboardType="phone-pad"
            placeholderTextColor="#666"
            maxLength={10}
          />
        </View>

        <Text style={styles.sectionTitle}>Əsas məlumatlar *</Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="house" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Ev növü *"
            value={property.type}
            onChangeText={(text) => setProperty({ ...property, type: text })}
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="square-foot" size={24} color="#4CAF50" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Sahə (m²) *"
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
            placeholder="Torpaq sahəsi (sotka) *"
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
            placeholder="Yataq otaqlarının sayı *"
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
            placeholder="Sanitar qovşaqların sayı *"
            value={property.bathrooms}
            onChangeText={(text) => setProperty({ ...property, bathrooms: text })}
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </View>

        <View style={[styles.switchContainer, styles.requiredSwitch]}>
          <View style={styles.switchLabelContainer}>
            <MaterialIcons name="garage" size={24} color="#4CAF50" style={styles.switchIcon} />
            <Text style={styles.switchLabel}>Qaraj *</Text>
          </View>
          <Switch
            value={property.hasGarage}
            onValueChange={(value) => setProperty({ ...property, hasGarage: value })}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={property.hasGarage ? '#4CAF50' : '#f4f3f4'}
          />
        </View>

        <Text style={styles.sectionTitle}>Əlavə imkanlar</Text>

        {renderFeatureSwitch('parking', 'Avto dayanacaq', property.hasParking, 'hasParking')}
        {renderFeatureSwitch('swimming-pool', 'Hovuz', property.hasPool, 'hasPool')}
        {renderFeatureSwitch('child', 'Uşaq otağı', property.hasKidsRoom, 'hasKidsRoom')}
        {renderFeatureSwitch('tree', 'Qış bağı', property.hasWinterGarden, 'hasWinterGarden')}
        {renderFeatureSwitch('water', 'Bio hovuz', property.hasBioPool, 'hasBioPool')}
        {renderFeatureSwitch('futbol', 'Futbol meydançası', property.hasFootballField, 'hasFootballField')}
        {renderFeatureSwitch('basketball-ball', 'Basketbol meydançası', property.hasBasketballCourt, 'hasBasketballCourt')}
        {renderFeatureSwitch('table-tennis', 'Tennis kortu', property.hasTennisCourt, 'hasTennisCourt')}
        {renderFeatureSwitch('dumbbell', 'Trenajor zalı', property.hasGym, 'hasGym')}
        {renderFeatureSwitch('hot-tub', 'Sauna', property.hasSauna, 'hasSauna')}
        {renderFeatureSwitch('bath', 'Jakuzi', property.hasJacuzzi, 'hasJacuzzi')}
        {renderFeatureSwitch('wine-bottle', 'Şərab zirzəmisi', property.hasWineCellar, 'hasWineCellar')}

        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>Şəkil və video</Text>
          <Text style={styles.mediaNote}>* Minimum bir şəkil əlavə etmək vacibdir</Text>
          
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
              <LinearGradient
                colors={['#4CAF50', '#2196F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mediaButtonGradient}
              >
                <MaterialIcons name="photo-camera" size={24} color="white" />
                <Text style={styles.mediaButtonText}>Şəkil *</Text>
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

        <Modal
          visible={showCountryPicker}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Ölkə kodu seçin</Text>
                <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                  <MaterialIcons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {COUNTRY_CODES.map((country, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.countryItem}
                    onPress={() => {
                      setProperty({ ...property, phoneCode: country.code });
                      setShowCountryPicker(false);
                    }}
                  >
                    <Text style={styles.countryCode}>{country.code}</Text>
                    <Text style={styles.countryName}>{country.country}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    fontFamily: 'Nunito_700Bold',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 20,
    fontFamily: 'Nunito_700Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
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
    fontFamily: 'Nunito_400Regular',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  requiredSwitch: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
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
    fontFamily: 'Nunito_400Regular',
  },
  mediaSection: {
    marginTop: 20,
  },
  mediaNote: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
    fontFamily: 'Nunito_400Regular',
  },
  mediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  mediaButton: {
    width: '48%',
    borderRadius: 15,
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
    fontFamily: 'Nunito_700Bold',
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
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    padding: 5,
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 15,
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
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  submitButtonIcon: {
    marginRight: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito_700Bold',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  phoneCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  phoneCodeText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginRight: 5,
    fontFamily: 'Nunito_700Bold',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontFamily: 'Nunito_400Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    fontFamily: 'Nunito_700Bold',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  countryCode: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    width: 80,
    fontFamily: 'Nunito_700Bold',
  },
  countryName: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Nunito_400Regular',
  },
});

export default PropertyFormScreen; 