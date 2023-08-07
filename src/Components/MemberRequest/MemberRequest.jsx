import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Requestbox from "./Requestbox";
import style from "./MemberRequest.module.css";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";
export default function MemberRequest() {
  const user = useSelector((state) => state.user.value);
  const [members, setMembers] = useState([]);
  const [isMembers, setIsMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const memberListHandler = async () => {
      try {
        const res = await fetch(
          "https://ecapp.onrender.com/api/v1/clubs/request",
          {
            method: "GET",
            headers: {
              Authorization: `bearer ${user.token}`,
            },
          }
        );

        const {
          data: { users },
        } = await res.json();

        setMembers(users);
        setIsMembers(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching members:", error);
        setIsLoading(false);
      }
    };

    memberListHandler();
  }, []);

  return (
    <div>
      <Sidebar />
      {/* <h3>Request Page</h3> */}
      {isLoading ? (
        <div className={style.loading}><LoadingState /></div>
      ) : (members.length ? (
        members.map((member) => <Requestbox member={member} />)
      ) : (
        <h1 className={style.noUser}>No Members Found</h1>
      ))}
    </div>
  );
}
