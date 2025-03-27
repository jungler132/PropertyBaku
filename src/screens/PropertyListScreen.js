import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useProperty } from '../context/PropertyContext';
import i18n from '../translations/i18n';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

const PropertyListScreen = ({ navigation }) => {
  const { properties } = useProperty();

  const renderPropertyCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PropertyDetails', { property: item })}
      activeOpacity={0.95}
    >
      <Image
        source={{ uri: item.images[0] }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(54, 50, 55, 0.9)']}
        style={styles.cardOverlay}
      >
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.propertyType}>
              {i18n.t(`propertyTypes.${item.type}`)}
            </Text>
            <View style={styles.priceContainer}>
              <MaterialIcons name="attach-money" size={18} color="#F9F9FF" />
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.detailItem}>
              <MaterialIcons name="king-bed" size={20} color="#D09683" />
              <Text style={styles.detailText}>{item.bedrooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="bathtub" size={20} color="#D09683" />
              <Text style={styles.detailText}>{item.bathrooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <MaterialIcons name="square-foot" size={20} color="#D09683" />
              <Text style={styles.detailText}>{item.area} m²</Text>
            </View>
          </View>

          <View style={styles.locationContainer}>
            <MaterialIcons name="location-on" size={16} color="#D09683" />
            <Text style={styles.location}>{item.location}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#363237', '#2D4262']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>{i18n.t('home.myProperties')}</Text>
      </LinearGradient>

      {properties.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="home" size={80} color="#73605B" />
          <Text style={styles.emptyText}>{i18n.t('home.noProperties')}</Text>
          <Text style={styles.emptySubtext}>
            {i18n.t('home.addPropertyHint')}
          </Text>
        </View>
      ) : (
        <FlatList
          data={properties}
          renderItem={renderPropertyCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito_700Bold',
    color: '#F9F9FF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  listContent: {
    padding: 15,
  },
  card: {
    width: CARD_WIDTH,
    height: 280,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: 20,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  propertyType: {
    color: '#F9F9FF',
    fontSize: 18,
    fontFamily: 'Nunito_700Bold',
    textTransform: 'uppercase',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(54, 50, 55, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  price: {
    color: '#F9F9FF',
    fontSize: 16,
    fontFamily: 'Nunito_700Bold',
    marginLeft: 4,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(115, 96, 91, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  detailText: {
    color: '#F9F9FF',
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Nunito_600SemiBold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#F9F9FF',
    marginLeft: 6,
    fontSize: 14,
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
    color: '#73605B',
    fontFamily: 'Nunito_700Bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#73605B',
    fontFamily: 'Nunito_400Regular',
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default PropertyListScreen; 