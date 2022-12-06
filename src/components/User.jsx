import axios from "../api/axios";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { formToJSON } from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const result = await AxiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(result);
        isMounted && setUsers(result.data);
      } catch (error) {
        console.log(error);
        if (error?.name !== "CanceledError")
          navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users</h2>
      {users?.length ? (
        <ul style={{ listStyle: "none" }}>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to show.</p>
      )}
    </article>
  );
};

export default User;
