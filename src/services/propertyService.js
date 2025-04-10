import axios from 'axios';

const API_URL = 'http://192.168.1.2:5000/api'; // Меняем localhost на IP адрес

export const propertyService = {
  // Получить все объекты недвижимости
  getAllProperties: async () => {
    try {
      console.log('Fetching properties from:', `${API_URL}/properties`);
      const response = await axios.get(`${API_URL}/properties`);
      console.log('Properties received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error.message);
      console.error('Full error:', error);
      throw error;
    }
  },

  // Получить объект недвижимости по ID
  getPropertyById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with id ${id}:`, error);
      throw error;
    }
  },

  // Создать новый объект недвижимости
  createProperty: async (propertyData) => {
    try {
      const response = await axios.post(`${API_URL}/properties`, propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },

  // Обновить существующий объект недвижимости
  updateProperty: async (id, propertyData) => {
    try {
      const response = await axios.put(`${API_URL}/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property with id ${id}:`, error);
      throw error;
    }
  },

  // Удалить объект недвижимости
  deleteProperty: async (id) => {
    try {
      await axios.delete(`${API_URL}/properties/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting property with id ${id}:`, error);
      throw error;
    }
  }
}; 