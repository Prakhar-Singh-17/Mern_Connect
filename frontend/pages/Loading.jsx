import Lottie from "lottie-react"
import animationData from "../src/loading.json";

export default function Loading() {
  return (
    <div>
         <div className="w-screen h-screen flex justify-center items-center">
       <Lottie animationData={animationData} loop={true} />
    </div>
    </div>
  )
}
