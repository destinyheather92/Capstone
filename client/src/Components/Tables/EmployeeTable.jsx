import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
//function to handle the sorting of data
import sortData from "./Utils/sortData";
import EditEmployeesModal from "../Modals/EditEmployeesModal";
import "./Tables.css";

export default function EmployeeTable({
  className,
  data,
  handleChange,
  handleSave,
  deleteClick,
}) {
  const [tableData, setTableData] = useState([]);
  const [sortNameClicked, setSortNameClicked] = useState(false);
  const [nameSort, setNameSort] = useState([]);
  //use effect to sort
  useEffect(() => {
    setNameSort(sortData(data, "lastName"));
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
              Last Name
              <span id="sort button">
                {" "}
                <FontAwesomeIcon
                  onClick={handleNameSort}
                  className="sortIcon"
                  icon={sortNameClicked ? faSortUp : faSortDown}
                />{" "}
              </span>
            </th>
            <th>First Name</th>
            <th>Username</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((user, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{user.lastName}</td>
              <td>{user.firstName}</td>
              <td>{user.username}</td>
              {/* I don't want the admin user to be able to edit there information here or delete their account.  */}
              <td>
                {user.role != "admin" && (
                  <EditEmployeesModal
                    handleChange={handleChange}
                    employeeID={user._id}
                    typeOf={"Edit"}
                    handleSave={handleSave}
                  />
                )}
              </td>

              <td>
                {user.role != "admin" && (
                  <Button
                    data-employeeid={user._id}
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={deleteClick}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
