const express = require("express");
const router = express.Router();
const Company = require("../Models/companyModel");

const PDFDocument = require("pdfkit");


// http://localhost:8080/api/pdfs/generate-pdf/68dd6abb0b8fe061e10022dc

//EXPECTING THE DWR ID, AS WELL AS THE JOBnAME AND OPTIONAL NOTES IF THE USER WANTS TO INPUT. i CAN PROBABLY USE A MODAL TO ALLOW THEM TO DO SUCH 
router.post("/generate-pdf/:dwrID", async (req, res) => {
  let dwrID = req.params.dwrID;
  let { jobName, optionalNotes } = req.body;
  try {
    let doc = await Company.findOne({ "jobsites.dwrs._id": dwrID });

    if (!doc) {
      return res.status(404).send("Document or subdocument not found");
    }

    let dwr = doc.jobsites
      .flatMap((child) => child.dwrs)
      .find((subChild) => subChild._id == dwrID);
    if (dwr) {
      const doc = new PDFDocument({ font: "Times-Roman" });
      const filename = `Job_${jobName}.pdf`;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
      doc.pipe(res);
      //add content to pdf
      doc
        .fontSize(24)
        .font("Times-Bold")
        .text(`Daily Work Report for ${jobName}`, {
          align: "center",
          lineGap: 8,
        });

      doc.font("Times-Roman").fontSize(14);
      doc.text(`Date: ${dwr.date}`);
      doc.text(`Submitted By: ${dwr.enteredBy}`);
      doc.moveDown(2);

      //   equipment used
      doc.font("Times-Bold").fontSize(14).text("EQUIPMENT USED", 70);
      dwr.equipmentUsed.length == 0
        ? doc
            .font("Times-Italic")
            .fontSize(12)
            .text("No Equipment entered for this Date.")
        : doc.moveDown(1);
      dwr.equipmentUsed.forEach((eq) => {
        doc
          .font("Times-Roman")
          .fontSize(12)
          .list([`Equipment Name:  ${eq.name}`], 80)
          .text(`Quantity:  ${eq.quantity}`, 95)
          .text(`Hours:  ${eq.hours}`);
      });
      doc.moveDown(2);
      //   INCIDENTS
      doc.font("Times-Bold").fontSize(14).text("INCIDENTS", 70);
      dwr.incidents.length == 0
        ? doc
            .font("Times-Italic")
            .fontSize(12)
            .text("No Incidents entered for this Date.")
        : doc.moveDown(1);
      dwr.incidents.forEach((e, i) => {
        doc
          .font("Times-Roman")
          .fontSize(12)
          .list([`Incident ${i+1}`], 80)
          .text(`Time:  ${e.time}`, 95)
          .text(`Incident:  ${e.incident}`);
      });
      doc.moveDown(2);
      //LOADS
      doc.font("Times-Bold").fontSize(14).text("LOADS", 70);
      dwr.loads.length == 0
        ? doc
            .font("Times-Italic")
            .fontSize(12)
            .text("No loads entered for this Date.", 80)
        : doc.moveDown(1);
      dwr.loads.forEach((e) => {
        doc
          .font("Times-Roman")
          .fontSize(12)
          .list([`Material :  ${e.material}`], 80)
          .text(`Quantity:  ${e.quantity}`, 95)
          .text(`Source:  ${e.source}`);
      });
      doc.moveDown(2);
      doc
        .font("Times-Bold")
        .fontSize(14)
        .text(`WORKERS ON SITE: ${dwr.workersOnSite} `, 70);
      doc.moveDown(1);
      if (optionalNotes) {
        doc.font("Times-Bold").fontSize(14).text("NOTES:", 70);
        doc.font("Times-Roman").fontSize(12).text(`${optionalNotes}`);
      }

      doc.end();
    } else {
      res.status(404).send("Document or subdocument not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
