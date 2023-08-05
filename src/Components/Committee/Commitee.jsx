import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import style from "./Committee.module.css";
export default function Committee() {
  const user = useSelector((state) => state.user.value);
  const [club, setClub] = useState("");
  const clubs = [...user.adminInClub, ...user.committeeInClub];
  return (
    <div>
      <Sidebar />
      <div className={style.container}>
        <h3 className={style.commitTitle}>Committe Selection</h3>
        <div className={style.mail}>
          <input type="email" placeholder="Email" />
          <select value={club} onClick={(e) => setClub(e.target.value)}>
            {clubs.map((club) => (
              <option value={club.clubId}>{club.clubName}</option>
            ))}
          </select>
        </div>
      </div>
      <button className={style.button}>Submit</button>
    </div>
  );
}
