import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "./api/axios";
import { useAuth } from "./context/AuthProvider";

const Login = () => {
  const userRef = useRef();
  const LOGIN_URL = "/auth";

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    useRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth({
        user,
        token: result?.data?.accessToken,
        roles: result?.data?.roles,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setErrMsg(error?.response?.data?.message);
    }
  };

  return (
    <section>
      <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          ref={userRef}
          id="username"
          onChange={(e) => setUser(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button disabled={!pwd || !user}>Sign In</button>
        <div className="persistCheck">
          <input
            type={"checkbox"}
            id="persist"
            checked={persist}
            onChange={() => setPersist((p) => !p)}
          />
          <label htmlFor="persist">Remember Me</label>
        </div>
      </form>
      <p>
        Not Registered?
        <br />
        <span className="line">
          <Link to="/register">Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
