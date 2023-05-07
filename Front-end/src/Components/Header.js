import React from 'react';
import "../Style_Components/Header.css";
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from './Button';
import HeaderLinks from './Header_Links';
import DropDown from './DropDown.js';

import { useNavigate } from "react-router-dom";
import { getAuthUser, removeAuthUser } from '../helper/storage';
const Header = () => {
  const navigate = useNavigate();
  const auth = getAuthUser();
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };
  return (

    <header>

      <div className='logo-container'>
        <img src={logo} alt="Logo"></img>
      </div>

      {auth && (<>     <HeaderLinks go_to={'/QuizeInstruction'} name={"About Us"} />
      <HeaderLinks go_to={'/contact'} name={"Contact Us"} /></>)}
      <HeaderLinks go_to={'/home'} name={"Home"} />

 
      {auth && auth.status !== 1 &&
        <HeaderLinks go_to={'/quiz'} name={" Exam    "} />}
      {auth && auth.status === 1 &&
        <HeaderLinks go_to={'/QuestionsAdmin'} name={" Questions   "} />}

      {/* unAuthenticated Route  */}
      {!auth && (
        <>
          <Button name={'Sign in'} go_to={'/'} />
          <Button name={'Sign up'} go_to={'/signup'} />

        </>
      )}

      {/* Admin Routes  */}

      <DropDown />


    </header>






  );
};

export default Header;