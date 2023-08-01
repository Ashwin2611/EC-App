import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import style from "./UserProfileEdit.module.css";
import React, { useState } from "react";
// import profileImage from "./src/assets/PngItem_1503945.png";

export default function UserProfile() {
  const navigate=useNavigate()
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [department, setDepartment] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  function SubmitHandler(e) {
    e.preventDefault()
    async function EditProfile() {
      const res = await fetch(
        "http://10.11.6.27:3000/api/v1/users/user/updateDetail",
        {
          method: "PATCH",
          body: JSON.stringify({userDetail:{
            firstName: firstName,
            lastName: lastName,
            department: department,
            phoneNo: phoneNo,
          }}),
          headers: {
            Authorization:
              "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjYzZGQ3NGEwYjhmZTljYzJhNmYwMiIsImlhdCI6MTY5MDUzNTU0MSwiZXhwIjoxNjk4MzExNTQxfQ.0HlwUM8BjhAZIpqxgcHtV-AhafUQbdp2jplcsNeyITg",
            "Content-type": "application/json",
          },
        }
      );
      if(res.ok)
      {
        alert("DATA EDITED SUCCESSFULLY")
        navigate("/userprofile")
      }
      else
      {
        console.log("error")
      }
    }
    EditProfile()
  }

  return (
    <div className={style.userprofilecontainer}>
      <Sidebar />
      <center>
        <form className={style.forms} onSubmit={SubmitHandler}>
          <img
            className={style.userprofileimage}
            src="./src/assets/PngItem_1503945.png"
            alt=""
            onClick={() => <Photo />}
          />
          <div className={style.userdata}>
            <div className={style.fieldWrapper}>
              <input
                className={style.inputfield}
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={style.inputfield}
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className={style.fieldWrapper}>
              <select
                className={style.department}
                placeholder="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">
                  Department
                </option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
              </select>
              <input
                className={style.inputfield}
                type="number"
                placeholder="PhoneNo"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <button className={style.button}>Submit</button>
          </div>
        </form>
      </center>
    </div>
  );
}

function Photo() {
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <input
        type="file"
        id="profilePhotoInput"
        style={{ display: "none" }}
        accept="image/*"
        onClick={handlePhotoUpload}
      />
      <label htmlFor="profilePhotoInput">
        <img
          src={profilePhoto || "profile-photo.jpg"}
          alt="Profile Photo"
          id="profilePhoto"
        />
      </label>
    </div>
  );
}
