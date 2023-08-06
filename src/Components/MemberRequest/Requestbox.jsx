import { useState } from "react";
import style from "./Requestbox.module.css";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState"
export default function Requestbox({
  member: { userId, firstName, lastName, department, clubId, clubName },
}) {
  const user = useSelector((state) => state.user.value);
  const [approvalStatus, setApprovalStatus] = useState(false);
  // console.log(firstName);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function StatusHandler(isAccept) {
    setIsLoading(true)
    // const approvalStatus = true
    setApprovalStatus(isAccept);
    const res = await fetch(
      `https://ecapp.onrender.com/api/v1/clubs/request/${userId}/${clubId}`,
      {
        method: "POST",
        headers: {
          Authorization: `bearer ${user.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ approvalStatus: isAccept }),
      }
    );
    const result = await res.json();
    console.log(result);
    setIsVisible(false);
    setIsLoading(false)
  }

  return (
    <>
      {isLoading ? <LoadingState/> : isVisible && (
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
