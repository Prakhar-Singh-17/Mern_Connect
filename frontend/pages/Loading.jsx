import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div>
         <div className="w-screen h-screen flex justify-center items-center">
       
       <DotLottieReact src="loading.json" autoplay loop />
    </div>
    </div>
  )
}
