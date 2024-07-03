import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { endPoint } from "../forAll/forAll";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user state to null
  const [loader, setLoader] = useState(true); // Set loader to true initially
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      setLoader(true); // Set loader to true when starting to fetch user data
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (!token) {
          setLoader(false);
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`${endPoint}/user/me`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        setError(error.message);
        setUser(null);
      } finally {
        setLoader(false); // Set loader to false after fetching is complete
      }
    };

    getCurrentUser();
  }, []);

  const signUp = async (formData) => {
    setLoader(true);
    try {
      const response = await axios.post(`${endPoint}/user/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.newUser, response.data, response);
      setUser(response.data.newUser);
      return response;
    } catch (e) {
      console.log(e);
      setError(e.response.data.error || e.message );
    } finally {
      setLoader(false);
    }
  };
  const signIn = async (formData) => {
    setLoader(true);
    try {
      const response = await axios.post(`${endPoint}/user/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);  // Update this line to set the correct user data
      return response;
    } catch (e) {
      console.log(e.message);
      setError(e.message);
      throw e;
    } finally {
      setLoader(false);
    }
  };
  const logOut = ()=>{
    setLoader(true);
    localStorage.removeItem('token');
    setLoader(false);
    setUser(null)
  }
  const authContextValue = {
    signUp,
    user,
    loader,
    signIn,
    error,
    setLoader,
    logOut
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
