import React, { useState, useEffect } from "react";
import "../Style_Pages/New_Users_Queue.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import axios from "axios";

const NewUsersQueue = () => {
  const { id } = JSON.parse(localStorage.getItem("user"));
  const [usersArray, setUsersArray] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/newUsers/`, { headers: { Id: id } })
      .then((res) => {
        setUsersArray(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        user
      ]);
    } else {
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser !== user)
      );
    }
  };

  const handleAddClick = () => {
    console.log(selectedUsers);
    if (selectedUsers.length > 0) {
      selectedUsers.forEach(async (user) => {
        console.log(id);
        console.log(user.Id);

        axios
          .post(
            `http://localhost:4000/newUsers/${user.Id}`,
            {},
            {
              headers: {
                Id: id,
              },
            }
          )
          .then((res) => {
            console.log(res.data.message);
            setSelectedUsers((prevSelectedUsers) => []);
            // remove added user from the state
            setUsersArray((prevUsers) =>
              prevUsers.filter((currentUser) => currentUser !== user)
            );
            alert(`${user.Name} has been added!`);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };

  const handleDeleteClick = () => {
    if (selectedUsers.length > 0) {
      selectedUsers.forEach(async (user) => {
        axios
          .delete(`http://localhost:4000/newUsers/${user.Id}`, {
            headers: {
              Id: id,
            },
          })
          .then((res) => {
            console.log(res.data.message);
            setSelectedUsers((prevSelectedUsers) => []);
            // remove deleted user from the state
            setUsersArray((prevUsers) =>
              prevUsers.filter((currentUser) => currentUser !== user)
            );
            alert(`${user.Name} has been deleted!`);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  };

  return (
    <>
      <Header />

      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th>check</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {usersArray.map((user) => (
              <tr key={user.Id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, user)}
                  />
                </td>
                <td>{user.Id}</td>
                <td>{user.Name}</td>
                <td>{user.Email}</td>
                <td>{user.Phone}</td>
            
                
              </tr>
            ))}
          </tbody>
        </table>
        <br />

     <button 
     onClick={handleAddClick}
     disabled={selectedUsers.length === 0}>
         ADD
          
        </button>

       <button 
     onClick={handleDeleteClick}
     disabled={selectedUsers.length === 0}>
      Delete
      
        </button>
      </div>

      <Footer />
    </>
  );
};

export default NewUsersQueue;
