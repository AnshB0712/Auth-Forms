import React from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      setAuth({});
      await axios.get("/logout", { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };
  return logout;
};

export default useLogout;
