const express = require("express");
const router = express.Router();
const Company = require("../Models/companyModel");

//*****************************//
//            GET ALL EQUIPMENT  ✅
//*****************************//
//http://localhost:8080/api/equipment
router.get("/:companyID", async (req, res) => {
  let companyID = req.params.companyID;
  await Company.findOne({ companyID })
    .then((doc) => {
      if (!doc) {
        res.status(404).send("No Document Found");
      }
      res.status(200).send(doc.allEquipment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
});

//*****************************//
//  UPDATE EQUIPMENT BY ID   ✅
//*****************************//
// http://localhost:8080/api/equipment/68a3593c9a84adb66b3c4e65
router.put("/:eqID", async (req, res) => {
  const eqID = req.params.eqID;
  let updates = req.body
  // console.log(updates)
  try {
    let doc = await Company.findOne({ "allEquipment._id": eqID });
    if (!doc) return res.status(404).send("Subdocument not found");
    console.log(doc.allEquipment.id(eqID))
        //finding subdocument by id and then using the set method to update the data in that array, this is going to be an object, so whatever is sent from the client needs to match the schema for the equipment
    doc.allEquipment.id(eqID).set(updates)
    doc.save()
    res.status(200).send(doc.allEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

//*****************************//
// ADD NEW EQUIPMENT   ✅
//*****************************//
//http://localhost:8080/api/equipment/e6f5a265-b914-4082-b6f8-9859824cde83
router.post("/:companyID/", async (req, res) => {
  let companyID = req.params.companyID;
  let { name, type } = req.body;

  try {
    const company = await Company.findOne({ companyID });
    if (!company) return res.status(404).send("No Company Found");
    company.allEquipment.push({ name, type});
    company.save();
    res.status(200).send(company.allEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
//*****************************//
//           DELETE EQUIPMENT  ✅
//*****************************//
router.delete("/:eqID", async (req, res) => {
  let eqID = req.params.eqID;
  try {
    let doc = await Company.findOne({ "allEquipment._id": eqID });

    if (!doc) return res.status(404).send("Document or subdocument not found");
    doc.allEquipment.id(eqID).deleteOne();
    doc.save();
    //send back the updated  equipment
    res.status(200).send(doc.allEquipment);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
module.exports = router;



//
//*****************************//
// GET EQUIPMENT BY JOBSITE  may not need this. 
//*****************************//
//here we can filter by location
//http://localhost:8080/api/equipment/find/e6f5a265-b914-4082-b6f8-9859824cde83/homebase
// router.get("/find/:companyID/:location", async (req, res) => {
//   let companyID = req.params.companyID;
//   let location = req.params.location
//   await Company.findOne({ companyID })
//     .then((doc) => {
//       if (!doc) {
//         res.status(404).send("No Document Found");
//       }
//       let eqByJobsite = doc.allEquipment.filter(e=> e.location ===location )
//       res.status(200).send(eqByJobsite);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send("Internal server error");
//     });
// });
