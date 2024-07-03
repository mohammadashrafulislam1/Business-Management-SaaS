import axios from "axios";
import { createContext, useState } from "react";
import { endPoint } from "../forAll/forAll";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  
  console.log(user);

  const signUp = async (formData) => {
    const response = await axios.post(`${endPoint}/user/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data.newUser, response.data, response);
    setUser(response.data.newUser);
  };
  const signIn = async (formData) =>{
    console.log(formData)
    const response = await axios.post(`${endPoint}/user/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
  })
  console.log(response.data.newUser, response.data, response);
    setUser(response.data.newUser);
   }
  const authContextValue = {
    signUp,
    user,
    signIn
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
