const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema= new mongoose.Schema({
      firstName: { type: String },
      lastName: { type: String },
      role: { type: String },
      email: {type: String},
      username: { type: String, required:true, unique:true},
      password: { type: String, required:true},
      companyName: {type: String},
      companyID: {type:String},
    
})

// userSchema.pre("save", function (next) {
//     const user = this;
//     console.log("this", this)
//     if (!user.isModified("password")) return next();
//     bcrypt.hash(user.password, 10, (err, hash) => {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });

    const UserModel = mongoose.model("users", userSchema)
    module.exports = UserModel;