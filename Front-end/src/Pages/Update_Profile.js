import { useState } from "react";
import "../Style_Pages/Update_File.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import React from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../helper/storage";
const ProfileUpdateForm = () => {
  const auth = getAuthUser();
  const [update, setUpdates] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    err: [],
  });
  const { id } = JSON.parse(localStorage.getItem("user"));
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdates({ ...update, err: [] });
    axios
      .put(`http://localhost:4000/users/${id}`, {
        Name: update.name,
        Email: update.email,
        Password: update.password,
        Phone: update.phone,
      })
      .then((res) => {
        console.log(res);
        // handle success
        setUpdates({
          ...update,
        });
        alert(res.data.msg);
      })
      .catch((error) => {
        // handle error
        setUpdates({
          ...update,
          err: error.response.data.errors,
        });
      });
  };
  return (
    <>
      <Header />

      <div className="form-container">
        <h1 className="form-title">Update Profile</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              name="Name"
              placeholder={auth.name}
              value={update.name}
              onChange={(e) => setUpdates({ ...update, name: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              type="text"
              name="Phone"
              value={update.phone}
              onChange={(e) => setUpdates({ ...update, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="Email"
              name="Email"
              placeholder={auth.Email}
              value={update.email}
              onChange={(e) => setUpdates({ ...update, email: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="Password"
              name="Password"
              value={update.password}
              onChange={(e) =>
                setUpdates({ ...update, password: e.target.value })
              }
            />
          </div>
          <button type="submit"> Save Changes</button>
          {update.err.map((error, index) => (
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
        </form>
      </div>

      <Footer />
    </>
  );
};

export default ProfileUpdateForm;
