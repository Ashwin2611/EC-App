import Sidebar from '../Sidebar/Sidebar'
import style from './Blood-Donor.module.css'
export default function BloodDonor(){
    return(
        <>
        <Sidebar/>
        <div className={style.container}>
            
            <input className={style.search} type="text" placeholder="Search"/>
            <select className={style.department} >
                <option disabled value="dept">Department</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
            </select>
        </div>
        </>
    )
}