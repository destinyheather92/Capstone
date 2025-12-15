const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: { type: String },
  type: { type: String },

});

// const EquipmentSchema = mongoose.model("equipment", equipmentSchema);

module.exports = equipmentSchema;
