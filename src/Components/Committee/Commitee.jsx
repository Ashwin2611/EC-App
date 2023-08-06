import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import style from "./Committee.module.css";
import LoadingState from "../LoadingState/LoadingState";

export default function Committee() {
  const user = useSelector((state) => state.user.value);
  const [club, setClub] = useState("");
  let clubs = [...user.adminInClub, ...user.committeeInClub];
  const [email,setEmail]=useState('')
  const [isLoading,setIsLoading]=useState(false)

  async function SubmitHandler(){
    setIsLoading(true)
    const response=await fetch('https://ecapp.onrender.com/api/v1/clubs/club',
    {
      method:"POST",
      body:JSON.stringify({
        email:email,
        clubId:club,
      }),
      headers:{
        Authorization:
        `bearer ${user.token}`,
      "Content-type": "application/json",
      } 
    })
    const res=await response.json();
    console.log(club)
    if(response.ok)
    {
      setIsLoading(false)
      console.log(res)
      const dummy=clubs.filter((clu)=>club!=clu.clubId)
      console.log(dummy)
      clubs=[...dummy];
    }
    else{
      console.log("error",response)
      console.log(res)
      console.log(clubs)
    }
  }
  return (
    <div>
      <Sidebar />
      {isLoading ? <LoadingState/> :<div className={style.container}>
        <h3 className={style.commitTitle}>Committee Selection</h3>
        <div className={style.mail}>
          <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
          <select value={club} onClick={(e) => setClub(e.target.value)}>
            {clubs.map((club) => (
              <option value={club.clubId}>{club.clubName}</option>
            ))}
          </select>
        </div>
        <button className={style.submitButton} onClick={SubmitHandler}>Submit</button>
      </div>}
    </div>
  );
}
