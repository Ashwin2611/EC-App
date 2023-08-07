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
    console.log(useimg[0].name);
  }

  async function SubmitHandler() {
    const data = new FormData();
    data.append("image", useimg[0]);
    console.log(data);
    const res1 = await fetch(
      "http://10.11.6.27:3000/api/v1/users/user/profileimage",
      {
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    // setImageName(useimg[0].name);
    console.log(imageName);
    const res2 = await fetch(
      "http://10.11.6.27:3000/api/v1/users/user/profileimagename",
      {
        method: "PATCH",
        body: JSON.stringify({ originalname: useimg[0].name }),
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
      // isLoading(false);
      console.log(data1);
      console.log(data2);
    } else {
      console.log(data1, data2);
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
