import React from "react";
import { Link } from "react-router-dom";

import "../../Style_Pages/quizinstruction.css";
import quiz from "../../Style_Pages/img/quiz.jpg";
import Header from "../Header";
import TeamMembers from "../Team/Team_members";
import Footer from "../Footer";
const QuizInstructions = () => (
  <>
    <Header />

    <div className="inst">
      <div className="instructions container">
        <h1>How to solve quiz? </h1>
        <p className="p1">Ensure you read this guide from start to finsh.</p>
        <ul className="browser-default" id="main-list">
          <li>
            {" "}
            The Quize not have limted duration you can solve it more than once.
          </li>
          <li>Each quiz consists of 10 quistions.</li>
          <li>
            Every question contains 4 options.
            <br />
            <br />
            <img src={quiz} alt="quiz"></img>
          </li>
          .<br />
          <br />
          <li>You must listen well before answering the question.</li>
          <li>You should choose only one option.</li>
          <li>After finshing quiz you can solve it again if you want.</li>
        </ul>
        <h2>Good Luck ..</h2>
        <h2 className="p2">&#128512;</h2>
        <br />

        <p className="text-center mt-2" id="paragaph">
          <Link to="/quiz" className="exm">
            Go to Exam Page?
          </Link>
          <br />
        </p>
      </div>
    </div>

    <TeamMembers />

    <Footer />
  </>
);
export default QuizInstructions;
