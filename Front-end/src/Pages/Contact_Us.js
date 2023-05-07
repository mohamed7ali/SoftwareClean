import React, { useState, useEffect } from "react";
import "../Style_Pages/Contact_Us.css";
import Alert from "react-bootstrap/Alert";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import axios from "axios";

import { Button } from "bootstrap";
import { getAuthUser } from "../helper/storage";

const ContactUs = () => {
  const auth=getAuthUser();
  const [addContact, setContact] = useState({
    name:"",
    email:"",
    subject:"",
    message:"",
    loading: false,
    err: [],
  });
  
  const AddContact = (e) => {
    e.preventDefault();
    setContact({ ...addContact, loading: true, err: [] });
    axios
      .post("http://localhost:4000/contactUs/", {
        name:addContact.name,
        email:addContact.email,
        subject:addContact.subject,
        message:addContact.message,
      
      },{headers:{id:auth.id}})
      .then((resp) => {
        console.log(resp);
        setContact({ ...addContact, loading: false, err: [] });
        alert(resp.data.msg);
      
      })
      .catch((errors) => {
        console.log(errors);
        setContact({
          ...addContact,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };
  return (
    <>
      <Header />

      <h1>Contact Us</h1>
      <div className="container">
        <h2>Get in touch</h2>
        <form onSubmit={AddContact} method="post">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your name.."   value={addContact.name}
                onChange={(e) => setContact({ ...addContact, name: e.target.value })}/>

          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Your email.."
            value={addContact.email}
                onChange={(e) => setContact({ ...addContact, email: e.target.value })}
          />

          <label for="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject.."
            value={addContact.subject}
                onChange={(e) => setContact({ ...addContact, subject: e.target.value })}
          />

          <label for="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here.."
            value={addContact.message}
                onChange={(e) => setContact({ ...addContact, message: e.target.value })}
          ></textarea>

         <button type="submit">Send</button>
        </form>
        {/* {addContact.err.map((error, index) => (
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
              {error.message}
            </Alert>
          ))} */}
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
