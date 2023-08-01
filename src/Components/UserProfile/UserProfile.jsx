import Sidebar from "../Sidebar/Sidebar";
import style from "./UserProfile.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import profileImage from "./src/assets/PngItem_1503945.png";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [isUser, setIsUser] = useState(false);

  // useEffect(()=>{
  async function UserData() {
    const res = await fetch("http://10.11.6.27:3000/api/v1/users/user", {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYzZGQ3NGEwYjhmZTljYzJhNmYwMiIsImlhdCI6MTY5MDUzNTU0MSwiZXhwIjoxNjk4MzExNTQxfQ.0HlwUM8BjhAZIpqxgcHtV-AhafUQbdp2jplcsNeyITg",
        "Content-type": "application/json",
      },
    });
    const response = await res.json();
    try {
      if (res.ok) {
        console.log(response.data);
        // await Promise.all()
        setUser(response.data.user);
        if(user.length>0){
          setIsUser(true)
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
      <div className={style.userdata}>
        <img
          className={style.userprofileimage}
          src="./src/assets/PngItem_1503945.png"
          alt=""
          onClick={() => <Photo />}
        />
        <div className={style.userdetails}>
          <div className={style.details}>
            <label>NAME:</label>
            <label>EMAIL:</label>
            <label>DEPARTMENT:</label>
            <label>PHONE NO:</label>
            <label>CLUB REGISTRATION:</label>
          </div>
              <div className={style.data}>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <h3>{user.email}</h3>
                <h3>{user.department}</h3>
                <h3>{user.phoneNo}</h3>
                <h3>
                  <Link to="/clubregistration" className={style.register}>
                    REGISTER
                  </Link>
                </h3>
              </div>
            
        </div>
      </div>
      <button className={style.button}>
        <Link to="/editProfile" className={style.but}>
          Edit
        </Link>
      </button>
    </div>
  );
}
