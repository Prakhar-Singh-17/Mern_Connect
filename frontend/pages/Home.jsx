import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import HomeNav from "../components/HomeNav";
import TextField from "@mui/material/TextField";
import { axios } from "../axiosConfig";

export default function Home() {
  const { setUser } = useContext(AuthContext);
  const [meetingCode , setMeetingCode] = useState("");
  const navigate = useNavigate();

  function saveHistory(){
    axios.post("/addToHistory",{meetingCode})
    .then((res)=>{
      console.log(res)
      if(res.data.success){
      navigate(`/${meetingCode}`);
    toast.success("Meeting Joined");
      } 
    })
    .catch(()=>{
      toast.error("Error Joining Meeting");
    })
  }

  async function joinRoom(){
    await saveHistory();   
  }

  return (
    <div className="homeContainer">
      <HomeNav />
      <div className="container d-flex flex-grow-1">
        <div className="row d-flex flex-grow-1 justify-content-center align-items-center">
          <div className="col d-flex flex-column align-items-center justify-content-center px-5">
             <h4>Providing Quality Video Call Since 2025</h4>
             <div className="d-flex mt-3">
            <TextField id="outlined-basic" label="MeetingCode" variant="outlined" value={meetingCode} onChange={e=>setMeetingCode(e.target.value)}/>
            <button className="btn btn-primary" onClick={joinRoom}>Join / Create</button>
             </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <img className="img-fluid w-75 h-auto" src="/join-call.jpg"/>
          </div>
        </div>
      </div>
    </div>
  );
}
