import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
//function to handle the sorting of data
import sortData from "./Utils/sortData";
import EditJobsiteModal from "../Modals/EditJobsiteModal";

export default function JobsiteTable({
  className,
  data,
  handleChange,
  handleSave,
  deleteClick
}) {
  const [tableData, setTableData] = useState([]);
  const [sortNameClicked, setSortNameClicked] = useState(false);
  const [nameSort, setNameSort] = useState([]);
  //use effect to sort
  useEffect(() => {
    setNameSort(sortData(data, "jobsiteName"));
    setTableData([...data]);
  }, [data]);
  //handle sort by name.
  const handleNameSort = () => {
    setSortNameClicked(!sortNameClicked);
    if (sortNameClicked) {
      setTableData([...nameSort]);
    } else {
      setTableData([...nameSort.toReversed()]);
    }
  };
  return (
    <div>
      <Table striped bordered hover className={`${className}  mt-5`}>
        <thead>
          <tr>
            <th>#</th>
            <th>
              Name
              <span id="sort button">
                {" "}
                <FontAwesomeIcon
                  onClick={handleNameSort}
                  className="sortIcon"
                  icon={sortNameClicked ? faSortUp : faSortDown}
                />{" "}
              </span>
            </th>
            <th>Lead Foreman</th>
            <th>Deadline</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((job, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{job.jobsiteName}</td>
              <td>{job.leadForeman}</td>
              <td>{job.deadline}</td>
    
                <td>
                  <EditJobsiteModal
                    handleChange={handleChange}
                    jobSiteID={job._id}
                    typeOf={"Edit"}
                    handleSave={handleSave}
                  />
                </td>
        
                <td>
                  <Button
                    data-jobsiteid={job._id}
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={deleteClick}
                  >
                    Delete
                  </Button>
                </td>
      
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
