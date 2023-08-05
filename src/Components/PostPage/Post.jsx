import React, { useEffect } from "react";
import style from "./Post.module.css";
import LargeMessage from "./LargeMessage";
import { useState } from "react";

import Messages from "./Messages";
import { useSelector } from "react-redux";

const msg = [
  {
    message: "Great post! I really enjoyed reading it.",
  },
  {
    message: "This is so helpful! Thanks for sharing.",
  },
  {
    message: "Awesome content! Keep up the good work.",
  },
  {
    message: "I have a similar experience. Thanks for sharing your thoughts.",
  },
  {
    message: "Your post inspired me. I'll definitely try this out.",
  },
  {
    message: "Very informative. I learned a lot from your post.",
  },
  {
    message: "I totally agree with your point. Well said!.",
  },
  {
    message: "I have a similar experience. Thanks for sharing your thoughts.",
  },
  {
    message: "Your post inspired me. I'll definitely try this out.",
  },
  {
    message: "Very informative. I learned a lot from your post.",
  },
  {
    message: "I totally agree with your point. Well said!.",
  },
  {
    message: "I have a similar experience. Thanks for sharing your thoughts.",
  },
  {
    message: "Your post inspired me. I'll definitely try this out.",
  },
  {
    message: "Very informative. I learned a lot from your post.",
  },
  {
    message: "I totally agree with your point. Well said!.",
  },
];
export default function Post({
  posts: {
    _id,
    image,
    clubId,
    clubName,
    format,
    caption,
    text,
    comments: Comments,
    likes: Likes,
  },
}) {
  const [heart, setheart] = useState(false);
  const [likes, setLikes] = useState(Likes);
  const [like,setLike] = useState(false)
  const postId = _id;

  const [comments, setComments] = useState(Comments);

  const [comment, setComment] = useState("");

  const user=useSelector((state)=>state.user.value)

  async function commentHandler() {
    const response = await fetch(
      "http://10.11.6.27:3000/api/v1/posts/comments",
      {
        method: "POST",

        body: JSON.stringify({
          postId,
          comment,
        }),

        headers:{
          Authorization:
          `bearer ${user.token}`,
        "Content-type": "application/json",
        }
      }
    );
    const res = await response.json();
    if(response.ok){
      console.log(res.data.user)
      setComments(prevComment => [...prevComment,res.data.user])
    }
    console.log(res)
  }

  const [showComments, setShowComments] = useState(false);
  // console.log(clubs.club)

  function handler() {
    setheart((heart) => !heart);
    console.log(heart);
    if (!heart) {
      setLikes((count) => count + 1);
      
    } else {
      setLikes((count) => count - 1);
    }
  }
  return (
    <div className={style["instagram-post"]}>
      <div className={style["post-header"]}>
        {/* <img className={style["profile-picture"]} src="./src/assets/images.png" alt="Profile" /> */}
      </div>
      {format==='image' ? <img className={style["post-image"]} src={image} /> : <p className={style.textPost}>{text}</p>}

      <img src="./src/assets/NSSlogo.jpg" className={style.icon} height={30} />

      <p className={style.clubName}>{`${clubName} Club`}</p>

      <LargeMessage
        className={style["post-caption"]}
        message={caption}
        maxCharCount={100}
      />

      <div className={style["post-actions"]}>
        <span className={style["heart"]} onClick={handler}>
          {heart ? (
            <img src="./src/assets/heart.png" height={28} />
          ) : (
            <img src="./src/assets/colorlessHeart.png" height={30} />
          )}
        </span>

        <span className={style["action-icon"]}>
          <img
            className={showComments && (format==='image' ? style.active : style.textactive) }
            src="./src/assets/comment.png"
            height={30}
            onClick={() => setShowComments((show) => !show)}
          />

          <div className={showComments && (format==='image' ? style.comment : style.textcomment)}>
            {showComments && <p className={style.commentsTitle}>Comments</p>}
            {showComments && comments.map((msg) => <Messages msg={msg} />)}
          </div>
        </span>
      </div>

      <div className={style["likes-count"]}>{likes} likes</div>
      <div className={style.commentSection}>
        <input
          className={style["comment-section"]}
          type="text"
          placeholder="comments..."
          onChange={(e) => setComment(e.target.value)}
        />
        <button className={style.commentButton} onClick={()=>commentHandler()}>post</button>
      </div>
    </div>
  );
}
