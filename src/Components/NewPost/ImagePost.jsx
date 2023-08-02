import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import style from "./ImagePost.module.css";
import { useLocation } from "react-router-dom";

export default function ImagePost() {
  const [image, setImage] = useState();
  const [useimg,setUseimg]=useState(null);
  const location = useLocation();
  const format = location.state.format;
  console.log(format);

  function Imagehandler(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUseimg(e.target.files);
  }
  async function SubmitHandler() {
    console.log(image)
    console.log(useimg)
    const data = new FormData()
    data.append('image',useimg[0])
    const res = await fetch("http://192.168.240.240:3000/api/v1/posts/", {
      method: "POST",
      body: data,
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc0NmQxNTFlZjE1YmY4NjY3NjJjYiIsImlhdCI6MTY5MDc4MjY4NCwiZXhwIjoxNjk4NTU4Njg0fQ.mkLF5XVO8C7auR_Aaiu_4E6HDaC3qI9AYjwyb_iz2IM",
      },
    });
    const response = await res.json();
    console.log(response);
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
        />
        <div className={style.postes}>
          <textarea
            className={style.tag}
            rows={3}
            cols={30}
            placeholder="tag...."
          />
          <p>Modes</p>
          <div className={style.modes}>
            <input type="radio" name="private" />
            <label>only for private members</label>
          </div>
        </div>
        <button className={style.post} onClick={SubmitHandler}>
          ✔️
        </button>
      </div>
    </div>
  );
}
