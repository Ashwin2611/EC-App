import Sidebar from "../Sidebar/Sidebar";
import style from "./UserProfile.module.css";
import React, { useState } from 'react';
// import profileImage from "./src/assets/PngItem_1503945.png";

export default function UserProfile() {
  return (
    <div className={style.userprofilecontainer}>
      <Sidebar />
    <center>
      <form className={style.forms}>
        <img className={style.userprofileimage} src="./src/assets/PngItem_1503945.png" alt="" onClick={()=><Photo/>} />
        <div className={style.userdata}>
        <div className={style.fieldWrapper}>
            <input className={style.inputfield} type="text" placeholder="First Name"/>
            <input className={style.inputfield} type="text" placeholder="Last Name"/>
        </div>
        <div className={style.fieldWrapper}>
            <select  className={style.department} placeholder="Department">
                <option disabled value="dept">Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
            </select>
            <input className={style.inputfield} type="email" placeholder="Email"/>
        </div>
        <div className={style.fieldWrapper}>
            <input className={style.inputfield} type="password" placeholder="Reg No"/>
            {/* <input className={style.inputfield} type="email" placeholder="Email"/> */}
            <input className={style.inputfield} type="Number" placeholder="PhoneNo"/>
        </div>
        <div className={style.fieldWrapper}>
            <select  className={style.Position} value="Position" placeholder="Department">
                <option disabled value="Post">Position</option>
                <option value="ITA">ITA President</option>
                <option value="CSI">CSI President</option>
                <option value="CO">coordinator</option>
                <option value="NONE">none</option>
            </select>
            <br/>
            {/* <label className={style.label}></label> */}
            <span className={style.span}>Are You A Blood Donor</span><input className={style.Donor} type="checkbox"/>
        </div>
        <div  className={style.fieldWrapper}>
          <p className={style.register}>Register</p>
          <p className={style.clubregister}>Club Registration</p>
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
        style={{ display: 'none' }}
        accept="image/*"
        onClick={handlePhotoUpload}
      />
      <label htmlFor="profilePhotoInput">
        <img
          src={profilePhoto || 'profile-photo.jpg'}
          alt="Profile Photo"
          id="profilePhoto"
        />
      </label>
    </div>
  );
}


