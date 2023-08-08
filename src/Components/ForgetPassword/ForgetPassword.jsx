import { useState } from "react";
import style from "./ForgetPassword.module.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

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
      console.log(res);
      alert("Success")
    } else {
      console.log("Error", res);
    }
  }
  return (
    <div className={style.container}>
      <input
        className={style.email}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className={style.button} onClick={SubmitHandler}>
        Submit
      </button>
    </div>
  );
}
