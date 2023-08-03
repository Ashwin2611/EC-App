import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Requestbox from "./Requestbox";
import { useSelector } from "react-redux";

export default function MemberRequest() {

  const user=useSelector((state)=>state.user.value)
  const [members, setMembers] = useState([]);
  const [isMembers, setIsMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const memberListHandler = async () => {
      try {
        const res = await fetch("http://10.11.6.27:3000/api/v1/clubs/request", {
          method: 'GET',
          headers: {
            Authorization: `bearer ${user.token}`,
          }
        });

        const { data: { users } } = await res.json();

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
      <h3>Request Page</h3>
      {isLoading ? (
        <p>Loading...</p>
      ) : isMembers ? (
        members.map((member) => <Requestbox member={member} />)
      ) : (
        <p>No members found.</p>
      )}
    </div>
  );
}
