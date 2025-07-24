import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import HistoryIcon from "@mui/icons-material/History";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HomeNav() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    toast.success("User Logged Out");
    navigate("/");
  }
  return (
    <div className="navbar" style={styles.navbarBg}>
      <div>
        <h1>Mern Connect</h1>
      </div>
      <div className="options">
         <Link className="btn btn-primary" to={"/home"} style={styles.link}>
          <HomeIcon />
          &nbsp;  &nbsp;
          <p style={{margin : 0}}>Home</p>
        </Link>
        <Link className="btn btn-primary" to={"/history"} style={styles.link}>
          <HistoryIcon />
          &nbsp;  &nbsp;
          <p style={{margin : 0}}>History</p>
        </Link>
        <Link className="btn" style={styles.logoutBtn} onClick={logout}>
        <LogoutIcon/>
        &nbsp;  &nbsp;
        <button style={styles.logoutBtn} >
          Logout
        </button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  link : {display : "flex" , alignItems:"center" , justifyContent : "space-between" , textDecoration : "none"},
  logoutBtn : {backgroundColor:"orangered" , color : "white" , border : "none"},
  navbarBg : { width : "100vw", position : "sticky", top : 0, color : "white " , backgroundImage: 'url("/32499956_7756629.jpg")' ,  backgroundRepeat: "no-repeat" ,backgroundSize: "cover"}
}
