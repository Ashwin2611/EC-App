import { useState } from "react";
import style from "./ChangePassword.module.css";
import { useSelector } from "react-redux";

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);

  const user=useSelector((state)=>state.user.value)

  async function SubmitHandler() {
    if (newPassword === confirmPassword) {
        setIsValid(true)
        if(isValid)
        {
            const response =await  fetch(
                "https://ecapp.onrender.com/api/v1/auth/changepassword",
                {
                  method: "PATCH",
                  body: JSON.stringify({ oldPassword, newPassword }),
                  headers: {
                    Authorization: `bearer ${user.token}`,
                    "Content-Type": "application/json",
                  },
                }
              );
              const res = await response.json();
              if (response.ok) {
                console.log(res);
              } else {
                console.log("error", res);
              }
        }
   
    }
  }

  return (
    <div className={style.container}>
      <h2 className={style.title}>Change Password</h2>
      <input
        className={style.password}
        type="password"
        placeholder="Old Password"
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        className={style.password}
        type="password"
        placeholder="New Password"
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        className={style.password}
        type="password"
        placeholder="Confirm Password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className={style.button} onClick={SubmitHandler}>
        Submit
      </button>
    </div>
  );
}
