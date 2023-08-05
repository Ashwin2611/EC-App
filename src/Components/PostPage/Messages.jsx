import style from "./Messages.module.css";
export default function Messages({ msg }) {
  console.log(msg.comment);
  return (
    <div className={style.container}>
      <img
        className={style.profile}
        src="./src/assets/PngItem_1503945.png"
        height={30}
      />
      <div className={style.userComment}>
        <p className={style.userName}>{msg.userName}</p>
        <p className={style.message}>{msg.comment}</p>
      </div>

      {/* <h3>hello</h3> */}
    </div>
  );
}
