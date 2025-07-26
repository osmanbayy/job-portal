/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { user } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({
    jobTitle: "",
    jobLocation: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  const [jobs, setJobs] = useState([]);

  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  // Function to fetch jobs
  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      if (data.success) {
        setJobs(data.jobs);
      } else {
        toast.error(data.message || "Failed to fetch jobs");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch jobs";
      toast.error(errorMessage);
    }
  };

  // Function to fetch company data
  const fetchCompanyData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message || "Failed to fetch company data");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch company data";
      toast.error(errorMessage);
    }
  };

  // Function to fetch user data
  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
        // setUserApplications(data.applications);
      } else {
        // Don't show error toast for "User not found" - this is expected for new Google users
        if (data.message && data.message.toLowerCase().includes("user not found")) {
          console.log("User not found in backend - this is normal for new Google users");
          // Optionally create user here if needed
          await createUser();
        } else {
          toast.error(data.message || "Failed to fetch user data");
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch user data";
      
      if (errorMessage.toLowerCase().includes("user not found")) {
        // Optionally create user here if needed
        await createUser();
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Function to create user in backend (optional)
  const createUser = async () => {
    if (!user) return;
    
    try {
      const token = await getToken();
      const userData = {
        name: `${user.firstName} ${user.lastName}`,
        email: user.emailAddresses[0]?.emailAddress,
        clerkId: user.id,
        imageUrl: user.imageUrl,
      };
      
      const { data } = await axios.post(`${backendUrl}/api/users/create`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (data.success) {
        setUserData(data.user);
        console.log("User created successfully in backend");
      }
    } catch (error) {
      console.error("Failed to create user in backend:", error);
    }
  };

  // Initial setup effect
  useEffect(() => {
    fetchJobs();

    const storedCompanyToken = localStorage.getItem("companyToken");
    if (storedCompanyToken) {
      setCompanyToken(storedCompanyToken);
    }
  }, []);

  // Fetch company data when companyToken changes
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken]);

  // Fetch user data when user changes
  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      // Clear user data when user logs out
      setUserData(null);
      setUserApplications([]);
    }
  }, [user]);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    backendUrl,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    fetchJobs,
    fetchUserData,
    createUser,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
