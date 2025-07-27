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
    <div className="auth">
      <div className="form_container">
        <div className="authButtonContainer d-flex justify-content-center">
          <button
            className={formState ? "unactive" : "active"}
            onClick={() => setFormState(0)}
          >
            SignUp
          </button>
          <button
            className={formState ? "active" : "unactive"}
            onClick={() => setFormState(1)}
          >
            Login
          </button>
        </div>

        <form>
          {!formState ? (
            <div class="form-floating mb-3">
              <div class="">
                <label for="formGroupExampleInput3" class="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput3"
                  name="fullname"
                  value={fullname}
                  onChange={e=>setFullName(e.target.value)}
                />
              </div>
            </div>
          ) : null}

          <div class="mb-3">
            <label for="formGroupExampleInput" class="form-label">
              Username
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput"
              name="username"
               value={username}
                  onChange={e=>setUserName(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label">
              Password
            </label>
            <input
              type="text"
              class="form-control"
              id="formGroupExampleInput2"
              name="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              class="submit"
              onClick={!formState ? signup : login}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
     </div>
  );
}
