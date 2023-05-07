import React , { useState, useEffect }from "react";
import "../Style_Pages/New_Users_Queue.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { getAuthUser } from "../helper/storage";
import axios from "axios";

export const History = () => {
  const auth = getAuthUser();
  
  
console.log(auth.email)
  const [histories, setHistory] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setHistory({ ...histories, loading: true });
    axios
      .get("http://localhost:4000/histories/"+auth.Email)
      .then((resp) => {
        setHistory({ ...histories, results: resp.data, loading: false, err: null });
        console.log(resp);
      })
      .catch((err) => {
        setHistory({
          ...histories,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [histories.reload]);
  return (
    <>
      <Header />
{histories.loading==true&&(<h1>loading</h1>)}
      <div className="table_container">
        <table>
          <thead>
            
            <tr>
              <th>Exam Id</th>
              <th>Degree</th>
              <th>Email</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          
            {histories.loading===false&&histories.err==null&&(<>
             { histories.results.map((history) => (
            <tr>
              <td>{history.Id}</td>
              <td>{history.Degree}%</td>
              <td>{history.Email}</td>
              <td>{history.Date}</td>
            </tr>

          ))}
            </>)}
        
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};
