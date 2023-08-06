import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./ImagePost.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ImagePost() {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState();
  const [tags, setTags] = useState();
  const [useimg, setUseimg] = useState(null);
  const [mode, setMode] = useState(false);
  const user = useSelector((state) => state.user.value);
  const priviledgedClub = [...user.adminInClub, ...user.committeeInClub];
  const [clubs, setClubs] = useState(priviledgedClub[0].clubId);

  const location = useLocation();
  const format = location.state.format;
  console.log(format);

  function Imagehandler(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUseimg(e.target.files);
  }
  // console.log(useimg)
  async function SubmitHandler() {
    console.log(image);
    console.log(useimg);
    const data = new FormData();
    data.append("image", useimg[0]);
    console.log(data)
    const res1 = await fetch("https://ecapp.onrender.com/api/v1/posts/", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `bearer ${user.token}`,
      },
    });
    const res2 = await fetch(
      "https://ecapp.onrender.com/api/v1/posts/postDetail",
      {
        method: "POST",
        body: JSON.stringify({
          caption: caption,
          tags: tags,
          imgName: useimg[0].name,
          format,
          club: clubs * 1,
          modes: mode,
        }),
        headers: {
          Authorization: `bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const response = await Promise.all([res1, res2]);
    const data1 = await response[0].json();
    const data2 = await response[1].json();
    if (response[0].status === 200) {
      console.log(data1);
      console.log(data2);
    } else {
      console.log(data1, data2);
    }
  }
  console.log(clubs);
  return (
    <div>
      <Sidebar />
      <div className={style.container}>
        <label className={style.postbutton}>
          Click here to Upload
          <input type="file" name="image" onChange={Imagehandler} />
        </label>
        <div className={style.Imagepost}>
          {!image && <h1 className={style.info}>No Image Selected</h1>}
          {image && (
            <img
              className={image ? `${style.postImg}` : `${style.postImgAct}`}
              src={image}
            />
          )}
        </div>

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
            onChange={(e) => setTags(e.target.value)}
          />
          <p>Modes</p>
          <div className={style.modes}>
            <input
              type="radio"
              id="mode"
              name="private"
              checked={mode}
              onClick={() => {
                setMode((start) => !start);
              }}
            />
            <label htmlFor="mode"> only for private members</label>
            <div className={style.dropdown}>
              <select
                value={clubs.id}
                onClick={(e) => setClubs(e.target.value)}
              >
                {priviledgedClub.map((club) => (
                  <option
                    value={club.clubId}
                    onChange={(e) => setClubs(e.target.value)}
                  >
                    {club.clubName}
                  </option>
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
