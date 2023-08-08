import { useEffect,useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import style from "./ForgotPassword.module.css"


export default function ForgotPassword(){
    const [searchParams,setSearchParams] = useSearchParams()
    const token = searchParams.get("verification")
    const [isChecking,setIsChecking] = useState(false)
    const [isValid,setIsValid] = useState(false)
    const [newToken,setNewToken] = useState("")
    const [password,setPassword]=useState("");
    const [confirmPasssword,setConfirmPassword]=useState("");
    const [PassValid,setPassValid]=useState(false);
    const navigate=useNavigate()
    useEffect( ()=>{
        const checkValidity = async () => {
            setIsChecking(true)
            const response = await fetch("https://ecapp.onrender.com/api/v1/auth/forgotpassword",{
                method: 'GET',
                headers: {
                    Authorization: `bearer ${token}`
                }
            })
            const res = await response.json()
            if(response.ok){
                setIsValid(true)
                console.log(res)
                setNewToken(res.newToken)
                // alert(res.message)
            }
            else{
                // alert(res.message)
                console.log(res.message)
                setIsChecking(false)
            }
        }
        checkValidity()
    },[])

    function CheckPassword(){
        if(password===confirmPasssword)
        {
            setPassValid(true);
            if(setPassValid)
            {
                async function PostHandler(){
                    const response=await fetch("https://ecapp.onrender.com/api/v1/auth/forgotpassword",{
                        method:"PATCH",
                        body:JSON.stringify({password}),
                        headers: {
                            Authorization: `bearer ${newToken}`,
                            "Content-Type": 'application/json'
                        }
                    })
                    const res=await response.json();
                    if(response.ok)
                    {
                        console.log(res);
                        navigate("/login")
                    }
                    else
                    {
                        console.log("Error",res)
                    }
                }
                PostHandler();

            }

        }
        else{
            console.log("password is not matching")
        }
    }
    return(<>
        {(isChecking && isValid) ? (<div className={style.container}>
        <h3 className={style.title}>Forgot Password</h3>
        <input
          className={style.password}
          type="Password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className={style.password}
          type="Password"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className={style.button} onClick={CheckPassword}>
          Submit
        </button>
      </div>) : (!isValid ? <h1>Link Expired </h1> : "Loading.....")}
      </>
    )
}