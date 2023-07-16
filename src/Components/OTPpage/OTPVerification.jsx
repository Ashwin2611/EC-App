import OTPInput from "react-otp-input"
import style from "./OTPVerification.module.css"
export default OTPVerification(){
    return(
        <OTPInput numInputs={4} renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}>
    )
}