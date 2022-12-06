import React from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const result = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => ({
      ...prev,
      roles: result.data?.roles,
      token: result.data?.accessToken,
    }));
    return result.data?.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
