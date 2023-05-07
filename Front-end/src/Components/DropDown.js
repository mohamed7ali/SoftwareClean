import React from 'react';
import "../Style_Components/DropDown.css"
import img from "../Components/menu2.png"
import DropDownLinks from './DropDownLinks.js';
import { useNavigate } from "react-router-dom";
import { getAuthUser, removeAuthUser } from '../helper/storage';
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
const DropDown = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

    
    
    return (
      auth && (
        <>
        <div className="dropdown">
          <button style={{backgroundColor:'transparent', border:'none'}} className="dropdownToggle" onClick={toggleDropdown} ><img style={{ width: '35px', height: '35px' }} src={img} /></button>
          <ul className="dropdown-menu">

    
           <li><DropDownLinks className="a" go_to={"/updatePage"} name={"Update profile"} /></li>
           {auth.status!=1&&( <li><DropDownLinks className="a" go_to={"/history"} name={"Exams history"} /></li>)}
          
           {auth.status=== 1 && (
                  <>
                   <li><DropDownLinks className="a" go_to={"/newUser"} name={"Requests"} /></li>
                   <li><DropDownLinks className="a" go_to={"/add"} name={"Add questions"} /></li>
                   
          </>
                )}
              
       
           <Nav style={{color:'black'}}>
                {/* Authenticated Routes  */}
                {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
              </Nav>
         </ul>
         
        </div>
    
    
    
    </>
      )
       
    );

    function toggleDropdown() {
      const dropdownToggle = document.querySelector('.dropdownToggle');
      dropdownToggle.classList.toggle('active');
    }
    
};







export default DropDown;