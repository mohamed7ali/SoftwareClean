import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Link } from 'react-router-dom';
import "../Style_Components/Footer.css"

const Footer = () => {
    return (
        <>
            <footer style={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', backgroundColor:'#7149bb'}} >
                <div>
                    <Link style={{color:'white', textDecoration:'none'}} to="../Pages/Contact_Us.js" ><h3>Contact With Us</h3></Link>       
                    <p style={{color:'white'}}>&copy;2023 - <span>Eary</span></p>
                </div>
              

           </footer>
           </>
    );
};

export default Footer;