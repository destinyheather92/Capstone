import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Header from "../../Components/Header/Header";
import EqTables from "../../Components/Tables/EqTables";
import ConstructionAppContext from "../../Context/ConstructionAppContext";
import "../ViewEquipment/ViewEquipment.css";
export default function ViewEquipment() {
  const { user } = useContext(ConstructionAppContext);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/equipment/${user.companyID}`)
      .then((res) => setEquipment(res.data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <Header title={"Equipment"} />
{equipment.length==0? <p className="text-center error">No equipment  entered at this time</p>:      <>
        {" "}
        <h6 className="text-center">
          Below is a comprehensive list of all equipment within the company.
        </h6>
        <EqTables className="eqTable" data={equipment} />
      </>}

    </div>
  );
}
