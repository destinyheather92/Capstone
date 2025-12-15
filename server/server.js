//ICEBOX : 
//
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;
const dotenv = require("dotenv");

//Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code
//Suppress runtime logging message.
dotenv.config({quiet:true});

//*****************************//
//                IMPORT  ROUTES  
//*****************************//
const userRoutes = require("./Routes/user");
const equipmentRoutes = require("./Routes/equipment")
const jobRoutes = require("./Routes/jobs")
const dwrRoutes = require("./Routes/dwrs")
// const loadRoutes = require("./Routes/loads")
const pdfRoutes = require("./Routes/pdfs")

//*****************************//
//          UTILITY FUNCTIONS / FILES
//*****************************//
// const dwrFunction =  require("./utils/dwrFunction")
//for PDF generation


const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

//*****************************//
//            BASIC MIDDLEWARE
//*****************************//
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next();
});
//*****************************//
//         MIDDLEWARE FOR ROUTES
//*****************************//
app.use("/api/user", userRoutes);
app.use("/api/equipment", equipmentRoutes)
app.use("/api/jobs", jobRoutes);
app.use("/api/dwrs", dwrRoutes)
// app.use("/api/loads", loadRoutes)
app.use("/api/pdfs", pdfRoutes)
//*****************************//
//           DATABASE CONNECTION 
//*****************************//
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/constructionApp", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

main();

//*****************************//
//    LISTENING FOR SERVER ON PORT
//*****************************//
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
