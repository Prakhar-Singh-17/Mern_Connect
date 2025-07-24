import { Link } from "react-router-dom"
import LandingNav from "../components/LandingNav"

export default function LandingPage() {

  return (
    <div className="page_container">
      <div className="mainContent" style={{color: "white"}}>

<LandingNav/>
      <div className="container contentBox">
        <div className="row">
          <div className="col  d-flex flex-column justify-content-center align-items-start gap-3">
            <h1><span>Connect</span> with your Loved Ones</h1>
            <h4>Cover a distance by Mern Connect</h4>
            <Link to={"/auth"}><button className="orangeButton">Get Started</button></Link>
          </div>
          <div className="col d-flex justify-content-center align-items-end">
            <img src="/landing_page_img.jpg" className="img-fluid"/>
          </div>
        </div>
      </div>
       </div>
    </div>
  )
}
