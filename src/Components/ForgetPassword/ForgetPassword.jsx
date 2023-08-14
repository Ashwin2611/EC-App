import { useState } from "react";
import style from "./ForgetPassword.module.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isValid,setIsValid]=useState("")
  const [errorMessage,setErrorMessage]=useState("");

  async function SubmitHandler() {
    const response =await fetch(
      "https://ecapp.onrender.com/api/v1/auth/forgotpassword",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    if (response.ok) {
      setIsValid(true)
      console.log(res);
      alert("Success")
    } else {
      setIsValid(false)
      console.log("Error", res);
      setErrorMessage(res.message)
    }
  }
  return (
    <div className={style.container}>
      <h3>Forgot Password</h3>
      <input
        className={style.email}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {!isValid && <h4 className={style.errorMessage}>{errorMessage}</h4>}
      <button className={style.button} onClick={SubmitHandler}>
        Submit
      </button>
    </div>
  );
}
