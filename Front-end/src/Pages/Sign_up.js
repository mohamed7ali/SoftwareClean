import React, { useState } from "react";
import "../Style_Pages/Sign_in.css";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const SignUp = () => {
  const [register, setRegister] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    register:"",
    loading: false,
    err: [],
    text: "",
  });
  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/auth/register", {
        Email: register.email,
        Password: register.password,
        Name: register.name,
        Phone: register.phone,
        Status:0,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [], text: "" });
        alert(resp.data.message);
      })
      .catch((errors) => {
        setRegister({
          ...register,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  return (
    <div>
      <Header />
      <h1 style={{ color: "white" }}>Eary System</h1>
      <div className=" signup template  d-flex  justify-content-center align-items-center  vh-100 ">
        <div
          className="  form_container p-5 rounded text-white "
          style={{ border: "3px solid black", backgroundColor: "white" }}
        >
          <form onSubmit={RegisterFun}>
            <h3 className="text-center text-dark">Sign Up</h3>

            <div className=" mb-2">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                value={register.name}
                onChange={(e) =>
                  setRegister({ ...register, name: e.target.value })
                }
                className="form-control"
              ></input>
            </div>

            <div className=" mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                value={register.email}
                onChange={(e) =>
                  setRegister({ ...register, email: e.target.value })
                }
              ></input>
            </div>

            <div className=" mb-2">
              <label htmlFor="Password">Password</label>
              <input
                type="Password"
                placeholder="Enter Password"
                className="form-control"
                value={register.password}
                onChange={(e) =>
                  setRegister({ ...register, password: e.target.value })
                }
              ></input>
            </div>
            <div className=" mb-2">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                className="form-control"
                value={register.phone}
                onChange={(e) =>
                  setRegister({ ...register, phone: e.target.value })
                }
              ></input>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                disabled={register.loading === true}
                className="btn "
                style={{ backgroundColor: "rgb(55, 2, 104)", color: "white" }}
              >
                Sign Up
              </button>
            </div>

            {register.err.map((error, index) => (
              <Alert
                key={index}
                style={{
                  color: "white",
                  width: 350,
                  backgroundColor: "#690650",
                  height: 80,
                  borderRadius: 10,
                }}
              >
                {error.msg}
              </Alert>
            ))}

            <Link to="/" className="ms-2" style={{ color: "rgb(55, 2, 104)" }}>
              Login
            </Link>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default SignUp;
