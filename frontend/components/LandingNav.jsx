import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import CodeModal from "./CodeModal";
import { toast } from "react-toastify";

export default function LandingNav() {
  let [showModal , setShowModal] = useState(false);
  let [meetingCode , setMeetingCode] = useState("");

  const navigate = useNavigate();

  function navigateToMeeting(){
    if(meetingCode.length>0){
      navigate(`/${meetingCode}`);
      showModal(false);
      toast.success("Meeting Joined")
    }
    else{
      toast.error("Failed to join meeting")
    }
  }
  return (
    <>
     {
        showModal ? 
         <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <h5 align="center">Please Input Meeting Code</h5>
                  <TextField id="outlined-basic" label="Code" variant="outlined" value={meetingCode} onChange={e=>setMeetingCode(e.target.value)} />
                  <div className="d-flex gap-4">
                  <Button sx={{ flex: 1 }} variant="outlined" color="error" onClick={()=>setShowModal(false)}>Cancel</Button>
                  <Button sx={{ flex: 1 }} variant="contained" onClick={navigateToMeeting}>Join / Create</Button>
                  </div>
                </Box>
              </Modal>
                : null
      }
    <div className="navbar"> 
      <Link to="/" style={{textDecoration : "none"}}>
        <h1 style={{color : "white"}}>Mern Connect</h1>
      </Link>
      <div className="options">
        <Link  style={{textDecoration: "none" , color : "white"}}>
         <button className="btn btn-primary" style={{color:"white"}} onClick={()=>setShowModal(!showModal)}>Join as a Guest</button>
        </Link>
        <Link to={"/auth"}>
          <button className="btn" style={{color:"white" , backgroundColor : "orangered"}}>Login / Signup</button>
        </Link>
      </div>
    </div>
    </>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display : "flex",
  flexDirection : "column",
  gap : "1rem",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius : "10px",
  boxShadow: 24,
  p: 4,
};
