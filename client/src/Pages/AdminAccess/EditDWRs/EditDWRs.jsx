import React, { useContext, useState, useEffect } from "react";
import Header from "../../../Components/Header/Header";
import { Button, Form } from "react-bootstrap";
import ConstructionAppContext from "../../../Context/ConstructionAppContext";
import axios from "axios";
import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import Accordions from "../../../Components/Accordion/Accordions";
import GeneratePdf from "../../../Components/Modals/GeneratePdf";
import "react-day-picker/style.css";

export default function EditDWRs({ docId, onDeleted }) {
  const { user, setUser } = useContext(ConstructionAppContext);
  const [allJobsites, setAllJobSites] = useState([]);
  //this is jsut the jobsiteId
  const [jobID, setJobID] = useState("");
  const [jobsite, setJobsite] = useState("");
  const [dateSelected, setDateSelected] = useState(null);
  const [dwrToEdit, setDwrToEdit] = useState(null);
  //these handle the changes
  const [genericChanges, setGenericChanges] = useState("");
  const [eqChanges, setEqChanges] = useState("");
  const [incidentChanges, setIncidentChanges] = useState("");
  const [loadChanges, setLoadChanges] = useState("");
  //pdf data
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await axios.get(
        `http://localhost:8080/api/jobs/${user.companyID}`
      );
      if (!cancelled) setAllJobSites(res.data); // handles initial mount & every remount
    })();
    return () => {
      cancelled = true;
    };
  }, [docId]);
  //watching for when the user selects a jobID so I can view the specific information for that job
  useEffect(() => {
    if (jobID) {
      axios
        .get(`http://localhost:8080/api/jobs/getJobsite/${jobID}`)
        .then((res) => {
          setJobsite(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [jobID]);

  useEffect(() => {
    if (jobsite && dateSelected) {
      let filterDWR = jobsite.dwrs.filter(
        (e) => e.date == dateSelected.toLocaleDateString()
      );
      if (filterDWR.length != 0) {
        setDwrToEdit(filterDWR[0]);
      }
    }
  }, [dateSelected]);

  const handleGoBack = () => {
    setDateSelected(false);
    setDwrToEdit("");
  };
  const handleGenericChange = (e) => {
    setGenericChanges({
      ...genericChanges,
      [e.target.name]: e.target.value,
    });
  };
  // all are getting the data back and the id they will need axios calls to do posts and stuff too then i can move on to loads and incidents. and ill be fn done.
  const handleGenericSubmit = (e) => {
    axios
      .put(
        `http://localhost:8080/api/dwrs/${jobID}/${dwrToEdit._id}`,
        genericChanges
      )
      .then((res) => setDwrToEdit(res.data))
      .catch((err) => console.error(err));
    setGenericChanges("");
  };
  const handleEqChange = (e) => {
    setEqChanges({ ...eqChanges, [e.target.name]: e.target.value });
  };
  const handleSubmitEqChange = (e) => {
    //here we are going to clear the state of the equipment changes and then submit the change to the database. we should be able to do this by the id.
    let eqID = e.target.dataset.eqid;
    axios
      .put(
        `http://localhost:8080/api/dwrs/equip/${jobID}/${dwrToEdit._id}/${eqID}`,
        eqChanges
      )
      .then((res) => setDwrToEdit(res.data))
      .catch((err) => console.error(err));
    setEqChanges("");
  };

  const handleIncidentChange = (e) => {
    setIncidentChanges({ ...incidentChanges, [e.target.name]: e.target.value });
  };
  const handleSubmitIncidentChange = (e) => {
    //here we are going to clear the state of the equipment changes and then submit the change to the database. we should be able to do this by the id.
    let incidentID = e.target.dataset.incidentid;
    axios
      .put(
        `http://localhost:8080/api/dwrs/${jobID}/${dwrToEdit._id}/${incidentID}`,
        incidentChanges
      )
      .then((res) => setDwrToEdit(res.data))
      .catch((err) => console.error(err));
    setIncidentChanges("");
  };

  const handleLoadsChange = (e) => {
    setLoadChanges({ ...loadChanges, [e.target.name]: e.target.value });
  };
  const handleSubmitLoads = (e) => {
    // console.log(loadChanges);
    // console.log(e.target.dataset.loadid);

    let loadID = e.target.dataset.loadid;
    axios
      .put(
        `http://localhost:8080/api/dwrs/loads/${jobID}/${dwrToEdit._id}/${loadID}`,
        loadChanges
      )
      .then((res) => setDwrToEdit(res.data))
      .catch((err) => console.error(err));
    setLoadChanges("");
  };

  const handleDelete = (e) => {
    axios
      .delete(`http://localhost:8080/api/dwrs/${dwrToEdit._id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
    //ONCE ITS DELETED, THIS FUNCTIONALITY IS GENERATING A REFRESH IN REAL TIME WITHOUT SLOWING DOWN THE APPLICATION
    onDeleted(); // 🔁 bump key -> full remount -> all local state reset
    navigate("/editDWRS");
  };

  const handlePDF = (e) => {
    console.log(jobsite.jobsiteName);
    console.log(dwrToEdit._id);

    axios
      .post(
        `http://localhost:8080/api/pdfs/generate-pdf/${dwrToEdit._id}`,
        {
          jobName: jobsite.jobsiteName,
          optionalNotes: notes,
        },
        { responseType: "blob" }
      )
      .then((res) => {
        //creating the pdf into a downloadable format
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.download = `Job_${jobsite.jobsiteName}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .finally(() => setNotes(""));
  };
  return (
    <div className="p-5">
      <Header title={"Edit DWR's"} />
      <h4 className="centerText">{jobsite.jobsiteName}</h4>
      {/* select a jobsite, this is checking to see if one has been selected and conditionally renders based on such  */}
      {!jobID ? (
        <>
          <p className="centerText">Select a Jobsite from the list below.</p>
          <Form.Select onChange={(e) => setJobID(e.target.value)}>
            <option>Open this select menu</option>
            {allJobsites.map((e) => (
              <option   value={e._id}>{e.jobsiteName}</option>
            ))}
          </Form.Select>
        </>
      ) : !dateSelected ? (
        // next check to see if a data has been selected.
        <DayPicker
          className="calendar"
          mode="single"
          selected={dateSelected}
          onSelect={setDateSelected}
          footer={"Pick a day."}
        />
      ) : !dwrToEdit ? (
        <>
          {" "}
          <p className="centerText">No DWR for the date selected</p>
          <Button
            id="basicBtn"
            className="centerBtn primaryBtn"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </>
      ) : (
        <>
          {/* {console.log(dwrToEdit)} */}
          <Accordions
            dwr={dwrToEdit}
            companyID={user.companyID}
            handleGoBack={handleGoBack}
            handleGenericChange={handleGenericChange}
            handleGenericSubmit={handleGenericSubmit}
            handleEqChange={handleEqChange}
            handleSubmitEqChange={handleSubmitEqChange}
            handleIncidentChange={handleIncidentChange}
            handleSubmitIncidentChange={handleSubmitIncidentChange}
            handleLoadsChange={handleLoadsChange}
            handleSubmitLoads={handleSubmitLoads}
            handleDelete={handleDelete}
          />
          <GeneratePdf
            handleClick={handlePDF}
            handleNotes={(e) => setNotes(e.target.value)}
          />
        </>
      )}
    </div>
  );
}
