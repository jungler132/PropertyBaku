import React, { createContext, useState, useContext } from 'react';

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);

  const addProperty = (property) => {
    setProperties([...properties, { ...property, id: Date.now().toString() }]);
  };

  const removeProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, removeProperty }}>
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