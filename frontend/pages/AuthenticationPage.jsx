import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { axios } from "../axiosConfig";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LandingNav from "../components/LandingNav";

export default function AuthenticationPage() {
  const navigate = useNavigate();
  const{setUser} = useContext(AuthContext);
  let [formState, setFormState] = useState(1);
  let [fullname, setFullName] = useState("");
  let [username, setUserName] = useState("");
  let [password, setPassword] = useState("");

  async function signup(e) {
    console.log("Clicked for signup")
    e.preventDefault();
    axios.post("/signup",{fullname,username,password})
    .then((res)=>{
        if(res.data.success){
          toast.success("Signup Successful");
        }
        else{
          toast.error(res.data.message);
        }
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  function login(e) {
    console.log("Clicked for signup");
    e.preventDefault();
    axios.post("/login",{username,password})
    .then((res)=>{
      console.log(res);
       if(res.data.success){
          toast.success("Login Successful");
          localStorage.setItem("token",res.data.token);
           setUser(res.data.user);
           navigate("/home");
        }
        else{
          toast.error(res.data.message);
        }
    })
    .catch((err)=>{
      console.log(err);
      toast.error("Error in login")
    })
  }

  return (
    <div className="page_container">
      <LandingNav/>
    <div className="flex flex-1 flex-col justify-center items-center">
      <div className="backdrop-blur-md bg-white/20 border border-white/20 rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex justify-center ">
          <button
            className={` flex flex-1 justify-center p-2 rounded-lg cursor-pointer ${formState? "text-black" : "text-white bg-[#800080]"}`}
            onClick={() => setFormState(0)}
          >
            SignUp
          </button>
          <button
            className={`flex flex-1 justify-center p-2 rounded-lg cursor-pointer ${formState ? "text-white bg-[#800080]" : "text-black"}`}
            onClick={() => setFormState(1)}
          >
            Login
          </button>
        </div>

<form className="flex flex-col gap-4">
  {!formState && (
    <div>
      <label htmlFor="fullname" className="block text-md  text-black mb-1">
        Full Name
      </label>
      <input
        type="text"
        id="fullname"
        name="fullname"
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
        className="w-full px-2 py-2 rounded-md border border-gray-300 text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
       
      />
    </div>
  )}

  <div>
    <label htmlFor="username" className="block text-md text-black mb-1">
      Username
    </label>
    <input
      type="text"
      id="username"
      name="username"
      value={username}
      onChange={(e) => setUserName(e.target.value)}
      className="w-full px-2 py-2 rounded-md border border-gray-300 text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      
    />
  </div>

  <div>
    <label htmlFor="password" className="block text-md text-black mb-1">
      Password
    </label>
    <input
      type="password"
      id="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-2 py-2 rounded-md bg-transparent border border-gray-300 text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
   
    />
  </div>

  <button
    type="submit"
    onClick={!formState ? signup : login}
    className="w-full py-2 mt-2 rounded-lg bg-[#ff4500] hover:bg-[#ff5b20] text-white font-semibold transition"
  >
    Submit
  </button>
</form>

      </div>
    </div>
     </div>
  );
}
