import { useRef, useState, useEffect } from "react";
import { InfoCircle, Check, X } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "./api/axios";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    useRef.current?.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        REGISTER_URL,
        { name: user, password: pwd },
        {
          Headers: { "content-type": "application/json" },
        }
      );
    } catch (error) {
      setErrMsg(error?.response?.data?.message);
    }
  };

  return (
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
        {errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">
          Username
          <span className={validName ? "valid" : "hide"}>
            <Check color="green" />
          </span>
          <span className={validName || !user ? "hide" : "valid"}>
            <X color="red" />
          </span>
        </label>
        <input
          type="text"
          ref={userRef}
          id="username"
          onChange={(e) => setUser(e.target.value)}
          required
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          className={
            user && userFocus && !validName ? "instructions" : "offscreen"
          }
        >
          <InfoCircle />
          4 to 24 charactets <br />
          must begin with letter <br />
          letters,numbers,underscore,hyphen allowed.
        </p>
        <label htmlFor="password">
          Password
          <span className={validPwd ? "valid" : "hide"}>
            <Check color="green" />
          </span>
          <span className={validPwd || !pwd ? "hide" : "valid"}>
            <X color="red" />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          className={
            pwd && pwdFocus && !validPwd ? "instructions" : "offscreen"
          }
        >
          <InfoCircle />
          8 to 24 characters
          <br />
          must include a capital letter, small letter, a number and a special
          character.
          <br />
        </p>
        <label htmlFor="matchpassword">
          Confirm Password
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <Check color="green" />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "valid"}>
            <X color="red" />
          </span>
        </label>
        <input
          type="text"
          id="matchpassword"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <InfoCircle />
          Should be same as password you enter before.
        </p>
        <button disabled={!(validPwd && validMatch && validName)}>
          Sign Up
        </button>
      </form>
      <p>
        Already Registered?
        <br />
        <span className="line">
          <Link to="/login">Sign In</Link>
        </span>
      </p>
    </section>
  );
};

export default Register;
