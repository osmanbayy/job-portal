import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/admin_pages/Dashboard";
import AddJob from "./pages/admin_pages/AddJob";
import ManageJobs from "./pages/admin_pages/ManageJobs";
import ViewApplications from "./pages/admin_pages/ViewApplications";
import "quill/dist/quill.snow.css";
import { ThemeContext } from "./context/ThemeContext";
import AboutUs from "./pages/AboutUs";

const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`${showRecruiterLogin && "h-screen overflow-hidden"} ${
        theme === "dark" ? "bg-[#090a15]" : "bg-cyan-50"
      } transition-colors duration-500`}
    >
      <Toaster
        toastOptions={{
          style: {
            background: "#1e293b",
            color: "#fff",
          },
          success: {
            duration: 3000,
            style: {
              background: "#16a34a",
              color: "#fff",
            },
            iconTheme: {
              primary: "#1e493b",
              secondary: "#fff",
            },
            icon: <Check />,
          },
          error: {
            duration: 3000,
            style: {
              background: "#dc2626",
              color: "#fff",
            },
            icon: <X />,
          },
        }}
      />
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/about" element={<AboutUs />} />

        {companyToken ? (
          <Route path="/dashboard" element={<Dashboard />}>
            <>
              <Route path="add-job" element={<AddJob />} />
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </>
          </Route>
        ) : null}
      </Routes>
    </div>
  );
};

export default App;
