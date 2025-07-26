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
        position="top-right"
        toastOptions={{
          style: {
            background:
              theme === "dark"
                ? "rgba(30, 41, 59, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
            color: theme === "dark" ? "#f8fafc" : "#1e293b",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border:
              theme === "dark"
                ? "1px solid rgba(148, 163, 184, 0.2)"
                : "1px solid rgba(148, 163, 184, 0.1)",
            borderRadius: "12px",
            boxShadow:
              theme === "dark"
                ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)"
                : "0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "400px",
          },
          success: {
            duration: 3500,
            icon: (
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30">
                <Check className="w-3 h-3 text-green-500" />
              </div>
            ),
          },
          error: {
            duration: 3500,
            icon: (
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30">
                <X className="w-3 h-3 text-red-500" />
              </div>
            ),
          },
          loading: {
            style: {
              background:
                theme === "dark"
                  ? "rgba(30, 41, 59, 0.8)"
                  : "rgba(255, 255, 255, 0.8)",
              color: theme === "dark" ? "#f8fafc" : "#1e293b",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border:
                theme === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.2)"
                  : "1px solid rgba(148, 163, 184, 0.1)",
              borderRadius: "12px",
              boxShadow:
                theme === "dark"
                  ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)"
                  : "0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)",
              padding: "12px 16px",
              fontSize: "14px",
              fontWeight: "500",
              maxWidth: "400px",
            },
            icon: (
              <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30">
                <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ),
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
