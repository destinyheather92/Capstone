import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import ConstructionAppContext from "../../../Context/ConstructionAppContext";
import Header from "../../../Components/Header/Header";
import EqTables from "../../../Components/Tables/EqTables";
import EditEquipmentModal from "../../../Components/Modals/EditEquipmentModal";

export default function EditEquipment() {
  const { user } = useContext(ConstructionAppContext);
  const idToEdit = useRef(null);
  const [eq, setEq] = useState([]);
  const [eqToSend, setEqToSend] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/equipment/${user.companyID}`)
      .then((res) => setEq(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = () => {
    axios
      .put(`http://localhost:8080/api/equipment/${idToEdit.current}`, eqToSend)
      .then((res) => setEq(res.data))
      .catch((err) => console.error(err));
    setEqToSend({});
  };

  const handleAdd = () => {
    axios
      .post(`http://localhost:8080/api/equipment/${user.companyID}`, eqToSend)
      .then((res) => setEq(res.data))
      .catch((err) => console.error(err));
    setEqToSend({});
  };
  const handleDelete = (e) => {
    //pulling the id of the attribute Ive given on the btn which is the equipment's id from the database, then making a call to the server to delete the post
    let eqID = e.target.dataset.eqid;
    axios
      .delete(`http://localhost:8080/api/equipment/${eqID}`)
      .then((res) => setEq(res.data))
      .catch((err) => console.error(err));
  };
  return (
    <div>
      <Header title={"Edit Equipment"} />
      {/* this is an add Button  */}
      <EditEquipmentModal
        typeOf="Add New"
        handleChange={(e) =>
          setEqToSend({ ...eqToSend, [e.target.name]: e.target.value })
        }
        handleSave={handleAdd}
        validationNeeded={true}
      />
      <h5 className="text-center m-3">
        Below is a comprehensive list of all equipment within the company. Click
        to edit or delete.
      </h5>

      <EqTables
        className={"eqTable"}
        data={eq}
        optionalDelete={true}
        optionalDeleteClick={handleDelete}
        optionalEdit={true}
        handleChange={(e) => {
          //just grabbing a hold of the equipments id to edit, this is used with the useRef hook so that it is not continually updated with state
          idToEdit.current = e.target.dataset.eqid;
          setEqToSend({ ...eqToSend, [e.target.name]: e.target.value });
        }}
        handleSave={handleEdit}
      />
    </div>
  );
}
