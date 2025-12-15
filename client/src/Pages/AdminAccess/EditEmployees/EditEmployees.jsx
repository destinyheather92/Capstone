import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import ConstructionAppContext from "../../../Context/ConstructionAppContext";
import Header from "../../../Components/Header/Header";
import EditEmployeesModal from "../../../Components/Modals/EditEmployeesModal";
import EmployeeTable from "../../../Components/Tables/EmployeeTable";

export default function EditEmployees() {
  const { user } = useContext(ConstructionAppContext);
  const idToEdit = useRef(null);
  const [employees, setEmployees] = useState([]);
  const [employeeToSend, setEmployeeToSend] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/companyUsers/${user.companyID}`)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

    const handleAdd = () => {
    axios
      .post(`http://localhost:8080/api/user/registerNewEmployee`, {...employeeToSend, companyName:user.companyName, role:"foreman", companyID:user.companyID })
      .then((res) =>{console.log(res.data); setEmployees(res.data)})
      .catch((err) => console.error(err));

    setEmployeeToSend({});
  };

  const handleChange = (e) => {
    idToEdit.current = e.target.dataset.employeeid;
    setEmployeeToSend({ ...employeeToSend, [e.target.name]: e.target.value });
  };

  const handleEdit= ()=>{
    axios
      .put(`http://localhost:8080/api/user/${idToEdit.current}`, employeeToSend)
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
      setEmployeeToSend({})
  }
    const handleDelete = (e) => {
      let employeeid = e.target.dataset.employeeid;
      axios
        .delete(`http://localhost:8080/api/user/${employeeid}`)
        .then((res) => setEmployees(res.data))
        .catch((err) => console.error(err));
    };
  

  return (
    <div>
      <Header title="Edit Employees" />

      <EditEmployeesModal
        typeOf="Add New"
        validationNeeded={true}
        handleChange={(e) =>
          setEmployeeToSend({
            ...employeeToSend,
            [e.target.name]: e.target.value,
          })
        }
        handleSave={handleAdd}
      />

      <h5 className="text-center m-3">
        Below is a comprehensive list of all employees within {user.companyName}
        . Click to edit or delete.
      </h5>
      <EmployeeTable
        data={employees}
        className="table"
        handleChange={handleChange}
          handleSave={handleEdit}
          deleteClick={handleDelete}
      />
    </div>
  );
}
