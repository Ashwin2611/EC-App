import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./ClubRegistration.module.css";
import { useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";
export default function ClubRegistration() {
  const users = useSelector((state) => state.user.value);
  const [clubs, setClubs] = useState([]);
  const [isClub, setIsClub] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [clubId, setClubId] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let clubIdList = [];

  useEffect(() => {
    async function Club() {
      setIsLoading(true);
      const response = await fetch(
        "https://ecapp.onrender.com/api/v1/clubs/club",
        {
          method: "Get",
          headers: {
            Authorization: `bearer ${users.token}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      // if (res.ok) {
      setIsLoading(false);
      const { userNotJoinedClubList } = res.data;
      // const dummy = clubs.filter(
      //   (club) => !userClubList.includes(club.clubName)
      // );
      setClubs(userNotJoinedClubList);
      setIsClub(true);
      // }
    }
    Club();
  }, []);

  const handleCheckboxChange = (e) => {
    const { name, checked, value } = e.target;
    console.log(name, checked);
    let items = { ...checkedItems, [name]: checked };
    setCheckedItems(items);
    if (checked) {
      setClubId((prev) => [...prev, value * 1]);
    } else {
      setClubId((prevValue) => prevValue.filter((prev) => prev != value * 1));
    }
  };

  async function SubmitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    console.log(clubId);
    const response = await fetch(
      "https://ecapp.onrender.com/api/v1/clubs/club",
      {
        method: "PATCH",
        headers: {
          Authorization: `bearer ${users.token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          clubs: [...clubId],
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      setIsLoading(false);
      console.log(data);
      alert("Registration successful");
      const dummy = clubs.filter((club) => !clubId.includes(club.clubId));
      setClubs(dummy);
    } else {
      console.log("Error");
    }
  }

  return (
    <div>
      <Sidebar />
      {isLoading ? (
       <div className={style.loading}> <LoadingState /></div>
      ) : (
        <>
          <h3 className={style.name}>Club Registration</h3>
          <form onSubmit={SubmitHandler}>
            <div className={style.Clubs}>
              {isClub &&
                clubs.map(({ clubId, clubName }) => (
                  <div className={style.club}>
                    <label>{clubName}</label>
                    <input
                      name={clubName}
                      value={clubId}
                      type="checkbox"
                      checked={checkedItems[clubName] || false}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                ))}

              {/* <div className={style.club}>
                    <label>NSS Club</label>
                    <input name="NSS" value={1} type="checkbox" onClick={()=>setClubCheck(()=>!clubCheck.name)}/>
                </div>
                <div className={style.club}>
                    <label>NCC Club</label>
                    <input name="NCC" value={2} type="checkbox" onClick={()=>setClubCheck(()=>!clubCheck.name)}/>
                </div>
                <div className={style.club}>
                    <label>YRC Club</label>
                    <input name="YRC" value={3} type="checkbox" onClick={()=>setClubCheck(()=>!clubCheck.name)}/>
                </div>
                <div className={style.club}>
                    <label>YOGA</label>
                    <input name="YOGA" value={4} type="checkbox" />
                </div>
                <div className={style.club}>
                    <label>Fine Arts Club</label>
                    <input name="FinrArts" value={6} type="checkbox"/>
                </div>
                <div className={style.club}>
                    <label>Eco Club</label>
                    <input name="ECO" value={7} type="checkbox" />
                </div>
                <div className={style.club}>
                    <label>Linux Club</label>
                    <input name="Linux" value={5} type="checkbox"/>
                </div> */}
              <button className={style.button} type="submit">
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

// if (items[name]) {
//     setClubId((prevData) => [...prevData, value * 1]);
//     console.log("clubId: " + clubId);

//     clubId.map((club) => {
//       if (!clubIdList.includes(club)) {
//         clubIdList.push(club);
//       }
//     });

//     console.log("clubIdList: " + clubIdList);
//   } else {
//     const dummyClubId = clubId.filter((cI) => cI != value * 1);
//     console.log(dummyClubId);
//     setClubId(dummyClubId);
//     clubIdList = dummyClubId;
//   }
//   setCheckedItems(items);
//   clubIdList = [...clubIdList, value * 1];
