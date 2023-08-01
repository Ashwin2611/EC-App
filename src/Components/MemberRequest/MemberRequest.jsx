import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Requestbox from "./Requestbox";

export default function MemberRequest() {
  const [members, setMembers] = useState([]);
  const [isMembers, setIsMembers] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const memberListHandler = async () => {
      try {
        const res = await fetch("http://192.168.239.240:3000/api/v1/users/request", {
          method: 'GET',
          headers: {
            Authorization: "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc0NmQxNTFlZjE1YmY4NjY3NjJjYiIsImlhdCI6MTY5MDc4MjY4NCwiZXhwIjoxNjk4NTU4Njg0fQ.mkLF5XVO8C7auR_Aaiu_4E6HDaC3qI9AYjwyb_iz2IM",
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
