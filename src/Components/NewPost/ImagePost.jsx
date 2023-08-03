import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./ImagePost.module.css";
import { useLocation } from "react-router-dom";

export default function ImagePost() {
  const [image, setImage] = useState();
  const [caption, setCaption] = useState();
  const [tags, setTags] = useState();
  const [useimg, setUseimg] = useState(null);
  const [mode, setMode] = useState(false);

  const location = useLocation();
  const format = location.state.format;
  console.log(format);

  function Imagehandler(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUseimg(e.target.files);
  }
  async function SubmitHandler() {
    console.log(image);
    console.log(useimg);
    const data = new FormData();
    data.append("image", useimg[0]);
    const res1 = await fetch("http://10.11.6.27:3000/api/v1/posts/", {
      method: "POST",
      body: data,
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYzZGQ3NGEwYjhmZTljYzJhNmYwMiIsImlhdCI6MTY5MDUzNTU0MSwiZXhwIjoxNjk4MzExNTQxfQ.0HlwUM8BjhAZIpqxgcHtV-AhafUQbdp2jplcsNeyITg",
      },
    });
    const res2 = await fetch("http://10.11.6.27:3000/api/v1/posts/postDetail", {
      method: "POST",
      body: JSON.stringify({
        caption: caption,
        tags: tags,
        imgName: useimg[0].name,
        format,
        club: 3,
        modes:mode
      }),
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYzZGQ3NGEwYjhmZTljYzJhNmYwMiIsImlhdCI6MTY5MDUzNTU0MSwiZXhwIjoxNjk4MzExNTQxfQ.0HlwUM8BjhAZIpqxgcHtV-AhafUQbdp2jplcsNeyITg",
        "Content-Type": "application/json",
      },
    });

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
          </div>
        </div>
        <button className={style.post} onClick={SubmitHandler}>
          ✔️
        </button>
      </div>
    </div>
  );
}
