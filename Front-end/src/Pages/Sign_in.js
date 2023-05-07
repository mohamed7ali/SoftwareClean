import React, { useState } from "react";
import "../Style_Pages/Sign_in.css";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../helper/storage";
import Header from "../Components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    err: [],
  });

  const LoginFun = (e) => {
    e.preventDefault();
    setLogin({ ...login, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/login", {
        Email: login.email,
        Password: login.password,
      })
      .then((resp) => {
        setLogin({ ...login, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/home");
      })
      .catch((errors) => {
        console.log(errors);
        setLogin({
          ...login,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <div>
      <Header />
      <h1 style={{ color: "white" }}>Eary System</h1>
      <div className=" login template  d-flex  justify-content-center align-items-center  vh-100 ">
        <div
          className="  form_container p-5 rounded "
          style={{ border: "3px solid black", backgroundColor: "white" }}
        >
          <form onSubmit={LoginFun}>
            <h3 className="text-center">Sign In</h3>

            <div className=" mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                name="email"
                required
                value={login.email}
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              ></input>
            </div>
            <div className=" mb-2">
              <label htmlFor="Password">Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control"
                required
                value={login.password}
                onChange={(e) =>
                  setLogin({ ...login, password: e.target.value })
                }
              ></input>
            </div>

            <div className="d-grid">
              <button
                className="btn "
                disabled={login.loading === true}
                style={{ backgroundColor: "rgb(55, 2, 104)", color: "white" }}
              >
                Sign in
              </button>
            </div>
            <p className="text-center mt-2">
              Forget{" "}
              <a href="contact" style={{ color: "rgb(55, 2, 104)" }}>
                Password?
              </a>
              <Link
                to="/signup"
                className="ms-2"
                style={{ color: "rgb(55, 2, 104)" }}
              >
                Sign up
              </Link>
            </p>
          </form>
          {login.err.map((error, index) => (
            <Alert
              key={index}
              style={{
                color: "white",
                width: 350,
                backgroundColor: "#690650",
                height: 90,
                borderRadius: 10,
              }}
            >
              {error.msg}
            </Alert>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
