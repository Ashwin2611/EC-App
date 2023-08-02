import Sidebar from "../Sidebar/Sidebar";
import style from "./NewPost.module.css";
import { useNavigate } from "react-router-dom";
export default function NewPost() {
    const navigate=useNavigate();
  return (
    <>
      <Sidebar />
      <div className={style.head}>
        <div className={style.container}>
          <button onClick={()=>navigate('/textPost',{
            state:{
              format:"text"
            }
          })}>Text Post</button>
          <button onClick={()=>navigate('/imagePost',{
            state:{
              format:"image"
            }
          })}>Image Post</button>
        </div>
      </div>
    </>
  );
}
