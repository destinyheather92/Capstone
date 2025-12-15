// const express = require("express");
// const router = express.Router();
// const Company = require("../Models/companyModel");

// //this isnt being used, probably dont need it., 

// //************************************//
// //                  GET ALL LOADS FOR DAILY REPORT
// //************************************//
// router.get("/:dwrID", async (req,res)=>{
//     let dwrID = req.params.dwrID;
//     try{
//               const company = await Company.findOne({ });
//               console.log(company)
//               res.send("true")
//     }catch(error){
//           console.error(error);
//     res.status(500).send("Internal server error");
//     }
// })

// module.exports = router;