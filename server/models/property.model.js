const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  // Основная информация
  type: {
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  landArea: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  
  // Местоположение
  city: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },

  // Дополнительные удобства (features)
  features: {
    hasGarage: { type: Boolean, default: false },
    hasParking: { type: Boolean, default: false },
    hasPool: { type: Boolean, default: false },
    hasKidsRoom: { type: Boolean, default: false },
    hasWinterGarden: { type: Boolean, default: false },
    hasBioPool: { type: Boolean, default: false },
    hasFootballField: { type: Boolean, default: false },
    hasBasketballCourt: { type: Boolean, default: false },
    hasTennisCourt: { type: Boolean, default: false },
    hasGym: { type: Boolean, default: false },
    hasSauna: { type: Boolean, default: false },
    hasJacuzzi: { type: Boolean, default: false },
    hasWineCellar: { type: Boolean, default: false }
  },

  // Медиафайлы
  mediaFiles: [{
    uri: { type: String },
    type: { type: String, enum: ['image', 'video'] }
  }],

  // Контактная информация
  owner: {
    type: String,
    required: true
  },
  phoneCode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },

  // Метки времени
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware для обновления updatedAt перед сохранением
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Property', propertySchema); 