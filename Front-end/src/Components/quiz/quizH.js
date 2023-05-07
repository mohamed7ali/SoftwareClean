import React, { useState, useEffect } from "react";
import "../../Style_Pages/Quiz.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactAudioPlayer from "react-audio-player";
import Header from "../Header";
import Button from "../Button";
import One from '../../Style_Pages/sound/1.mp3';
import axios from "axios";
import { getAuthUser } from "../../helper/storage";

export function Quizh() {
  let degree = 0;
  const auth = getAuthUser();

  const [showFinalResults, setFinalResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  console.log(auth.email);
  const [exams, setExam] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setExam({ ...exams, loading: true });
    axios
      .get("http://localhost:4000/quizzes")
      .then((resp) => {
        setExam({ ...exams, results: resp.data, loading: false, err: null });
        console.log(resp);
      })
      .catch((err) => {
        setExam({
          ...exams,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [exams.reload]);

  //put result into database
  const [histories, setHistory] = useState({
    email: auth.Email,
    Degree: "",
    loading: false,
    err: [],
  });

  const PostHistory = (e) => {
    e.preventDefault();
    setHistory({ ...histories, loading: true, err: [] });
    axios
      .post("http://localhost:4000/histories", {
        Email: histories.email,
        Degree: (score / exams.results.length) * 100,
      })
      .then((resp) => {
        setHistory({ ...histories, loading: false, err: [] });
        alert(resp.data.message);
      })
      .catch((errors) => {
        console.log(errors);
        setHistory({
          ...histories,
          loading: false,
          err: errors.response.data.errors,
        });
      });
  };

  const optionClicked = (isCorrect) => {
    //Increment the score

    if (isCorrect == exams.results[currentQuestion].Correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < exams.results.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResults(true);
    }
    console.log(degree);
  };

  /* Resets the game back to default */
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResults(false);
  };

  return (
    <>
      <Header />
      {exams.loading == true && <h1>loading</h1>}
      <div className="quiz ">
        <h1>Eary Test</h1>

        <h2 className="score">Score: {score}</h2>

        {showFinalResults ? (
          <div className="final-result" onClick={PostHistory}>
            <h1>Final Result</h1>
            <h2>
              {score} out of {exams.results.length} correct -(
              {(score / exams.results.length) * 100}%)
            </h2>

            <button className="btn2" onClick={() => restartQuiz()}>
              Restart Quiz
            </button>

          </div>
        ) : (
          <div className="question-card ">
            {exams.loading === false && exams.err == null && (
              <>
                <h2>
                  Question {currentQuestion + 1} out of {exams.results.length}
                </h2>
                <br />
                <br />
                <ReactAudioPlayer
                  src={exams.results[currentQuestion].Audio}
                  
                  autoPlay
                  controls
                />
                <br />
                <br />
                <h3 className="question-text">
                  {exams.results[currentQuestion].Question}
                </h3>
                <ul className="ul1">
                  <li
                    className="li1"
                    onClick={() =>
                      optionClicked(exams.results[currentQuestion].Ans_1)
                    }
                  >
                    {exams.results[currentQuestion].Ans_1}
                  </li>
                  <li
                    className="li1"
                    onClick={() =>
                      optionClicked(exams.results[currentQuestion].Ans_2)
                    }
                  >
                    {exams.results[currentQuestion].Ans_2}
                  </li>
                  <li
                    className="li1"
                    onClick={() =>
                      optionClicked(exams.results[currentQuestion].Ans_3)
                    }
                  >
                    {exams.results[currentQuestion].Ans_3}
                  </li>
                  <li
                    className="li1"
                    onClick={() =>
                      optionClicked(exams.results[currentQuestion].Ans_4)
                    }
                  >
                    {exams.results[currentQuestion].Ans_4}
                  </li>
                </ul>
              </>
            )}

            {auth.status === 1 && (
              <>
                <div
                  className="btn1"
                  style={{ backgroundColor: "rgb(248, 243, 243)" }}
                >
                  <Button name={"Edit"} go_to={"/edit"} />
                  <Button name={"Delete"} go_to={""} />
                </div>
              </>
            )}
          </div>
        )}
      </div>

    </>
  );
}