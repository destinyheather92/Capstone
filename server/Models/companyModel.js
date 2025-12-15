const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const EmployeeSchema = require("./employeeSchema");
const EquipmentSchema = require("./equipmentSchema");
const JobSiteSchema = require("./jobsiteSchema");
//when new account is created the role of the company owner is admin, he then is able to add his own employees and their role will be foreman, which limits capabilities of what he is able to do with in the app.

const companySchema = new mongoose.Schema({
  companyName: { type: String },
  companyID: { type: String },
  streetAddress: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: {type:String},
  city: { type: String },
  state: { type: String },
  zip: {type:String},
  phone: { type: String },
  email:{type:String},
  //see note below
  allEquipment: [{ type: EquipmentSchema, default: () => ({}) }],
  jobsites: [{ type: JobSiteSchema, default: () => ({}) }],
  employees: [{ type: EmployeeSchema, default: () => ({}) }],
});
const Company = mongoose.model("company", companySchema);

module.exports = Company;
//Subdocument paths are undefined by default, and Mongoose does not apply subdocument defaults unless you set the subdocument path to a non-nullish value.
//Mongoose applies defaults recursively, which means there's a nice workaround if you want to make sure Mongoose applies subdocument defaults: make the subdocument path default to an empty object
// Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

// example usage
// const accounts = {
//     "companyName": "QC&D",
//     "ownerName": "Adam Huneau",
//     "streetAddress":"1035 Mt Vernon Church Road",
//     "city": "Chapin",
//     "state":"South Carolina",
//     "phone": "803-123-4567",
//     "jobsites": [{
//         "jobsiteName":"Montgomery Co.",
//         "equipment": [{"name":"Cat Haul Truck","type": "Haul Truck"}],
//          "dwrs":[{"date":"10-25-25", "hours":"5", "fuel":"4", "Def":"2", "enteredBy":"Tyler Richbourg"}],
//          "loads": [{   "date": "10/11/25","quantity": "5","material": "8", "enteredBy": "Tyler Richbourg"}],
//          "incidents": [{"date":"10/24/25", "time": "5:00pm", "enteredBy":"TylerRichbourg","name":"Broke Windshield", "incident": " a report would go here"}]
//     }],
//     "employees":[{
//         "firstName":"Adam",
//         "lastName":"Huneau",
//         "role":"admin",
//         "userName":"qcdowner",
//         "password":"test123"
//     },
// {
//         "firstName":"Tyler",
//         "lastName":"Richbourg",
//         "role":"foreman",
//         "userName":"TylerR",
//         "password":"test123"
//     }]
// }
