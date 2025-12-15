const express = require("express");
const router = express.Router();
const Company = require("../Models/companyModel");

//*****************************//
//                  GET ALL JOBSITES  ✅
//*****************************//
//company id is the randomly generated id not the _id property.
//http://localhost:8080/api/jobs/e6f5a265-b914-4082-b6f8-9859824cde83
router.get("/:companyID", async (req, res) => {
  let companyID = req.params.companyID;
  try {
    const company = await Company.findOne({ companyID });
    if (!company) {
      return res.status(404).send("No Company Found");
    }
    res.status(200).send(company.jobsites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//*****************************//
//                  GET ONE JOBSITE ✅
//*****************************//
//company id is the randomly generated id not the _id property.
//http://localhost:8080/api/jobs/getJobsite/${id}
router.get("/getJobsite/:jobID", async (req, res) => {
  let jobsiteID= req.params.jobID;
  try {
    const company = await Company.findOne({ "jobsites._id": jobsiteID});
    if (!company) {
      return res.status(404).send("No Company Found");
    }
    res.status(200).send(company.jobsites.id(jobsiteID));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//*****************************//
   //ADD NEW JOB SITE TO THE COMPANY  ✅
//*****************************//

//company id is the randomly generated id not the _id property.
router.post("/:companyID", async (req, res) => {
  let companyID = req.params.companyID;
  let { jobsiteName, leadForeman, deadline } = req.body;
  try {
    //find company
    const company = await Company.findOne({ companyID });
    //if no such company exists send a 404 error
    if (!company) {
      return res.status(404).send("No Company Found");
    }
    //otherwise push the new jobsite in
    company.jobsites.push({ jobsiteName, leadForeman, deadline });
    company.save();
    res.status(200).send(company.jobsites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
//*****************************//
//         CHANGE JOB SITE ✅
//*****************************//
//the client should be sending an object that follows the format {"jobsiteName": "example name:"}
//http://localhost:8080/api/jobs/689cda4fd9bac2be583674cd
router.put("/:jobsiteID", async (req, res) => {
  let jobsiteID = req.params.jobsiteID;
  let updatedData = req.body;
  try {
    //find the document with the id matching the jobsites id
    let doc = await Company.findOne({ "jobsites._id": jobsiteID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    //finding subdocument by id and then using the set method to update the data in that array, this is going to be an object, so whatever is sent from the client needs to match the schema for the jobsite
    doc.jobsites.id(jobsiteID).set(updatedData);
    doc.save();
    res.status(200).send(doc.jobsites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


//*****************************//
//                  DELETE JOBSITE✅
//*****************************//
// http://localhost:8080/api/jobs/689cda841409e69f01aa29c1
router.delete("/:jobsiteID", async (req, res) => {
  let jobsiteID = req.params.jobsiteID;
  console.log(jobsiteID)
  try {
    let doc = await Company.findOne({ "jobsites._id": jobsiteID });
    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    //delete job, Each subdocument has its own deleteOne method.
    doc.jobsites.id(jobsiteID).deleteOne();
    doc.save();
    res.status(200).send(doc.jobsites);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;

//   console.log(doc.$getAllSubdocs());
//   console.log(doc.$set({"jobsites._id":jobsiteID}, updateData))
//   try {
//     const updatedDoc = await Company.findOneAndUpdate(
//       { "jobsites._id": jobsiteID },
//       //above the jobsites._id is the subpath to find the inner id
//       {
//         $set: {
//           "jobsites.$_id": jobsiteID,
//         },updateData
//       },
//       { new: true }
//     );

//     if (!updatedDoc) {
//       return res.status(404).send("Document or subdocument not found");
//     }
//     res.status(200).send(updatedDoc);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal server error");
//   }
