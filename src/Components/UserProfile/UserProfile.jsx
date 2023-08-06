import Sidebar from "../Sidebar/Sidebar";
import style from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState"
// import profileImage from "./src/assets/PngItem_1503945.png";

export default function UserProfile() {
  const users=useSelector((state)=>state.user.value)
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);
  const [isLoading,setIsLoading]=useState(false)

  // useEffect(()=>{
  async function UserData() {
    setIsLoading(true)
    const res = await fetch("https://ecapp.onrender.com/api/v1/users/user", {
      method: "GET",
      headers: {
        Authorization:
          `bearer ${users.token}`,
        "Content-type": "application/json",
      },
    });
    const response = await res.json();
    try {
      if (res.ok) {
        setIsLoading(false)
        console.log(response.data);
        // await Promise.all()
        setUser(response.data.user);
        if (user.length > 0) {
          setIsUser(true);
        }
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // },[])
  useEffect(() => {
    UserData();
  }, []);
  // useEffect(() => {
  //   setIsUser(user.length > 0);
  // }, [user]);
  return (
    <div className={style.userprofilecontainer}>
      <Sidebar />
     {isLoading ? <LoadingState/> : <>
      <div className={style.userdata}>
        <div className={style.userprofile}>
        <img
          className={style.userprofileimage}
          src="./src/assets/PngItem_1503945.png"
          alt=""
          // onClick={() => <Photo />}
        />
        </div>
        
        <div className={style.userdetails}>
          <div className={style.details}>
            <label>NAME:</label>
            <label>EMAIL:</label>
            <label>DEPARTMENT:</label>
            <label>PHONE NO:</label>
          </div>
          <div className={style.data}>
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <h3>{user.email}</h3>
            <h3>{user.department}</h3>
            <h3>{user.phoneNo}</h3>
          </div>
        </div>
      </div>
     {!users.admin ? <div className={style.clubs}>
        <label className={style.club}>CLUB REGISTRATION</label>
        <h3 className={style.club}>
          <Link to="/clubregistration" className={style.register}>
            REGISTER
          </Link>
        </h3>
      </div> : " "}

      <button className={style.button}>
        <Link to="/editProfile" className={style.but}>
          Edit
        </Link>
      </button>
      </>}
    </div>
  );
}
