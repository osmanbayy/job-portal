import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import { Toaster } from "react-hot-toast";
import { Check, X } from "lucide-react";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);
  return (
    <div className={`${showRecruiterLogin && "h-screen overflow-hidden"}`}>
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
      </Routes>
    </div>
  );
};

export default App;
