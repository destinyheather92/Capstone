const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
          time: { type: String },
          incident: { type: String },
});

module.exports = incidentSchema;