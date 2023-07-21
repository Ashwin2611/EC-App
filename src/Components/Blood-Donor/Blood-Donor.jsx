import { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./Blood-Donor.module.css";
export default function BloodDonor() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState([]);
  const apiHandler = async () => {
    const url = `http://10.11.6.27:3000/api/v1/users/donor?firstName=${name}&department=${department}&bloodGroup=${bloodGroup}`;
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjIzZGY2ODJhZDE0MzRkMGIwZDc5YSIsImlhdCI6MTY4OTkyOTg1MCwiZXhwIjoxNjkwMDE2MjUwfQ.5qJ1VTeK0o7CvMi48duyQbQ467YP7bwx1pFI_UXx4Qk",
        "Content-type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result.data.user);
      setUser(result.data.user);
      //   console.log(user);
    } else {
      console.log("Error");
    }
  };
  //   console.log(user)
  useEffect(() => {
    apiHandler();
  }, []);
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
              setName(() => e.target.value);
              apiHandler();
            }}
          />
          <select
            className={style.blood}
            name="BloodGroup"
            onChange={(e) => {
              setBloodGroup(() => e.target.value);
              apiHandler();
            }}
          >
            <option value="">BloodGrp</option>
            <option value="B%2B">B+</option>
            <option value="B-">B-</option>
            <option value="O%2B">O+</option>
            <option value="O-">O-</option>
            <option value="AB%2B">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A%2B">A+</option>
            <option value="A-">A-</option>
          </select>
          <select
            className={style.department}
            onChange={(e) => {
              setDepartment(() => e.target.value);
              apiHandler();
            }}
          >
            <option value="">Department</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        </div>
      </>
      <div className={style.usercontainar}>
        {/* {user &&
          user.map((user) => (
            <div>
                <img className={style.userimage} src={"./src/assets/PngItem_1503945.png"} alt="Image" height={28} />
                <h3 className={style.userdata}>{user.firstName} {user.lastName}</h3>
            </div>
          ))}
        {user &&
          user.map((user) => (
            <div>
                <img className={style.userimage} src={"./src/assets/PngItem_1503945.png"} alt="Image" height={28} />
                <h3 className={style.userdata}>{user.firstName} {user.lastName}</h3>
            </div>
          ))} */}
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Ashwin 
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja 
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja 
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja 
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
        <div className={style.userdata}>
          <img
            className={style.userimage}
            src={"./src/assets/PngItem_1503945.png"}
            alt="Image"
            height={50}
          />
          <h3 className={style.userdata}>
            Maharaja S S
          </h3>
        </div>
      </div>
    </div>
  );
}
