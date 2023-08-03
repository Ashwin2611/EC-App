import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import style from "./TextPost.module.css";
import { useState } from "react";
export default function TextPost() {
  const location = useLocation();
  const format = location.state.format;
  console.log(format);

  const [text, setText] = useState("");
  const [caption, setCaption] = useState("");
  const [tag, setTag] = useState("");
  const [mode, setMode] = useState(false);

  async function SubmitHandler() {
    const res = await fetch("http://10.11.6.27:3000/api/v1/posts/postDetail", {
      method: "Post",
      body: JSON.stringify({
        text: text,
        caption: caption,
        format,
        tags: tag,
        club: 3,
        modes:mode
      }),
      headers: {
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYzZGQ3NGEwYjhmZTljYzJhNmYwMiIsImlhdCI6MTY5MDUzNTU0MSwiZXhwIjoxNjk4MzExNTQxfQ.0HlwUM8BjhAZIpqxgcHtV-AhafUQbdp2jplcsNeyITg",
        "Content-Type": "application/json",
      },
    });
    const response = await res.json();
    if (res.ok) {
      console.log(response);
    } else {
      console.log(response);
    }
  }

  return (
    <div>
      <Sidebar />
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
           <select name="clubs"  className={style.clubs} onChange={SubmitHandler}> 
                    <option value='clubs'></option>
                    <option value="NSS">NSS</option>
                    <option value="NCC">NCC</option>
                    <option value="Fine Arts">Fine Arts</option>
            </select>
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
          </div>
        </div>
        <button className={style.post} onClick={SubmitHandler}>
          ✔️
        </button>
      </div>
    </div>
  );
}
