import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import DWRTabs from "../../Components/DWRTabs/DWRTabs";
import "../Jobsite/Jobsite.css";
import ConstructionAppContext from "../../Context/ConstructionAppContext";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export default function Jobsite() {
  const { id } = useParams();
  //this has to do with the dat selected.
  const [selected, setSelected] = useState("");
  const [job, setJob] = useState({ jobsiteName: "" });
  const [canContinue, setCanContinue] = useState(false);

  const { user } = useContext(ConstructionAppContext);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/getJobsite/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSelect = (e) => {
    let selectedDate = e.toLocaleDateString();
        //make a call to the server to check if the date has already been put in the database.
            // this is parsing the date so I can send it to the server in a readable format, the server will transform it back into a date
    axios
      .get(
        `http://localhost:8080/api/dwrs/dates/${id}/${Date.parse(selectedDate)}`
      )
      .then((res) => {
        console.log(res.data);
        console.log(e.toLocaleDateString());
        if (res.data.length == 0) {
          setSelected(selectedDate);
          setCanContinue(true);
        } else {
          setCanContinue(false);
          setSelected("")
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <Header title={job.jobsiteName} />
      {/* {console.log(DayPicker)} */}
      <h6 className="text-center">Select a Day to Enter a Report</h6>
      {/* This is a node package with prebuilt code for a cute calendar, yay */}
      <DayPicker
        className="calendar"
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        footer={
          selected
            ? `Selected: ${selected}`
            : "Pick a day."
        }
      />
      {/* the tab will only display once the user has selected a date, to prevent them from NOT selecting a date, im passing in the jobsite ID, the company ID, the date selected in a readable format, and the users name*/}
      {selected ? (
        <DWRTabs
          jobsiteID={id}
          companyID={user.companyID}
          date={selected}
          user={`${user.firstName} ${user.lastName}`}
          submitted={() => setSelected(false)}
        />
      ) : null}
    </div>
  );
}

// function MyDatePicker() {
//
