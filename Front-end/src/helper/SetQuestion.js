export const setQuestion = (data) => {
    // save object to the local storage
    // Stringify OBJECT TO TEXT
    localStorage.setItem("exams", JSON.stringify(data));
  };
  
  export const getQuestion = (data) => {
    if (localStorage.getItem("exams")) {
      return JSON.parse(localStorage.getItem("exams"));
    }
  };
  
 