import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../Style_Components/Header_Links.css"
const Header_Links = (props) => {
    return (
        <Link to={props.go_to} id='link' className='link' >{props.name}</Link>
    );
};

export default Header_Links;