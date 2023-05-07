
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../Style_Pages/Add.css";

import axios from "axios";
import React, { useState } from "react";
export const AddQuestion = () => {
  
    const [addQuestion, setQuiz] = useState({
      Audio: "",
      Question: "",
      Ans_1:"",
      Ans_2:"",
      Ans_3:"",
      Ans_4:"",
      Correct:"",
      loading: false,
      err: [],
    });
  
    const AddQuiz = (e) => {
      e.preventDefault();
      setQuiz({ ...addQuestion, loading: true, err: [] });
      axios
        .post("http://localhost:4000/quizzes", {
          Audio: addQuestion.Audio,
          Question: addQuestion.Question,
          Ans_1:addQuestion.Ans_1,
          Ans_2:addQuestion.Ans_2,
          Ans_3:addQuestion.Ans_3,
          Ans_4:addQuestion.Ans_4,
          Correct:addQuestion.Correct,
        
        })
        .then((resp) => {
          setQuiz({ ...addQuestion, loading: false, err: [] });
          alert(resp.data.message);
        
        })
        .catch((errors) => {
          console.log(errors);
          setQuiz({
            ...addQuestion,
            loading: false,
            err: errors.response.data.errors,
          });
        });
    };
    return (
       <>
         <Header />
      <div className="form">
        <h1 className="title">Add Questions and Answers</h1>
        <form  onSubmit={AddQuiz}>
            
          <div>
            <label className="label"> Audio</label>
            <input className="input" type="Text" placeholder={addQuestion.Audio}    value={addQuestion.Audio}
                onChange={(e) => setQuiz({ ...addQuestion, Audio: e.target.value })}/>
          </div>

          <div className="input-quistion">
            <label className="label"> Question</label>
            <input type="text" name=" Question" placeholder={addQuestion.Question}  value={addQuestion.Question}
                onChange={(e) => setQuiz({ ...addQuestion, Question: e.target.value })} />

            <label className="label" >answer1</label>
            <input className="inputAns" type="text" placeholder={addQuestion.Ans_1}  value={addQuestion.Ans_1}
                onChange={(e) => setQuiz({ ...addQuestion, Ans_1: e.target.value })} />


            <label className="label">answer2</label>
            <input className="inputAns"type="text" placeholder={addQuestion.Ans_2}  value={addQuestion.Ans_2}
                onChange={(e) => setQuiz({ ...addQuestion, Ans_2: e.target.value })}/>

           

            <label className="label" >answer3</label>
            <input className="inputAns" type="text"placeholder={addQuestion.Ans_3}  value={addQuestion.Ans_3}
                onChange={(e) => setQuiz({ ...addQuestion, Ans_3: e.target.value })} />

           

            <label className="label">answer4</label>
            <input className="inputAns"type="text"placeholder={addQuestion.Ans_4}  value={addQuestion.Ans_4}
                onChange={(e) => setQuiz({ ...addQuestion, Ans_4: e.target.value })} />

          
              <label className="label"> Correct Ans</label>
            <input type="text" name=" Question"placeholder={addQuestion.Correct}  value={addQuestion.Correct}
                onChange={(e) => setQuiz({ ...addQuestion, Correct: e.target.value })} />
         
          </div>

          <button style={{marginLeft:400}} type="submit" disabled={addQuestion.loading === true}>Add</button>
        </form>
      </div>

      <Footer />
       </>
     
  );
};
