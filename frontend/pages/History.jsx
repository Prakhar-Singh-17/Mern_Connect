import { useEffect, useState } from "react"
import { axios } from "../axiosConfig"
import HomeNav from "../components/HomeNav";

export default function History() {

  const [history , setHistory] = useState([]);

  async function fetchUserHistory(){
    const response = await axios.get("/fetchUserHistory");
    console.log(response.data);
    setHistory(response.data.history.reverse());
  }

   function convertDate(item){
    const timestamp = Number(item);
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2,"0");
    const month = (date.getMonth()+1).toString().padStart(2,"0");
    const year = date.getFullYear().toString();
    return day + "/" + month + "/" + year
  }

  useEffect(()=>{
   fetchUserHistory();
  },[])
  return (
    <div className="homeContainer">
    <HomeNav/>
    <div className="container d-flex flex-column gap-2 mt-4">
      {history.map((item ,key)=>{
        return(
          <div key={key} className="historyCard">
            <p><span><strong>Code : </strong></span>{item.meetingCode}</p>
            <p><span><strong>Date : </strong></span>{convertDate(item.date)}</p>
          </div>
        )
      })}
    </div>
 </div> )
}
