const mongoose = require("mongoose");
const IncidentSchema = require("./incidentsSchema");
const LoadSchema = require("./loadsSchema");
const EquipUsedSchema = require("./equipUsed");

const dwrSchema = new mongoose.Schema({
  date: { type: String },
  workersOnSite: { type: String },
  enteredBy: { type: String },
  equipmentUsed: [{ type: EquipUsedSchema, default: () => ({}) }],
  incidents: [{ type: IncidentSchema, default: () => ({}) }],
  loads: [{ type: LoadSchema, default: () => ({}) }],
});

module.exports = dwrSchema;
