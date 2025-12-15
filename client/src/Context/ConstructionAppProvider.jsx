import ConstructionAppContext from "./ConstructionAppContext";
import { useState } from "react";

export default function ConstructionAppProvider({ children }) {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    companyName:"",
    companyID:"",
    role:""
  });
  
  return (
    <ConstructionAppContext.Provider value={{ user, setUser }}>
      {children}
    </ConstructionAppContext.Provider>
  );
}
