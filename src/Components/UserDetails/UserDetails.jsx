import { useState } from "react";
import style from "./UserDetails.module.css";
import { useNavigate } from "react-router-dom";
export default function UserDetails() {
  const Navigate=useNavigate()
  const [blood, setBlood] = useState(false);
  const [users, setUsers] = useState("");
  const [fields, setFields] = useState({
    role: "",
    firstName: "",
    lastName: "",
    department: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    bloodDonor: blood,
    BloodGroup: "",
  });

  // function onBlooddonor(){
  //   setBlood((blood)=>!blood)
  // }


  function SubmitHandler(e) {
    e.preventDefault();
    const {name,value}=e.target;
    if(name==='bloodDonor')
    {
      setBlood((blood)=>!blood)
      setFields((prevData)=>({
        ...prevData,
        bloodDonor:!prevData.bloodDonor
      }))
    }
    else{

    setFields((prevData)=>({
        ...prevData,
        [name]:value
      }))
    }
    // console.log(fields)
    }

   async function onSubmitForm(e)
   {
    e.preventDefault()
    console.log(fields)
      const response= await fetch("http://10.11.6.27:3000/api/v1/users/user",
      {
        method:'PATCH',
        body:JSON.stringify({...fields}),
        headers:{"Content-type":"application/json"}
      })
      const res=await response.json();
      if(response.ok){
        Navigate('/login')
        console.log("success")
      }
      else{
        console.log("error")
        console.log(res)
      }
    }


  return (
    <div className={style.userprofilecontainer}>
      <div className={style.datas}>
        <div className={style.choosed}>
          <label className={style.users}>Student</label>
          <input value="Student" name="role"  type="radio"onChange={SubmitHandler}/>
          <label className={style.users}>Faculty</label>
          <input value="Faculty" name="role" type="radio" onChange={SubmitHandler}/>
        </div>
          <form className={style.forms} onSubmit={onSubmitForm}>
            {/* <img className={style.userprofileimage} src="./src/assets/PngItem_1503945.png" alt="" onClick={()=><Photo/>} /> */}
            <div className={style.userdata}>
              <div className={style.fieldWrapper}>
                <input
                  name="firstName"
                  value={fields.firstName} 
                  className={style.inputfield}
                  type="text"
                  placeholder="First Name"
                  onChange={SubmitHandler}
                />
                <input
                  name="lastName"
                  value={fields.lastName} 
                  className={style.inputfield}
                  type="text"
                  placeholder="Last Name"
                  onChange={SubmitHandler}
                />
              </div>
              <div className={style.fieldWrapper}>
                <label className={style.departmentlabel}>Department</label>
                <select
                  name="department"
                  value={fields.department} 
                  className={style.department}
                  placeholder="Department"
                  onChange={SubmitHandler}
                >
                  <option value="dept">🏬</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                  <option value="MECH">MECH</option>
                </select>
                <input
                  name="email"
                  value={fields.email} 
                  className={`${style.inputfield} ${style.email}`}
                  type="email"
                  placeholder="Email"
                  onChange={SubmitHandler}
                />
              </div>
              <div className={style.fieldWrapper}>
                <input
                  name="password"
                  value={fields.password} 
                  className={style.inputfield}
                  type="password"
                  placeholder="Password"
                  onChange={SubmitHandler}
                />
                {/* <input className={style.inputfield} type="email" placeholder="Email"/> */}
                <input
                  name="confirmPassword"
                  value={fields.confirmPassword} 
                  className={style.inputfield}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={SubmitHandler}
                />
              </div>
              <div className={style.fieldWrapper}>
                <input
                  name="phoneNumber"
                  value={fields.phoneNumber} 
                  className={style.Position}
                  type="number"
                  placeholder="Phone Number"
                  onChange={SubmitHandler}
                />
                {/* <label className={style.label}></label> */}
                <span className={style.span}>Are You A Blood Donor</span>
                <input
                  name="bloodDonor"
                  value={blood} 
                  className={style.Donor}
                  type="checkbox"
                  // onClick={SubmitHandler}
                  onChange={SubmitHandler}
                />
              </div>
              <div className={style.BloodContainer}>
                {blood && (
                  <select name="BloodGroup" value={fields.BloodGroup} className={style.BloodGrp} onChange={SubmitHandler}> 
                    <option value='BloodGrp'>🩸</option>
                    <option value="b+">B+</option>
                    <option value="b-">B-</option>
                    <option value="o+">O+</option>
                    <option value="o-">O-</option>
                    <option value="ab+">AB+</option>
                    <option value="ab-">AB-</option>
                    <option value="a+">A+</option>
                    <option value="a-">A-</option>
                  </select>
                )}
              </div>
              <button className={style.button}>Submit</button>
            </div>
          </form>
      </div>
    </div>
  );
}
