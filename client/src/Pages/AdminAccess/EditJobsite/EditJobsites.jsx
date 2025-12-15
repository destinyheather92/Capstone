import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import ConstructionAppContext from "../../../Context/ConstructionAppContext";
import Header from "../../../Components/Header/Header";
import EditJobsiteModal from "../../../Components/Modals/EditJobsiteModal";
import JobsiteTable from "../../../Components/Tables/JobsiteTable";
import "./EditJobsite.css";
export default function EditJobsites() {
  const { user } = useContext(ConstructionAppContext);
  const idToEdit = useRef(null);
  const [jobsites, setJobsites] = useState([]);
  const [jobsiteToSend, setJobsitesToSend] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/jobs/${user.companyID}`)
      .then((res) => {
        setJobsites(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = () => {
    axios
      .post(`http://localhost:8080/api/jobs/${user.companyID}`, jobsiteToSend)
      .then((res) => setJobsites(res.data))
      .catch((err) => console.error(err));
    setJobsitesToSend({});
  };

  //just grabbing a hold of the jobs id to edit, this is used with the useRef hook so that it is not continually updated with state
  const handleChange = (e) => {
    idToEdit.current = e.target.dataset.jobsiteid;
    setJobsitesToSend({ ...jobsiteToSend, [e.target.name]: e.target.value });
  };

  const handleDelete = (e) => {
    let jobsiteid = e.target.dataset.jobsiteid;
    axios
      .delete(`http://localhost:8080/api/jobs/${jobsiteid}`)
      .then((res) => setJobsites(res.data))
      .catch((err) => console.error(err));
  };

  const handleEdit = () => {
    axios
      .put(`http://localhost:8080/api/jobs/${idToEdit.current}`, jobsiteToSend)
      .then((res) => setJobsites(res.data))
      .catch((err) => console.error(err));
      setJobsitesToSend({})
  };
  return (
    <div>
      <Header title={"Edit Jobsites"} />
      <EditJobsiteModal
        typeOf="Add New"
        validationNeeded={true}
        handleChange={(e) =>
          setJobsitesToSend({
            ...jobsiteToSend,
            [e.target.name]: e.target.value,
          })
        }
        handleSave={handleAdd}
      />
      <h5 className="text-center m-3">
        Below is a comprehensive list of all jobsites within {user.companyName}.
        Click to edit or delete.
      </h5>
      <JobsiteTable
        data={jobsites}
        className="jobTable"
        handleChange={handleChange}
        handleSave={handleEdit}
        deleteClick={handleDelete}
      />
    </div>
  );
}
