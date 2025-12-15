const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String },
  username: {type:String}
});


module.exports = EmployeeSchema;
