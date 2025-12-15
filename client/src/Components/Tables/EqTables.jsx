import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { Table, Button } from "react-bootstrap";
import EditEquipmentModal from "../Modals/EditEquipmentModal";
//function to handle the sorting of data
import sortData from "./Utils/sortData";
export default function EqTables({
  className,
  data,
  optionalDelete,
  optionalDeleteClick,
  optionalEdit,
  handleChange, 
  handleSave
}) {
  const [sortTypeClicked, setSortTypeClicked] = useState(false);
  const [sortNameClicked, setSortNameClicked] = useState(false);
  const [nameSort, setNameSort] = useState([]);
  const [typeSort, setTypeSort] = useState([]);
  const [tableData, setTableData] = useState([]);

  //use effect to sort both ways
  useEffect(() => {
    setNameSort(sortData(data, "name"));
    setTypeSort(sortData(data, "type"));
    setTableData([...data]);
  }, [data]);
  
  //handle sort by tableData type based on user events.
  const handleTypeSort = () => {
    setSortTypeClicked(!sortTypeClicked);
    if (sortTypeClicked) {
      setTableData([...typeSort]);
    } else {
      setTableData([...typeSort.toReversed()]);
    }
  };
  //handle sort by name.
  const handleNameSort = () => {
    setSortNameClicked(!sortNameClicked);
    if (sortNameClicked) {
      setTableData([...nameSort]);
    } else {
      setTableData([...nameSort.toReversed()]);
    }
  };
  // optional delete is so I can reuse this table on the admin page
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
            <th>
              Type
              <span id="sort button">
                {" "}
                <FontAwesomeIcon
                  onClick={handleTypeSort}
                  className="sortIcon"
                  icon={sortTypeClicked ? faSortUp : faSortDown}
                />{" "}
              </span>
            </th>
            {optionalEdit ? <th>Edit</th> : null}
            {optionalDelete ? <th>Delete</th> : null}
          </tr>
        </thead>
        <tbody>
          {tableData.map((eq, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{eq.name}</td>
              <td>{eq.type}</td>
              {/* this is conditionally rendered if the table should be editable */}
              {optionalEdit ? (
                <td>
                  <EditEquipmentModal
                    handleChange={handleChange}
                    eqID={eq._id}
                    typeOf={"Edit"}
                    handleSave={handleSave}
                  />
                </td>
              ) : null}
              {optionalDelete ? (
                <td>
                  <Button
                    data-eqid={eq._id}
                    id="basicBtn"
                    className="centerBtn primaryBtn"
                    onClick={optionalDeleteClick}
                  >
                    Delete
                  </Button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
