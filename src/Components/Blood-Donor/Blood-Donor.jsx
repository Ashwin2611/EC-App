import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./Blood-Donor.module.css";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState"
export default function BloodDonor() {
  const users=useSelector((state)=>state.user.value)
  const [bloodGroup, setBloodGroup] = useState("");
  // const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const [isLoading,setIsLoading] =useState(false)
  const apiHandler = async () => {
    setIsLoading(true)
    const url = `https://ecapp.onrender.com/api/v1/users/donor?firstName=${name}&bloodGroup=${bloodGroup}`;
    console.log(url);
    console.log(users.token)
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          `bearer ${users.token}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result.data.user);
      setUser(result.data.user);
      setIsLoading(false)
      //   console.log(user);
    } else {
      console.log("Error");
    }
  };
  console.log(user);
  useEffect(() => {
    apiHandler();
  }, [name, bloodGroup]);
  return (
    <div>
      <>
        <Sidebar />
        <div className={style.container}>
          <input
            className={style.search}
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <select
            className={style.blood}
            name="BloodGroup"
            onChange={(e) => {
              setBloodGroup(e.target.value);
            }}
          >
            <option value="">Blood Group</option>
            <option value="B%2B">B+</option>
            <option value="B-">B-</option>
            <option value="O%2B">O+</option>
            <option value="O-">O-</option>
            <option value="AB%2B">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A%2B">A+</option>
            <option value="A-">A-</option>
          </select>
          {/* <select
            className={style.department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option value="">Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select> */}
        </div>
      </>
      <div className={style.usercontainar}>
      {isLoading ?<div className={style.loading}> <LoadingState/> </div>:
        (user &&
          user.map((user) => (
            <div className={style.userdata}>
              <img
                className={style.userimage}
                src={user.profileName ? user.profileLink : "./src/assets/PngItem_1503945.png"}
                alt="Image"
                height={28}
              />
                <h3 className={style.name}>
                  {user.firstName} {user.lastName}
                </h3>
              <div className={style.Userdetails}>
                <div className={style.details}>
                  {/* <p className={style.depart}>{user.department}</p> */}
                  <p className={style.bloodGrp}>
                    Blood Group : {user.bloodGroup}
                  </p>
                </div>
                <div>
                  <p className={style.phoneNo}>Phone No : {user.phoneNo}</p>
                </div>
              </div>
            </div>
          )))}
        {/* {user &&
          user.map((user) => (
            <div className={style.userdata}>
              <img
                className={style.userimage}
                src={"./src/assets/PngItem_1503945.png"}
                alt="Image"
                height={28}
              />
              <h3 className={style.userdata}>
                {user.firstName} {user.lastName}
              </h3>
            </div>
          ))} */}
      </div>
    </div>
  );
}
