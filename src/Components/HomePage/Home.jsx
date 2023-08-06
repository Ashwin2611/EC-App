import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Post from "../PostPage/Post";
import Sidebar from "../Sidebar/Sidebar";
import style from "./Home.module.css";

const arraylist = [
  {
    club: "NSS",
    images: "https://jamiasalafiyapharmacycollege.com/public/img/nss.jpg",
    comments:
      "I will never compromise on the values and principles that guide me as an NCC cadet",
  },
  {
    club: "NSS",
    images:
      "https://static.toiimg.com/thumb/msid-71027611,width-1280,resizemode-4/71027611.jpg",
    comments:
      "I will always be prepared, both mentally and physically, to serve my nation whenever called upon.",
  },
  {
    club: "NCC",
    images:
      "https://bsmedia.business-standard.com/_media/bs/img/article/2020-04/08/full/1586368068-6391.jpg",
    comments: "History of our diversified culture",
  },
  {
    club: "ECO",
    images: "https://i.ytimg.com/vi/IlGct62sLw8/hqdefault.jpg",
    comments:
      " uses 100% recycled plastics to make aesthetic, durable and environmentally friendly plastic lumber for use in applications ranging from fencing to landscaping",
  },
  {
    club: "Linux",
    images:
      "https://fosspost.org/wp-content/uploads/2020/03/linux-2025130_640.png.webp",
    comments:
      "usermod command followed by the -c (comment flag), then followed by the comment in quotes, and then specify the name of the user to add the comment in Linux.",
  },
  {
    club: "NSS",
    images: "https://ramanujancollege.ac.in/media/images/NSS-1.original.jpg",
    comments:
      "As an NCC cadet, I will learn to overcome fear and develop courage in the face of adversity.",
  },
];
export default function Home() {
  const [posts, setPosts] = useState([]);
  // const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clubId, setClubId] = useState("");

  const users = useSelector((state) => state.user.value);
  console.log(users.token);

  useEffect(() => {
    ImageFetch();
  }, []);

  async function ImageFetch() {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://ecapp.onrender.com/api/v1/posts?clubId=${clubId}`,
        {
          method: "GET",
          headers: { Authorization: `bearer ${users.token}` },
        }
      );
      const res = await response.json();
      if (response.ok) {
        console.log(res.data.posts);
        setPosts(res.data.posts);
        setIsLoading(false);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    ImageFetch();
  }, [clubId]);

  //   console.log(user.token);
  return (
    <div className={style.container}>
      <Sidebar />
      <div className={style.dropdown}>
        <select
          value={clubId}
          onClick={(e) => {
            setClubId(e.target.value);
          }}
        >
          {users.clubs.map((club) => (
            <option value={club.clubId}>{club.clubName}</option>
          ))}
        </select>
      </div>
      <div className={style.Post}>
        {isLoading && <h1 className={style.loading}>Loading...</h1>}
        {!isLoading && posts && posts.map((post) => <Post posts={post} />)}
      </div>
      {/* <Post/> */}
    </div>
  );
}
