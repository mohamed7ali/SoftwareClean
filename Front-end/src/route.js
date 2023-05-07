import App from "./App";
import QuizInstructions from "./Components/quiz/QuizInstruction";
import { Quizh } from "./Components/quiz/quizH";
import { AddQuestion } from "./Pages/Add_Question";
import ContactUs from "./Pages/Contact_Us";
import Main from "./Pages/Main";
import NewUsersQueue from "./Pages/New_Users_Queue";
import Login from "./Pages/Sign_in";
import SignUp from "./Pages/Sign_up";
import UpdateProfilePage from "./Pages/Update_Profile";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Guest from "./middleware/Guest";
import { History } from "./Pages/history";
import { EditQuestion } from "./Pages/Edit_question";
import { QuestionsAdmin } from "./Pages/QuestionsAdmin";




export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/QuizeInstruction",
        element: <QuizInstructions />,
      },
      {
        path: "/home",
        element: <Main />,
      },

      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
        ],
      },
      {
        path: "/quiz",
        element: <Quizh />,
      },
      {
        path: "/updatePage",
        element: <UpdateProfilePage />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/newUser",
        element: <NewUsersQueue />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/add",
        element: <AddQuestion />,
      },
      {
        path: "/edit/:id",
        element: <EditQuestion />,
      },
      {
        path:"/QuestionsAdmin",
        element:<QuestionsAdmin/>

      }

    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
