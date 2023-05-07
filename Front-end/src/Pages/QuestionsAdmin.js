import React ,{useState,useEffect} from "react";

import "../Style_Pages/QuestionAdmin.css";
import { Link } from 'react-router-dom';
import axios from "axios";

import Header from "../Components/Header";
import Button from "../Components/Button";
import { getAuthUser } from "../helper/storage";
import { setQuestion } from "../helper/SetQuestion";
import Footer from "../Components/Footer";



export function QuestionsAdmin (){

  const { id } = JSON.parse(localStorage.getItem("user"));
  const [usersArray, setUsersArray] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/quizzes/`)
      .then((res) => {
        setUsersArray(res.data);
        usersArray.push(res.data)
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

 

  const handleDeleteClick = () => {
    if (selectedUsers.length > 0) {
      selectedUsers.forEach(async (user) => {
        axios
          .delete(`http://localhost:4000/quizzes/${user.Id}`, {
            headers: {
              Id: id,
            },
          })
          .then((res) => {
            console.log(res.data.message);
            console.log(res.data);
            setSelectedUsers((prevSelectedUsers) => []);
            // remove deleted user from the state
            setUsersArray((prevUsers) =>
              prevUsers.filter((currentUser) => currentUser !== user)
            );
            alert(`${user.Question} has been deleted!`);
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
              <th>Audio</th>
              <th>Question</th>
              <th>Ans_1</th>
              <th>Ans_2</th>
              <th>Ans_3</th>
              <th>Ans_4</th>
              <th>rightChoise</th>
              <th></th>
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
                <td>{user.Audio}</td>
                <td>{user.Question}</td>
                <td>{user.Ans_1}</td>
                <td>{user.Ans_2}</td>
                <td>{user.Ans_3}</td>
                <td>{user.Ans_4}</td>
                <td>{user.Correct}</td>
                <td>       <Link
                  to={"/edit"+"/"+user.Id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link></td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />

  
       

       <button 
     onClick={handleDeleteClick}
     
     disabled={selectedUsers.length === 0}>
      Delete
        </button>
      </div>

      <Footer />
    </>

      );

}

