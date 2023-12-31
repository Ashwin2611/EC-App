import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import style from "./TextPost.module.css";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function TextPost() {
  const location = useLocation();
  const format = location.state.format;
  console.log(format);

  const user=useSelector((state)=>state.user.value)
  const [text, setText] = useState("");
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");
  const [mode, setMode] = useState(false);
  const priviledgedClub = [...user.adminInClub,...user.committeeInClub]
  const [clubs, setClubs] = useState(priviledgedClub[0].clubId);
  const [isLoading,setIsLoading]=useState(false)

  async function SubmitHandler() {
    setIsLoading(true)
    const res = await fetch("https://ecapp.onrender.com/api/v1/posts/postDetail", {
      method: "Post",
      body: JSON.stringify({
        text: text,
        caption: caption,
        format,
        tags: tag,
        club: clubs*1,
        modes:mode
      }),
      headers: {
        Authorization:
          `bearer ${user.token}`,
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (res.ok) {
      setIsLoading(false)
      console.log(response);
    } else {
      console.log(response);
    }
  }

  return (
    <div>
      <Sidebar />
      { isLoading && <h3 className={style.imagesUpload}>UPLOADING.....</h3> }
      <div className={style.container}>
        <textarea
          className={style.textPost}
          rows={15}
          cols={80}
          placeholder="Text Post...."
          onChange={(e) => setText(e.target.value)}
        />
        <textarea
          className={style.caption}
          rows={4}
          cols={30}
          placeholder="Caption..."
          onChange={(e) => setCaption(e.target.value)}
        />
        <div className={style.postes}>
          <textarea
            className={style.tag}
            rows={3}
            cols={30}
            placeholder="tag...."
            onChange={(e) => setTag(e.target.value)}
          />
          <p>Modes</p>
          <div className={style.modes}>
            <input
              id="modes"
              type="radio"
              name="private"
              checked={mode}
              onClick={() => {
                setMode((start) => !start);
              }}
            />
            <label htmlFor="modes"> only for private members</label>
            <div className={style.dropdown}>
              <select
                value={clubs.clubId}
                onClick={(e) => setClubs(e.target.value)}
              >
                {priviledgedClub.map((club) => (
                  <option value={club.clubId}>{club.clubName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button className={style.post} onClick={SubmitHandler}>
          ✔️
        </button>
      </div>
    </div>
  );
}
