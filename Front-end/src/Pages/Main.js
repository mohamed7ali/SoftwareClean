import React from 'react';
import "../Style_Pages/Main.css"
import Button from '../Components/Button';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Main = () => {
    return (
        <>
        <Header/>
               <div className="landing d-flex justify-content-center ">
        <div className="text-center ">
            <h1>Welcome to Eary!</h1>
            <p className="fs-20  mb-9"> Make that ears hear here </p>
            <Button name={"Know more"}go_to={'/QuizeInstruction'}/>
        </div>
        </div>



        <Footer />
        </>
        
 
    );
};

export default Main;