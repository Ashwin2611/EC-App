import { useState } from "react";
import style from "./Requestbox.module.css";
export default function Requestbox({
  member: { userId, firstName, lastName, department, clubId, clubName },
}) {
  const [approvalStatus, setApprovalStatus] = useState(false);
  // console.log(firstName);
  const [isVisible, setIsVisible] = useState(true);
  async function StatusHandler(isAccept) {
    // const approvalStatus = true
    setApprovalStatus(isAccept);
    const res = await fetch(
      `http://10.11.6.27:3000/api/v1/clubs/request/${userId}/${clubId}`,
      {
        method: "POST",
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc0NmQxNTFlZjE1YmY4NjY3NjJjYiIsImlhdCI6MTY5MDgwMzQyMywiZXhwIjoxNjk4NTc5NDIzfQ.FLrItOz5pGtjloQ_oFMW8AGXb_51HNJ8kBh3LAe-kZI",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ approvalStatus }),
      }
    );
    const result = await res.json();
    console.log(result);
    setIsVisible(false)
  }

  return (
    <>
      {isVisible && (
        <div className={style.container} id={clubId}>
          <div className={style.details}>
            <h3>Name : {`${firstName} ${lastName}`}</h3>
            <p>Department : {`${department} Club:${clubName}`}</p>
            {/* <p>ClubName: {clubName}</p> */}
            <div className={style.decide}>
              <button onClick={() => StatusHandler(true)}>✔️ Accept</button>
              <button onClick={() => StatusHandler(false)}>❌ Reject</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
