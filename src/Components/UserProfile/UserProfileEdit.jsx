import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import style from "./UserProfileEdit.module.css";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import profileImage from "./src/assets/PngItem_1503945.png";

export default function UserProfile() {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const location = useLocation();
  const fName = location.state.firstName;
  const lName = location.state.lastName;
  const depart = location.state.department;
  const phoneNumber = location.state.phoneNo;
  const images = location.state.image;
  const [firstName, setFirstName] = useState(fName);
  const [lastName, setLastName] = useState(lName);
  const [department, setDepartment] = useState(depart);
  const [phoneNo, setPhoneNo] = useState(phoneNumber);
  // const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(images.profileLink);
  const [useimg, setUseimg] = useState(images);
  const [changeImg,setChangeImage]=useState(false)
  const [imageName,setImageName]=useState(images.profileName)


  function Imagehandler(e) {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUseimg(e.target.files);
    console.log(useimg[0].name);
    setChangeImage(true)
    console.log(image);
  }

  async function SubmitHandler(e) {
    e.preventDefault();
    const data = new FormData();
    if(changeImg)
    {
      data.append("image", useimg[0]);
      setImageName(useimg[0].name)
    }
    else
    {
      data.append("image",useimg.profileLink)
    }
    console.log(useimg);
    const res1 = await fetch(
      "https://ecapp.onrender.com/api/v1/users/user/profileimage",
      {
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `bearer ${user.token}`,
        },
      }
    );
    console.log(data)
    // setImageName(useimg[0].name);
    console.log(imageName);
    const res2 = await fetch(
      "https://ecapp.onrender.com/api/v1/users/user/profileimagename",
      {
        method: "PATCH",
        body: JSON.stringify({ originalname: imageName}),
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
    async function EditProfile() {
      const res = await fetch(
        "https://ecapp.onrender.com/api/v1/users/user/updateDetail",
        {
          method: "PATCH",
          body: JSON.stringify({
            userDetail: {
              firstName: firstName,
              lastName: lastName,
              department: department,
              phoneNo: phoneNo,
            },
          }),
          headers: {
            Authorization: `bearer ${user.token}`,
            "Content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        alert("DATA EDITED SUCCESSFULLY");
        navigate("/userprofile");
      } else {
        console.log("error");
      }
    }
    EditProfile();
  }

  return (
    <div className={style.userprofilecontainer}>
      <Sidebar />
      <center>
        <form className={style.forms} onSubmit={SubmitHandler}>
          <label className={style.labels}>
            ➕
            <input type="file" name="image" onChange={Imagehandler} />
          </label>
          <img
            className={style.userprofileimage}
            src={!images ? "./src/assets/PngItem_1503945.png" : image}
            alt=""
          />
          <div className={style.userdata}>
            <div className={style.fieldWrapper}>
              <input
                className={style.inputfield}
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={style.inputfield}
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={style.fieldWrapper}>
              <select
                className={style.department}
                value={department}
                placeholder="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </select>
              <input
                className={style.inputfield}
                type="number"
                value={phoneNo}
                placeholder="PhoneNo"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <div className={style.changePassword}>
              <Link to="/changePassword">Change Password</Link>
            </div>
            <button className={style.button} onClick={SubmitHandler}>
              Submit
            </button>
          </div>
        </form>
      </center>
    </div>
  );
}
