import React from 'react'
import Lottie from 'react-lottie';
import ErrorImage from '../assets/Error_Page.json'
const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: ErrorImage,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      }
  return (
    <div>
          <Lottie 
	    options={defaultOptions}
       
      />
    </div>
  )
}

export default Error