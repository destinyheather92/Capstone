import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import NavBar from "./Components/Navbar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RegisterPage from "./Pages/Register/RegisterPage";
import LogIn from "./Components/Forms/LogIn";
import Jobsites from "./Pages/AllJobsites/Jobsites";
import Jobsite from "./Pages/Jobsite/Jobsite";
import ViewEquipment from "./Pages/ViewEquipment/ViewEquipment";
import EditEquipment from "./Pages/AdminAccess/EditEquipment/EditEquipment";
import EditJobsites from "./Pages/AdminAccess/EditJobsite/EditJobsites";
import EditEmployees from "./Pages/AdminAccess/EditEmployees/EditEmployees";
import EditProfile from "./Pages/AdminAccess/EditProfile/EditProfile";
import EditDWRs from "./Pages/AdminAccess/EditDWRs/EditDWRs";
import Error from "./Pages/Error/Error";
import ConstructionAppProvider from "./Context/ConstructionAppProvider";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import "./App.css";


function App({ docId }) {
  const [refreshKey, setRefreshKey] = useState(0);
  return (
    <>
      <ConstructionAppProvider>
        <Router>
          <NavBar />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route
              path="/jobsites"
              element={<ProtectedRoute element={Jobsites} />}
            />
            <Route
              path="/jobsites/:id"
              element={<ProtectedRoute element={Jobsite} />}
            />
            <Route
              path="/equipment"
              element={<ProtectedRoute element={ViewEquipment} />}
            />
            {/* admin protectedRoutes */}
            <Route
              path="/editEquipment"
              element={<ProtectedRoute element={EditEquipment} />}
            />
            <Route
              path="/editJobsites"
              element={<ProtectedRoute element={EditJobsites} />}
            />
            <Route path="*" element={<Error />} />

            <Route
              path="/editEmployees"
              element={<ProtectedRoute element={EditEmployees} />}
            />
            <Route
              path="/editProfile"
              element={<ProtectedRoute element={EditProfile} />}
            />
            <Route
              path="/editDWRS"
              element={
                <ProtectedRoute
                  key={`${docId}-${refreshKey}`}
                  docId={docId}
                  onDeleted={() => setRefreshKey((k) => k + 1)}
                  element={EditDWRs}
                />
              }
            />
          </Routes>
        </Router>
      </ConstructionAppProvider>
    </>
  );
}

export default App;
