const express = require('express');
const router = express.Router();
const Property = require('../models/property.model');

// Получить все объекты недвижимости
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Создать новый объект недвижимости
router.post('/', async (req, res) => {
  console.log('Получен запрос на создание объекта:', req.body);
  try {
    const property = new Property(req.body);
    console.log('Создаваемый объект:', property);
    const newProperty = await property.save();
    console.log('Объект успешно создан:', newProperty);
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Ошибка при создании объекта:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 