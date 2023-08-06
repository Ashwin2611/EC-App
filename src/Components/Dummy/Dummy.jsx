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
    // console.log(useimg[0].name);
  }

  async function SubmitHandler() {
    const data = new FormData();
    data.append("image", useimg[0]);
    console.log(data);
    const response = await fetch(
      "https://ecapp.onrender.com/api/v1/users/user/profileimage",
      {
        method: "PATCH",
        body: JSON.stringify({ data }),
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    const res = await response.json();
    if (response.ok) {
      console.log(res);
      setImageName(useimg[0].name);
    } else {
      console.log("error", res);
    }

    const response1 = await fetch(
      "https://ecapp.onrender.com/api/v1/users/user/profileimagename",
      {
        method: "PATCH",
        body: JSON.stringify({ originalname: imageName }),
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    const res1 = await response1.json();
    if (response.ok) {
      console.log(res1);
    } else {
      console.log("error", res);
    }
  }
  return (
    <div>
      <Sidebar />
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
