import { useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import OTPInput from "otp-input-react"
import style from "./OTPVerification.module.css"
import LoadingState from "../LoadingState/LoadingState"
export default function OTPVerification(){

  const location=useLocation();
  const Navigate=useNavigate();
  const email = location.state.email
  const[otp,setOtp]=useState(null);
  const [isLoading,setIsLoading]=useState(false)
  // console.log(otp)
 async function Handler(){
  setIsLoading(true)
  const password=otp;
    const response=await fetch("https://ecapp.onrender.com/api/v1/auth/signuppassword",
    {
      method:"Post",
      body:JSON.stringify({password,email}),
      headers:{"Content-type":'application/json'}
    })
    const res= await response.json();
    if(response.ok){
      setIsLoading(false)
      Navigate('/userdetails')
    }
    else{
      console.log(res)
    }
  }
    return(
      <div className={style.container}>
        {isLoading && <LoadingState/>}
        <h3 className={style.title}>Enter Your OTP</h3>
        <OTPInput
              value={otp}
              onChange={setOtp}
              OTPLength={4}
              otpType="Number"
              disabled={false}
              autoFocus
              className={style.otp}
            />
            <button className={style.button} onClick={Handler}>Submit</button>
      </div>
    )
}