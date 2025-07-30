const mongoose = require('mongoose');

const healthPackageSchema = new mongoose.Schema({
  title: String,
  icon: String, // yaha file path hoga
  badge: String,
  description: {
    reportDelivery: String,
    parameterCount: String
  },
  price: {
    actual: Number,
    original: Number
  }
});

module.exports = mongoose.model('HealthPackage', healthPackageSchema);
