import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./Signup.module.css";
import { useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
export default function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const joinInYear = email.slice(0, 2);
  const currentOfYear = new Date().getFullYear() % 100;
  console.log(currentOfYear);
  const yearofStudy = currentOfYear - joinInYear;
  console.log(yearofStudy);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignUp(e) {
    e.preventDefault();
    let isValid = true;
    if (!email) {
      setError("Please Enter Your Email");
      isValid = false;
    } else if (!email.endsWith("@nec.edu.in")) {
      setError("Please Enter Your College Email");
      isValid = false;
    } else if (yearofStudy > 4 && yearofStudy < 0) {
      setError("You Are Not A Current Batch Student");
      isValid = false;
    } else {
      setError("");
    }
    if (isValid) {
      setIsLoading(true);
      const res = await fetch(
        "https://ecapp.onrender.com/api/v1/auth/signupemail",
        {
          method: "Post",
          body: JSON.stringify({ email }),
          headers: { "Content-type": "application/json" },
        }
      );
      const result = await res.json();
      console.log(res, result);
      if (res.ok) {
        setIsLoading(false);
        navigate("/OTPVerification", {
          state: {
            email: email,
          },
        });
      } else {
        setError(result.message);
      }
    }
  }
  function routeHandler() {
    navigate("/login");
  }

  return (
    <>
      {isLoading && <LoadingState />}
      <form className={style.form} onSubmit={handleSignUp}>
        <h1 className={style.title}>Register</h1>
        <input
          className={style.inputfield}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className={style.error}>{error}</p>}
        <button className={style.button} type="submit">
          Submit
        </button>
        <p className={style.para}>
          Already have an account?
          <span className={style.span} onClick={routeHandler}>
            login
          </span>
        </p>
      </form>
    </>
  );
}
