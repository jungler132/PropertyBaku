import React, { createContext, useState, useContext, useEffect } from 'react';
import { propertyService } from '../services/propertyService';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      console.log('Starting to fetch properties...');
      setLoading(true);
      setError(null);
      const data = await propertyService.getAllProperties();
      console.log('Raw data received from server:', data);
      
      // Проверяем и форматируем данные перед сохранением
      const formattedData = Array.isArray(data) ? data.map(property => ({
        ...property,
        mediaFiles: Array.isArray(property.mediaFiles) ? 
          property.mediaFiles.map(file => typeof file === 'string' ? file : null).filter(Boolean) 
          : []
      })) : [];
      
      console.log('Formatted data before setting state:', formattedData);
      setProperties(formattedData);
    } catch (err) {
      const errorMessage = err.message || 'Ошибка при загрузке данных';
      console.error('Detailed error in fetchProperties:', {
        message: errorMessage,
        error: err
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const addProperty = async (property) => {
    try {
      setLoading(true);
      const newProperty = await propertyService.createProperty(property);
      setProperties([...properties, newProperty]);
    } catch (err) {
      setError(err.message);
      console.error('Error adding property:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeProperty = async (id) => {
    try {
      setLoading(true);
      await propertyService.deleteProperty(id);
      setProperties(properties.filter(property => property._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error removing property:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PropertyContext.Provider value={{ 
      properties, 
      addProperty, 
      removeProperty, 
      loading,
      error,
      refreshProperties: fetchProperties 
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
}; 