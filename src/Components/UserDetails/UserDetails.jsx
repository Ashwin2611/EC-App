import { useState } from "react"
import style from "./UserDetails.module.css"
export default function UserDetails(){
    const [blood,setBlood]=useState(false)

    const [name,setName] = useState('sundar')

    async function Handler(e){
        e.preventDefault();
        const response=await fetch(`http://10.11.6.27:3000/api/v1/users/donor?firstName[regex]=${name}`,{
            headers:{
                "authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjI2NjFiNzQ3NjQ0MGYyOGY4OGNjZSIsImlhdCI6MTY4OTU4ODg5OCwiZXhwIjoxNjg5Njc1Mjk4fQ.WJB7jz0QcJrKvDNLCbP045BL0xrBKfW1ZLxrz7zT3Nc"
            }
        })
        const res=await response.json()
        if(response.ok)
        {
            console.log(res)
        }
        else{
            console.log(res)
        }
    }
    return(
        <div className={style.userprofilecontainer}>
        <div className={style.choosemember}>
            <label className={style.user}>Student</label>
                <input name="user"type="radio"/>
            <label className={style.user}>Staff</label>
                <input name="user" type="radio"/>
        </div>
            
    <center>
      <form className={style.forms}>
        {/* <img className={style.userprofileimage} src="./src/assets/PngItem_1503945.png" alt="" onClick={()=><Photo/>} /> */}
        <div className={style.userdata}>
        <div className={style.fieldWrapper}>
            <input className={style.inputfield} type="text" placeholder="First Name"/>
            <input className={style.inputfield} type="text" placeholder="Last Name"/>
        </div>
        <div className={style.fieldWrapper}>
            <label className={style.departmentlabel}>Department</label>
            <select  className={style.department} placeholder="Department">
                <option disabled value="dept">Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
            </select>
            <input className={`${style.inputfield} ${style.email}`} type="email" placeholder="Email"/>
        </div>
        <div className={style.fieldWrapper}>
            <input className={style.inputfield} type="password" placeholder="Password"/>
            {/* <input className={style.inputfield} type="email" placeholder="Email"/> */}
            <input className={style.inputfield} type="password" placeholder="Confirm Password"/>
        </div>
        <div className={style.fieldWrapper}>
            <input className={style.Position} type="number" placeholder="Phone Number"/>
            {/* <label className={style.label}></label> */}
            <span className={style.span}>Are You A Blood Donor</span><input className={style.Donor} type="checkbox" onClick={()=>setBlood((blood)=>!blood)}/>
        </div>
        <div className={style.BloodContainer}>
            {blood && <select className={style.BloodGrp}>
                <option value='B+'>B+</option>
                <option value='B-'>B-</option>
                <option value='O+'>O+</option>
                <option value='O-'>O-</option>
                <option value='AB+'>AB+</option>
                <option value='AB-'>AB-</option>
                <option value='A+'>A+</option>
                <option value='A-'>A-</option>
                </select>
            }
        </div>
            <button className={style.button}>Submit</button>
        </div>
      </form>
      </center>
    </div>
    )
}