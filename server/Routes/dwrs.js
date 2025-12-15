const express = require("express");
const router = express.Router();
const Company = require("../Models/companyModel");

//*****************************//
//       GET ALL DWRS BY JOBSITE ID ✅
//*****************************//
router.get("/:jobsiteID", async (req, res) => {
  let jobsiteID = req.params.jobsiteID;
  try {
    let doc = await Company.findOne({ "jobsites._id": jobsiteID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let jobs = doc.jobsites.id(jobsiteID).dwrs;
    res.status(200).send(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//*****************************//
//       GET *ONE* DWR BY DWR ID
//*****************************//
//http://localhost:8080/api/dwrs/68a61445f63dc054a90e3e86
router.get("/findOne/:dwrID", async (req, res) => {
  let dwrID = req.params.dwrID;
  try {
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }

    let dwr = doc.jobsites
      .flatMap((child) => child.dwrs)
      .find((subChild) => subChild._id == dwrID);
    if (dwr) {
      res.status(200).send(dwr);
    } else {
      res.status(404).send("Document or subdocument not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
//*****************************//
//      POST  DWR TO JOBSITE ID  ✅
//*****************************//
//this will post the equipmentUsed, incidents, and loads, so I dont have to worry about those is the HTTP requests.
// http://localhost:8080/api/dwrs/68a60e5743434812a7073a44
router.post("/:jobsiteID", async (req, res) => {
  let jobsiteID = req.params.jobsiteID;
  let { date, workersOnSite, enteredBy, equipmentUsed, incidents, loads } =
    req.body;
  try {
    const company = await Company.findOne({ "jobsites._id": jobsiteID });
    if (!company) return res.status(404).send("No Company Found");
    let subDoc = company.jobsites.id(jobsiteID);
    subDoc.dwrs.push({
      date,
      workersOnSite,
      equipmentUsed,
      incidents,
      loads,
      enteredBy,
    });
    company.save();
    res.status(200).send(subDoc);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
// http://localhost:8080/api/dwrs/68a60e5743434812a7073a44
//********************************************//
//      UPDATE  DWR BY DWR ID (only generic Data)✅
//*********************************************//
router.put("/:jobsiteID/:dwrID", async (req, res) => {
  let dwrID = req.params.dwrID;
  let jobsiteID = req.params.jobsiteID;
  let updatedData = req.body;
  console.log(updatedData)
  try {
    //find the document with the id matching the dwrsid
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let dwrUpdate = doc.jobsites.id(jobsiteID).dwrs.id(dwrID);
    //finding subdocument by id and then using the set method to update the data in that array, this is going to be an object, so whatever is sent from the client needs to match the schema for the jobsite
    dwrUpdate.set(updatedData);
    doc.save();
    res.status(200).send(dwrUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});



//********************************************//
//      UPDATE  Incidents BY DWR ID (only generic Data)✅
//*********************************************//
router.put("/:jobsiteID/:dwrID/:incidentID", async (req, res) => {
  let dwrID = req.params.dwrID;
  let jobsiteID = req.params.jobsiteID;
  let incidentID =req.params.incidentID
  let updatedData = req.body;
  console.log(updatedData)
  try {
    //find the document with the id matching the dwrsid
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let incidentUpdate = doc.jobsites.id(jobsiteID).dwrs.id(dwrID);
    incidentUpdate.incidents.id(incidentID).set(updatedData);
    doc.save();
    res.status(200).send(incidentUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
//********************************************//
//      UPDATE  Equipment BY DWR ID✅
//*********************************************//
router.put("/equip/:jobsiteID/:dwrID/:eqID", async (req, res) => {
  let dwrID = req.params.dwrID;
  let jobsiteID = req.params.jobsiteID;
  let eqID =req.params.eqID
  let updatedData = req.body;
  console.log(updatedData)
  try {
    //find the document with the id matching the dwrsid
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let eqUpdate = doc.jobsites.id(jobsiteID).dwrs.id(dwrID);
    eqUpdate.equipmentUsed.id(eqID).set(updatedData);
    doc.save();
    res.status(200).send(eqUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//********************************************//
//      UPDATE  loads BY DWR ID✅
//*********************************************//
router.put("/loads/:jobsiteID/:dwrID/:loadID", async (req, res) => {
  let dwrID = req.params.dwrID;
  let jobsiteID = req.params.jobsiteID;
  let loadID =req.params.loadID
  let updatedData = req.body;
  try {
    //find the document with the id matching the dwrsid
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let loadUpdate = doc.jobsites.id(jobsiteID).dwrs.id(dwrID);
    loadUpdate.loads.id(loadID).set(updatedData);
    doc.save();
    res.status(200).send(loadUpdate);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

//*****************************//
//     DELETE  DWR BY DWR ID
//*****************************//
router.delete("/:dwrID", async (req, res) => {
  let dwrID = req.params.dwrID;
  try {
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or Subdocument not found");
    }

    let dwr = doc.jobsites
      .flatMap((child) => child.dwrs)
      .find((subChild) => subChild._id == dwrID);
    //delete dwr, Each subdocument has its own deleteOne method.
    //if the dwr was found and exists, delete then save otherwise send a 404 error
    if (dwr) {
      dwr.deleteOne();
      doc.save();
      res.status(200).send(doc.jobsites);
    } else {
      return res.status(404).send("Subdocument not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});


//********************************************//
//      GET  DATES  BY DWR ID✅
//*********************************************//
router.get(`/dates/:jobsiteID/:date`,  async (req, res) => {
  let jobsiteID = req.params.jobsiteID;
  //this is formatting the date from the client, because it has to be sent over in milliseconds to read it. For exmple it was showing up as ....10/24/2025 and that cause it to spazz bc of the 
   let date = new Date(Number(req.params.date)).toLocaleDateString()
  try {
    let doc = await Company.findOne({ "jobsites._id": jobsiteID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }
    let jobs = doc.jobsites.id(jobsiteID).dwrs;
    let filteredDates = jobs.filter(e=> e.date===date)
    res.status(200).send(filteredDates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
})
//so far, this is the most efficient we have in doing this stuff :(  bc mongoose doesn't want ot create the code for us. :?)
//The flatMap() method of Array instances returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. It is identical to a map() followed by a flat() of depth 1 (arr.map(...args).flat()), but slightly more efficient than calling those two methods separately.
//The find() method of Array instances returns the first element in the provided array that satisfies
module.exports = router;
// post
// { "date":"10/25/25", "workersOnSite": "5", "enteredBy":"Destiny Mills", "equipmentUsed":[{"name": "Excavator 490", "quantity":"2", "hours":"5"}, {"name": "John Deere 160", "quantity":"1", "hours":"5"}], "incidents":[{"time":"3:20pm", "incident": "I broke a stupid windshield"}], "loads":[{
// 	"quantity": "4", "material": "Stone", "source":"Import"
// }, {
// 	"quantity": "7", "material": "Clay", "source":"Export"
// }, {
// 	"quantity": "4", "material": "Rif Raf", "source":"Import"
// }]}
