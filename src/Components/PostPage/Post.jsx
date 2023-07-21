import React from 'react';
import style from "./Post.module.css"
import LargeMessage from './LargeMessage';
import { useState } from 'react';

export default function Post({clubs}) {
    const[heart,setheart]=useState(false)
    const[likes,setLikes]=useState(0);
    console.log(clubs.club)
    
    function handler(){
        setheart((heart)=>!heart)
        console.log(heart)
        if(!heart){
            setLikes((count)=>count+1)
        }else{
            setLikes((count)=>count-1)
        }
        
    }
  return (
    <div className={style["instagram-post"]}>
      <div className={style["post-header"]}>
        {/* <img className={style["profile-picture"]} src="./src/assets/images.png" alt="Profile" /> */}
        
      </div>
      <img className={style["post-image"]} src={clubs.images} alt="Post" />
      <img src='./src/assets/NSSlogo.jpg'className={style.icon} height={30}/>
      <p className={style.clubName}>{clubs.club}</p>
      <LargeMessage  className={style["post-caption"]} message={clubs.comments} maxCharCount={100}/>
      <div className={style["post-actions"]}>
        <span className={style["heart"]} onClick={handler}>
            {heart ? <img src='./src/assets/heart.png' height={28}/> : <img src='./src/assets/colorlessHeart.png' height={30}/>}
        </span>
        <span className={style["action-icon"]}>
            <img src='./src/assets/comment.png' height={30}/>
        </span>
      </div>
      <div className={style["likes-count"]}>{likes} likes</div>
      <input className={style["comment-section"]} type="text" placeholder='comments...'/>
    </div>
  );
}


