import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./MainAdmin.module.css";
import { useSelector } from "react-redux";
export default function MainAdmin() {
  const users = useSelector((state) => state.user.value);
  const [admin, setAdmin] = useState([]);
  const [acceptClub, setAcceptClub] = useState("");

  async function FetchHandler() {
    const response = await fetch(
      "https://ecapp.onrender.com/api/v1/users/request",
      {
        method: "GET",
        headers: { Authorization: `bearer ${users.token}` },
      }
    );
    const res = await response.json();
    if (response.ok) {
      console.log(res);
      setAdmin(res.data.eligibleToJoinAsAdminUsersList);
    } else {
      console.log("error", res);
    }
  }
  useEffect(() => {
    FetchHandler();
  }, []);
  console.log(admin);
  return (
    <div>
      <Sidebar />
      {admin.map((user) => (
        <div className={style.container}>
          <div className={style.data}>
            <h3>
              Name: {user.firstName} {user.lastName}
            </h3>
            <div className={style.club}>
              <select
                value={acceptClub}
                onClick={(e) => setAcceptClub(e.target.value)}
              >
                {user.clubs.map((userclub) => (
                  <option value={userclub.clubId}>{userclub.clubName}</option>
                ))}
              </select>
            </div>
          </div>
          <h3>Department:{user.department}</h3>
        </div>
      ))}
    </div>
  );
}
