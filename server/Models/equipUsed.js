const mongoose = require("mongoose");

const equipUsedSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: String },
  hours: { type: String },
});

module.exports = equipUsedSchema
