import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./MainAdmin.module.css";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState"
export default function MainAdmin() {
  const users = useSelector((state) => state.user.value);
  const [admin, setAdmin] = useState([]);
  const [acceptClub, setAcceptClub] = useState();
  const [userId, setUserId] = useState("");
  const [isLoading , setIsLoading] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  async function FetchHandler() {
    setIsLoading(true)
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
      setIsLoading(false)
      setIsAdmin(true)
    } else {
      console.log("error", res);
      setIsLoading(false)
    }
  }

  async function PostHandler(userId) {
    setIsLoading(true)
    console.log(userId);
    console.log(acceptClub);
    const response = await fetch(
      `https://ecapp.onrender.com/api/v1/users/request/${userId}/${acceptClub}`,
      {
        method: "POST",
        body: JSON.stringify({ approvalStatus: true }),
        headers: { Authorization: `bearer ${users.token}` },
      }
    );
    const res = await response.json();
    if (response.ok) {
      console.log(res);
      setIsLoading(false)
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
      {isLoading ?<LoadingState/> :isAdmin && admin.map((user) => (
        <div>
          {user.clubs.length ? (
            <div className={style.container}>
              <div className={style.data}>
                <h3>
                  Name: {user.firstName} {user.lastName}
                </h3>
                <div className={style.club}>
                  {user.clubs.length ? (
                    <select
                      // value={user.clubs[0].clubId}
                      onClick={(e) => setAcceptClub(e.target.value)}
                    >
                      {user.clubs.map((userclub) => (
                        <option value={userclub.clubId}>
                          {userclub.clubName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    ""
                  )}
                  <button
                    className={style.button}
                    onClick={() => PostHandler(user.userId)}
                  >
                    ✔ Accept
                  </button>
                </div>
              </div>
              <h3>Department:{user.department}</h3>
            </div>
          ) : ''}
        </div>
      ))}
    </div>
  );
}