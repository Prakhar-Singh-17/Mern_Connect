import { Link } from "react-router-dom"

export default function LandingPage() {

  return (
    <div className="page_container">
      <div className="mainContent">
      <div className="navbar">
        <div>
          <h1>Mern Connect</h1>
        </div>
        <div className="options">
          <Link to={"/videocall"}><h4>Join as Guest</h4></Link>
          <h4>Register</h4>
           <Link to={"/auth"}><button className="orangeButton">Login</button></Link>
        </div>
      </div>
      <div className="container contentBox">
        <div className="row">
          <div className="col  d-flex flex-column justify-content-center align-items-start gap-3">
            <h1><span>Connect</span> with your Loved Ones</h1>
            <h4>Cover a distance by Mern Connect</h4>
            <Link to={"/auth"}><button className="orangeButton">Get Started</button></Link>
          </div>
          <div className="col d-flex justify-content-center align-items-end">
            <img src="/friends-family-making-videocall-catching-up.jpg" className="img-fluid"/>
          </div>
        </div>
      </div>
       </div>
    </div>
  )
}
