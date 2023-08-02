import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import style from "./TextPost.module.css"
export default function TextPost(){
    const location=useLocation()
    const format=location.state.format
    console.log(format)

    
    return(
        <div>
            <Sidebar/>
            <div className={style.container}>
                <textarea  className={style.textPost} rows={15} cols={80} placeholder="Text Post...."/>
                <textarea  className={style.caption} rows={4} cols={30} placeholder="Caption..."/>
                <div className={style.postes}>
                    <textarea className={style.tag} rows={3} cols={30} placeholder="tag...."/>
                    <p>Modes</p>
                    <div className={style.modes}>
                        <input type="radio" name="private"/>
                        <label>only for private members</label>
                    </div>  
                </div>
                <button className={style.post}>✔️</button>
            </div>
        </div>
    )
}