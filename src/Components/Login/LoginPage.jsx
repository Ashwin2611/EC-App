import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// import ReactTooltip from "react-tooltip";
import style from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../features/Store";
import { useDispatch, useSelector } from "react-redux";

// import FontAwesome from "./FontAwesome";
export function LoginPage() {
  const dispatch = useDispatch();
  // const user=useSelector((state)=>state.user.value)
  // console.log(user)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();

  async function SubmitHandler(e) {
    e.preventDefault();
    let isValid = true;
    if (!email) {
      setErrorEmail("Please Enter Your Email");
      isValid = false;
    } else if (!email.endsWith("@nec.edu.in")) {
      setErrorEmail("Invalid email format. Email should end with @nec.edu.in");
      isValid = false;
    } else {
      setErrorEmail("");
    }
    if (!password) {
      setErrorPassword("Please Enter the Correct Password");
      isValid = false;
    } else {
      setErrorPassword("");
    }
    if (isValid) {
      const res = await fetch("http://10.11.6.27:3000/api/v1/auth/login", {
        method: "Post",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });
      const result = await res.json();
      console.log(res, result);
      if (res.ok) {
        // console.log(result)
        console.log("login successful");
        console.log(result.data.adminInClub);
        localStorage.setItem("value", JSON.stringify(result.token));
        dispatch(
          login({
            token: result.token,
            adminInClub: result.data.adminInClub,
            adminInClubCount: result.data.adminInClubCount,
            committeeInClub:result.data.committeeInClub,
            committeeInClubCount: result.data.committeeInClubCount,
            memberInCount:result.data.memberInCount,
            memberInClubCount:result.data.memberInClubCount
          })
        );
        navigate("/home");
      } else {
        setErrorPassword(result.message);
      }
    } else {
      console.log("login unsuccessful");
    }
  }

  const Navigate = useNavigate();
  function RouteHandler() {
    Navigate("/signup");
  }

  return (
    <div className={style.container}>
      <center>
        <form className={style.form} onSubmit={SubmitHandler}>
          <h1 className={style.title}>Login</h1>
          <input
            className={style.inputfield}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorEmail && (
            <p className={style.erroremail}>
              {errorEmail}
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={style.info}
                data-tip={errorEmail}
              />
            </p>
          )}

          <input
            className={style.inputfield}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorPassword && (
            <p className={style.error}>
              {errorPassword}
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={style.info}
                data-tip={errorPassword}
              />
            </p>
          )}
          {/* <ReactTooltip /> */}
          {/* {errorEmail} */}
          <p className={style.para}>
            Don't have an account?{" "}
            <span className={style.span} onClick={RouteHandler}>
              {" "}
              Create new account
            </span>
          </p>
          <button className={style.button} type="submit">
            Login
          </button>
        </form>
      </center>
    </div>
  );
}
