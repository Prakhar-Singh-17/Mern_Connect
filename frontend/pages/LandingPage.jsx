import { Link } from "react-router-dom"
import LandingNav from "../components/LandingNav"

export default function LandingPage() {

  return (
   <div className="page_container">
    <LandingNav/>
    <div className="flex flex-col-reverse md:flex-row flex-1 mt-14">
      <div className="flex flex-1 flex-col justify-start md:justify-center items-center text-white gap-2 md:text-3xl md:m-0 md:font-medium md:gap-5">
        <h1 className=""><span className="text-[#ff4500]">Connect</span> with your Loved Ones</h1>
        <p>Cover a distance by Mern Connect</p>
        <button className="bg-[#ff4500] rounded-md p-2 w-48 md:w-48 md:text-xl">Get Started</button>
      </div>
      <div className="flex flex-1 justify-center items-center">
        <img className="w-56 h-56 object-contain rounded-md md:w-96 md:h-96" src="landing_page_img.jpg"/>
      </div>
    </div>
   </div>
  )
}
