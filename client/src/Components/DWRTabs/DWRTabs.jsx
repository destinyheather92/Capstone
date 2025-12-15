import { Button, Tab, Tabs, InputGroup, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import EquipmentUsedTab from "./TABS/EquipmentUsedTab";
import IncidentsTab from "./TABS/IncidentsTab";
import LoadsTab from "./TABS/LoadsTab";
import axios from "axios";

function DWRTabs({ companyID, date, user, jobsiteID, submitted }) {
  // this is from the database
  const [equipment, setEquipment] = useState([]);
  // these are for the changes in the tabs
  const [dwrDate, setDwrDate] = useState(date);
  const [workersOnSite, setWorkersOnSite] = useState(0);
  const [eqChange, setEqChange] = useState({
    name: "",
    quantity: "",
    hours: "",
  });
  const [incidentChange, setIncidentChange] = useState({
    date: date,
    time: "",
    incident: "",
  });
  const [loadsChange, setLoadsChange] = useState({
    quantity: "",
    material: "",
    source: "import",
  });
  //once the add button is clicked these are updated - which is what will be submitted to the database eventually
  const [addedEquipment, setAddedEquipment] = useState([]);
  const [addIncident, setAddIncident] = useState([]);
  const [addLoads, setAddLoads] = useState([]);
  const [submit, setSubmit] = useState(false);

  //this is pulling all the equipment from the database on the mount of the page
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/equipment/${companyID}`)
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  }, []);
  //useEffect to watch when date is changed to ensure it is changed for the incident, if needed, and dwr date. The incident will only be added if the user clicks and adds it. Same applies for loads and equipment used.
  useEffect(() => {
    setIncidentChange({ ...incidentChange, date: date });
    setDwrDate(date);
    setSubmit(false);
  }, [date]);

  //   EVENT LISTENERS TO ADD, meaning it is ready to be submitted to the data base in the correct format whenever the user clicks the submit dwr button.
  const handleAddEquip = () => {
    //this is changing what is stored in equipment so the user cannot select the same equipment more than once. Its essentially removing it from the drop down once its been submitted. : ) 
    let filteredEq = equipment.filter((e) => e.name != eqChange.name);
    setEquipment(filteredEq);
    setAddedEquipment([...addedEquipment, eqChange]);
    // reset the state
    setEqChange({ name: "", quantity: "", hours: "" });
  };
  const handleAddIncident = () => {
    setAddIncident([...addIncident, incidentChange]);
    setIncidentChange({ date: "", time: "", incident: "" });
  };
  const handleAddLoads = () => {
    setAddLoads([...addLoads, loadsChange]);
    setLoadsChange({ quantity: "", material: "", source: "" });
  };

  const handleSubmit = (e) => {
    let serverObj = {
      date: dwrDate,
      workersOnSite,
      enteredBy: user,
      incidents: addIncident,
      loads: addLoads,
      equipmentUsed: addedEquipment,
    };

    console.log(serverObj);

    axios
      .post(`http://localhost:8080/api/dwrs/${jobsiteID}`, serverObj)
      .then((res) => setSubmit(true))
      .catch((err) => console.error(err));

    // reset state.
    setAddIncident([]);
    setAddedEquipment([]);
    setAddLoads([]);
    setWorkersOnSite(0);

    //gives the user time to see it has been submitted before it changes to
    setTimeout(() => {
      console.log("Delayed for 3 seconds.");
      submitted();
    }, 3000);
  };
  return (
    <>
      <div className="tabContainer">
        <Tabs defaultActiveKey="eqUsed" className="mb-3 " fill>
          {/***********   Tab One  ****************** */}
          <Tab
            eventKey="eqUsed"
            title="Equipment Used"
            className="tabContent p-3"
          >
            <EquipmentUsedTab
              handleEqChange={(e) => {
                setEqChange({ ...eqChange, [e.target.name]: e.target.value });
              }}
              equipment={equipment}
              eqChange={eqChange}
              handleAddEquip={handleAddEquip}
            />
            {/***********   Tab TWO  ****************** */}
          </Tab>
          <Tab
            eventKey="incidents"
            title="Incidents"
            className="tabContent p-3"
          >
            <p className="text-center">Date : {date}</p>
            <IncidentsTab
              incidentChange={incidentChange}
              handleIncidentChange={(e) =>
                setIncidentChange({
                  ...incidentChange,
                  [e.target.name]: e.target.value,
                })
              }
              handleAddIncident={handleAddIncident}
            />
          </Tab>

          {/***********   Tab THREE  ****************** */}
          <Tab eventKey="loads" title="Loads" className="tabContent">
            <LoadsTab
              loadsChange={loadsChange}
              handleLoadsChange={(e) =>
                setLoadsChange({
                  ...loadsChange,
                  [e.target.name]: e.target.value,
                })
              }
              handleAddLoads={handleAddLoads}
            />
          </Tab>
          {/* //workers on site Tab */}
          <Tab
            eventKey="workers"
            title="Workers On Site"
            className="tabContent"
          >
            <InputGroup className="mb-3">
              <InputGroup.Text>Workers</InputGroup.Text>
              <Form.Control
                type="number"
                name="workersOnSite"
                value={workersOnSite}
                onChange={(e) => setWorkersOnSite(e.target.value)}
              />
            </InputGroup>
          </Tab>
        </Tabs>
      </div>
      {submit && <p className="success centerText">Successfully Submitted! </p>}

      <Button
        type="submit"
        id="basicBtn"
        className="centerBtn"
        onClick={handleSubmit}
      >
        Submit DWR
      </Button>
    </>
  );
}

export default DWRTabs;
