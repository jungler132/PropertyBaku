import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Switch, Image, Dimensions, Alert, Modal } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { useProperty } from '../context/PropertyContext';
import i18n from '../translations/i18n';
import { useLanguage } from '../translations/i18n';

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
  const { currentLocale } = useLanguage();
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
      alert(i18n.t('alerts.mediaPermissionRequired'));
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
      alert(i18n.t('alerts.imagePickError'));
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
      alert(i18n.t('alerts.videoPickError'));
    }
  };

  const removeMedia = (index) => {
    setMediaFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    if (!property.owner || !property.phoneNumber || !property.type || !property.area || !property.landArea || !property.bedrooms || !property.bathrooms || !property.hasGarage || mediaFiles.length === 0) {
      Alert.alert(i18n.t('alerts.error'), i18n.t('alerts.fillRequiredFields'));
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
        <FontAwesome5 name={icon} size={24} color="#363237" style={styles.switchIcon} />
        <Text style={styles.switchLabel}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={(newValue) => setProperty({ ...property, [field]: newValue })}
        trackColor={{ false: '#73605B', true: '#D09683' }}
        thumbColor={value ? '#363237' : '#F9F9FF'}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#363237', '#2D4262']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <MaterialIcons name="add-home" size={40} color="#F9F9FF" />
        <Text style={styles.title}>{i18n.t('propertyForm.addProperty')}</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.sectionTitle}>{i18n.t('propertyForm.ownerInfo')} *</Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.owner') + ' *'}
            value={property.owner}
            onChangeText={(text) => setProperty({ ...property, owner: text })}
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={styles.phoneContainer}>
          <TouchableOpacity 
            style={styles.phoneCodeButton}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={[styles.phoneCodeText, { color: '#363237' }]}>{property.phoneCode}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#363237" />
          </TouchableOpacity>
          <TextInput
            style={[styles.phoneInput, { color: '#363237' }]}
            placeholder={i18n.t('propertyForm.phoneNumber') + ' *'}
            value={property.phoneNumber}
            onChangeText={(text) => setProperty({ ...property, phoneNumber: text })}
            keyboardType="phone-pad"
            placeholderTextColor="#73605B"
            maxLength={10}
          />
        </View>

        <Text style={styles.sectionTitle}>{i18n.t('propertyForm.mainInfo')} *</Text>
        
        <View style={styles.inputContainer}>
          <MaterialIcons name="house" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.propertyType') + ' *'}
            value={property.type}
            onChangeText={(text) => setProperty({ ...property, type: text })}
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="square-foot" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.area') + ' *'}
            value={property.area}
            onChangeText={(text) => setProperty({ ...property, area: text })}
            keyboardType="numeric"
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="landscape" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.landArea') + ' *'}
            value={property.landArea}
            onChangeText={(text) => setProperty({ ...property, landArea: text })}
            keyboardType="numeric"
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="bed" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.bedrooms') + ' *'}
            value={property.bedrooms}
            onChangeText={(text) => setProperty({ ...property, bedrooms: text })}
            keyboardType="numeric"
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="bathroom" size={24} color="#363237" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder={i18n.t('propertyForm.bathrooms') + ' *'}
            value={property.bathrooms}
            onChangeText={(text) => setProperty({ ...property, bathrooms: text })}
            keyboardType="numeric"
            placeholderTextColor="#73605B"
          />
        </View>

        <View style={[styles.switchContainer, styles.requiredSwitch]}>
          <View style={styles.switchLabelContainer}>
            <MaterialIcons name="garage" size={24} color="#363237" style={styles.switchIcon} />
            <Text style={styles.switchLabel}>{i18n.t('propertyForm.garage')} *</Text>
          </View>
          <Switch
            value={property.hasGarage}
            onValueChange={(value) => setProperty({ ...property, hasGarage: value })}
            trackColor={{ false: '#73605B', true: '#D09683' }}
            thumbColor={property.hasGarage ? '#363237' : '#F9F9FF'}
          />
        </View>

        <Text style={styles.sectionTitle}>{i18n.t('propertyForm.additionalFeatures')}</Text>

        {renderFeatureSwitch('parking', i18n.t('propertyForm.parking'), property.hasParking, 'hasParking')}
        {renderFeatureSwitch('swimming-pool', i18n.t('propertyForm.pool'), property.hasPool, 'hasPool')}
        {renderFeatureSwitch('child', i18n.t('propertyForm.kidsRoom'), property.hasKidsRoom, 'hasKidsRoom')}
        {renderFeatureSwitch('tree', i18n.t('propertyForm.winterGarden'), property.hasWinterGarden, 'hasWinterGarden')}
        {renderFeatureSwitch('water', i18n.t('propertyForm.bioPool'), property.hasBioPool, 'hasBioPool')}
        {renderFeatureSwitch('futbol', i18n.t('propertyForm.footballField'), property.hasFootballField, 'hasFootballField')}
        {renderFeatureSwitch('basketball-ball', i18n.t('propertyForm.basketballCourt'), property.hasBasketballCourt, 'hasBasketballCourt')}
        {renderFeatureSwitch('table-tennis', i18n.t('propertyForm.tennisCourt'), property.hasTennisCourt, 'hasTennisCourt')}
        {renderFeatureSwitch('dumbbell', i18n.t('propertyForm.gym'), property.hasGym, 'hasGym')}
        {renderFeatureSwitch('hot-tub', i18n.t('propertyForm.sauna'), property.hasSauna, 'hasSauna')}
        {renderFeatureSwitch('bath', i18n.t('propertyForm.jacuzzi'), property.hasJacuzzi, 'hasJacuzzi')}
        {renderFeatureSwitch('wine-bottle', i18n.t('propertyForm.wineCellar'), property.hasWineCellar, 'hasWineCellar')}

        <View style={styles.mediaSection}>
          <Text style={styles.sectionTitle}>{i18n.t('propertyForm.media')}</Text>
          <Text style={styles.mediaNote}>{i18n.t('propertyForm.minImageRequired')}</Text>
          
          <View style={styles.mediaButtons}>
            <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
              <LinearGradient
                colors={['#363237', '#2D4262']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mediaButtonGradient}
              >
                <MaterialIcons name="photo-camera" size={24} color="#F9F9FF" />
                <Text style={styles.mediaButtonText}>{i18n.t('propertyForm.photo')} *</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.mediaButton} onPress={pickVideo}>
              <LinearGradient
                colors={['#363237', '#2D4262']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mediaButtonGradient}
              >
                <MaterialIcons name="videocam" size={24} color="#F9F9FF" />
                <Text style={styles.mediaButtonText}>{i18n.t('propertyForm.video')}</Text>
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
            colors={['#363237', '#2D4262']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.submitButtonGradient}
          >
            <MaterialIcons name="save" size={24} color="#F9F9FF" style={styles.submitButtonIcon} />
            <Text style={styles.submitButtonText}>{i18n.t('propertyForm.save')}</Text>
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
                <Text style={styles.modalTitle}>{i18n.t('propertyForm.selectCountryCode')}</Text>
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
    backgroundColor: '#F9F9FF',
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
    color: '#F9F9FF',
    marginTop: 10,
    fontFamily: 'Nunito_700Bold',
  },
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#363237',
    marginBottom: 15,
    marginTop: 20,
    fontFamily: 'Nunito_700Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9FF',
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#73605B',
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 10,
    fontSize: 16,
    color: '#363237',
    fontFamily: 'Nunito_400Regular',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#73605B',
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
    color: '#363237',
  },
  switchLabel: {
    fontSize: 16,
    color: '#363237',
    fontFamily: 'Nunito_400Regular',
  },
  mediaSection: {
    marginTop: 20,
  },
  mediaNote: {
    fontSize: 14,
    color: '#73605B',
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