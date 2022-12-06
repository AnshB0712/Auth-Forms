import React, { useEffect } from "react";
import { AxiosPrivate } from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestInterceptor = AxiosPrivate.interceptors.request.use(
      (config) => {
        if (!config?.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.token}`;
        }

        return config;
      },
      (err) => Promise.reject(err)
    );

    const responseInterceptor = AxiosPrivate.interceptors.response.use(
      (response) => response,
      async (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return AxiosPrivate(prevRequest);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      AxiosPrivate.interceptors.response.eject(responseInterceptor);
      AxiosPrivate.interceptors.request.eject(requestInterceptor);
    };
  }, [auth, refresh]);

  return AxiosPrivate;
};

export default useAxiosPrivate;
