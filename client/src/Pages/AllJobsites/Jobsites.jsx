import React, { useContext, useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import Header from "../../Components/Header/Header";
import ConstructionAppContext from "../../Context/ConstructionAppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../AllJobsites/Jobsites.css"
export default function Jobsites() {
  const { user} = useContext(ConstructionAppContext);
  const [jobsites, setJobsites] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    let companyID = user.companyID;
    axios
      .get(`http://localhost:8080/api/jobs/${companyID}`)
      .then((res) => setJobsites(res.data));
  }, []);
  return (
    <div className="p-5 m-2">
      <Header title={`Jobsites for ${user.companyName}`} />
      {jobsites.length==0? <p className="text-center error" >No Jobsites entered at this time </p>:    <p className="text-center">Click on a Jobsite Below to Add Report </p>}
  
      <div id="jobsitesParent">
      {jobsites.map((e, i) => (
        <Cards
          textColor="white"
          key={i}
          style={{ width: "18rem", background: `var(--primary)` }}
          header={e.jobsiteName.toUpperCase()}
          title={e.leadForeman}
          text = {`Deadline: ${e.deadline}`}
          onClickCard={"Add Dwr"}
          className="jobsiteCards"
          btnText="Add DWR"
          handleClick={()=>navigate(`/jobsites/${e._id}`)}
        />
      ))}
      </div>
    </div>
  );
}
