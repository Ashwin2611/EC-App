import { useState } from "react";
import style from "./Dummy.module.css";
import { useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";

export default function Dummy() {
  const user = useSelector((state) => state.user.value);
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState();
  const [useimg, setUseimg] = useState(null);

  function Imagehandler(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUseimg(e.target.files);
  }

  async function SubmitHandler() {
    console.log();
    const data = new FormData();
    data.append("image", useimg[0]);
    console.log(data);
    const response = await fetch(
      "https://ecapp.onrender.com/api/v1/users/user/profileimage",
      {
        method: "PATCH",
        body: JSON.stringify({ image: data }),
        headers: {
          Authorization: `bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    if (response.ok) {
      console.log(res);
    } else {
      console.log("error", res);
    }
  }
  return (
    <div>
      <Sidebar/>
      <label className={style.labels}>
        ➕
        <input type="file" name="image" onChange={Imagehandler} />
      </label>
      <img
        className={style.profile}
        src={!image ? "PngItem_1503945.png" : image}
      />
      <button className={style.button} onClick={SubmitHandler}>
        Submit
      </button>
    </div>
  );
}
