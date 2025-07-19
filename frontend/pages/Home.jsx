import React, { useContext } from "react";
import {useNavigate} from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

function logout() {
  localStorage.removeItem("token");
  setUser(null); 
  toast.success("User Logged Out");
  navigate("/"); 
}


  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
