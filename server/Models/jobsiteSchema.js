const mongoose = require("mongoose");
const dwrSchema = require("../Models/dwrSchema");


//is there a way to add something to the schema if the type is a load? I do not need a loads array if it is not a haul truck or should i jsut keep it there for GP?
// console.log(EquipmentSchema)
const jobSiteSchema = new mongoose.Schema({
  jobsiteName: { type: String },
  leadForeman: {type:String},
  deadline:{type:String},
  dwrs: [{ type: dwrSchema, default: () => ({}) }],
});

// const JobSiteSchema = mongoose.model("job", jobSiteSchema);

module.exports = jobSiteSchema;
