const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "_jwt_secret";
const uuidv4 = require("../node_modules/uuid/dist/v4");
const Company = require("../Models/companyModel");
const User = require("../Models/usersModel");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req.cookies.jwt]),
  secretOrKey: JWT_SECRET,
};
const generateToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
//****************************************//
//                CREATING NEW LOCAL STRATEGY ✅
//***************************************//
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then((user) => {
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        bcrypt
          .compare(password, user.password)
          .then((res) => {
            if (res) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password." });
            }
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  })
);
//****************************************//
//                NEW JSON WEB TOKEN STRATEGY ✅
//***************************************//
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then((user) => {
        console.log(user)
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => done(err, false));
  })
);
//****************************************//
//                 REGISTER NEW COMPANY
//                               ACCOUNT  ✅
//***************************************//
//http://localhost:8080/api/user/registerCompany (post)
//eventually we can add cc info here
router.post("/registerCompany", async (req, res) => {
  //creating a unique company id
  let randomID = uuidv4.default();
  let {
    companyName,
    streetAddress,
    city,
    state,
    phone,
    firstName,
    lastName,
    username,
    password,
    email,
    zip,
  } = req.body;
  //check to see if the user currently has an account in the system
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(409).json({
      message: "User already exists",
    });
  }

  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating a new user (this is the admin role)
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      companyID: randomID,
      companyName,
      role: "admin"
    });
    newUser.save();
    //creating the company information, billing info can go here eventually
    const newCompany = new Company({
      companyName,
      companyID: randomID,
      streetAddress,
      firstName,
      lastName,
      username,
      city,
      state,
      zip,
      phone,
      allEquipment: [],
      jobsites: [],
      //this is a subdocument NOT a nested path
      employees: [{ firstName, lastName, role: "admin", username }],
    });
    newCompany.save();
    res.status(201).json({
      message: "Company User Created!",
    });
  }
});

//****************************************//
//                 REGISTER NEW EMPLOYEE
//          THIS CAN ONLY BE DONE BY AN ADMIN. ✅
//***************************************//
router.post("/registerNewEmployee", async (req, res) => {
  //make sure the company id is sent is req.body

  let {
    companyID,
    firstName,
    lastName,
    username,
    password,
    companyName,
    role,
  } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    res.status(409).json({
      message: "User already exists",
    });
  }
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating a new user (this is the admin role)
    const newUser = new User({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      companyID,
      companyName,
      role,
    });
    newUser.save();
    //    .exec()=> executes the query
    //adds it to the companies list of employees.
    let company = await Company.findOne({ companyID: companyID }).exec();
    //MongooseArray methods such as push, unshift, addToSet, and others cast arguments to their proper types transparently:
    company.employees.push({ firstName, lastName, role, username });
    company.save();
    res.status(201).send(company.employees);
  }
});
//****************************************//
//          GET USERS BY COMPANY✅
//***************************************//
router.get("/companyUsers/:id", async (req, res) => {
  let companyID = req.params.id;
  try {
    const company = await Company.findOne({ companyID });
    if (!company) {
      return res.status(404).send("No Company Found");
    }
    res.status(200).send(company.employees);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
//****************************************//
//          EDIT COMPANY PROFILE  ✅
//***************************************//
//this is very convoluted because data needs to change in multiple places.
router.put(`/editProfile/:companyid/:userId`, async (req, res) => {
  let companyID = req.params.companyid;
  let userID = req.params.userId;
  let updateData = req.body;
  let { username, password, firstName, lastName, email, companyName } =
    req.body;
  try {
    let adminUser = await User.findOne({ _id: userID });
    let company = await Company.findOne({ companyID: companyID });
    //variables for username adjustments
    //if the user is trying to update the username, this will be null if the user name doesn't exist we can update.
    let oldUserName = adminUser.username;
    let usernameExists = await User.findOne({ username: username });
    //variables for employee array within the company schema
    let employeeToUpdateID = company.employees.filter(
      (e) => e.username == oldUserName
    )[0]._id;
    let employee = company.employees.id(employeeToUpdateID);

    //conditionals, because there are multiple updates in multiple places for certain data recieved from the client
    if (!company) {
      return res.status(404).send("Company not found");
    }
    //if the user is trying to update the password, hash it and reflect the data to say such.
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      password = hashedPassword;
      updateData.password = hashedPassword;
    }
    if (username) {
      if (usernameExists) {
        res.status(409).json({
          message: "User already exists",
        });
      } else if (!usernameExists) {
        employee.set(updateData);
        adminUser.set(updateData);
      }
    }
    if (firstName || lastName) {
      employee.set(updateData);
      adminUser.set(updateData);
    }
    if (email) {
      adminUser.set(updateData);
    }
    if (companyName) {
      //if company name is changed, we need to reflect those updates with all the users within the company by the company ID
      await User.updateMany({ companyID }, { companyName });
    }
    //this updates the user info in user schema, which is the admin editting the profile
    adminUser.save();
    //this is updating the company schema
    company.set(updateData);
    company.save();
    res.status(200).send(company);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
//****************************************//
//          EDIT USERS BY EMPLOYEE ID ✅
//***************************************//
//At this point, the admin cannot edit the employees username. I don't see any point in that right now, but maybe that can be inserted at some point. It would involve functionality to make sure there are no users within the data base that have that username.
router.put(`/:employeeId`, async (req, res) => {
  let employeeId = req.params.employeeId;
  let updateData = req.body;

  try {
    let company = await Company.findOne({ "employees._id": employeeId });
    if (!company) {
      return res.status(404).send("Document or subdocument not found");
    }
    //editing employee in the company model
    let employee = company.employees.id(employeeId);
    let username = employee.username;
    let newPassword = updateData.password;
    //if the user is trying to update the password, hash it and reflect the data to say such.
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      updateData.password = hashedPassword;
    }
    employee.set(updateData);
    company.save();
    //editing employee in the user model as well
    let adminUser = await User.findOne({ username: username });
    if (!adminUser) res.status(404).send("No User Exists");
    if (adminUser) {
      adminUser.set(updateData);
      adminUser.save();
    }
    res.status(200).send(company.employees);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
//****************************************//
//          GET COMPANY BY ID✅
//***************************************//
router.get("/getCompany/:id", async (req, res) => {
  let companyId = req.params.id;
  try {
    const company = await Company.findOne({ companyID: companyId });
    if (!company) {
      return res.status(404).send("No Company Found");
    }
    res.status(200).send(company);
  } catch (err) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
//****************************************//
// DELETE COMPANY BY companyID ❌ No functionality on client as of now. But this route does work. It deletes company and the users associated with the account out of this. 
//***************************************//
// the company id needs to be the one that we generated ourselves, not the mongoose _id
router.delete("/deleteCompany/:id", async (req, res) => {
  let companyID = req.params.id;
  try {
    let company = await Company.deleteOne({ companyID });
    if (!company) {
      return res.status(404).send("Document or subdocument not found");
    }
    await User.deleteMany({ companyID });
    res.send("Successfully Deleted")
  } catch (error) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
//****************************************//
//          DELETE USERS BY employeeID ✅
//***************************************//
router.delete(`/:employeeId`, async (req, res) => {
  let employeeId = req.params.employeeId;

  try {
    //this is deleting from the list of employees associated within the company
    let company = await Company.findOne({ "employees._id": employeeId });
    if (!company) {
      return res.status(404).send("Document or subdocument not found");
    }
    let employee = company.employees.id(employeeId);
    let username = employee.username;
    employee.deleteOne();
    company.save();
    // this is deleting from the user model
    let deleteUser = await User.findOne({ username: username });

    if (!deleteUser) {
      res.status(404).send("No user Exists");
    }
    if (deleteUser) {
      // Since deleteOne() returns a Query, the deleteOne() will not execute unless you use either await, .then(), .catch(), or .exec() EXAMPLE: product.deleteOne(); // Doesn't do anything
      // product.deleteOne().exec(); // Deletes the document, returns a promise
      deleteUser.deleteOne().exec();
      deleteUser.save();
    }

    res.status(200).send(company.employees);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

//****************************************//
//          LOGIN USER AND GENERATE A JWT✅
//***************************************//
//Applies the named strategy (or strategies) to the incoming request, in order to authenticate the request. If authentication is successful, the user will be logged in and populated at req.user and a session will be established by default. If authentication fails, an unauthorized response will be sent.
//  http://localhost:8080/api/user/login (post)
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = generateToken(user);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    // console.log(user)
    return res.status(200).json({ message: "Login successful", user });
  })(req, res, next);
});
//****************************************//
//   AUTHENTICATE A USER USING A JWT TO ACCESS
//                      PROTECTED ROUTES✅
//***************************************//
//http://localhost:8080/api/user/login (get)
router.get(
  "/login",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user) {
      res.json({ message: "User is logged in", user: req.user });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
);
//****************************************//
// CHECK TO SEE IF THE USER IS AUTHENTICATED✅
//***************************************//
//http://localhost:8080/api/user/auth/check (get)
router.get(
  "/auth/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log("authenticate",req.user)
    if (req.user) {
      const userObj = {
        status: 200,
        user: req.user,
      };
      res.json(userObj);
    } else {
      res.sendStatus(401);
    }
  }
);
//****************************************//
//       LOGOUT A USER A CLEAR THE JWT COOKIE✅
//***************************************//
//http://localhost:8080/api/user/logout  (get)
router.get("/logout", (req, res) => {
  res.clearCookie("jwt"); // Clear the JWT cookie
  res.json({ message: "Logout successful" });
});

module.exports = router;
