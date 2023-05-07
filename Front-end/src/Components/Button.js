import React from 'react';
import "../Style_Components/Button.css"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Button = (props) => {
    return (
      <Link className='LinkBtn' to={props.go_to} ><button >{props.name}</button></Link>
    );
};

export default Button;