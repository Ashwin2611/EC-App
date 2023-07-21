import React, { useState } from 'react';
import style from "./LargeMessage.module.css"
const LargeMessage = ({ message, maxCharCount }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  // Function to toggle the showFullMessage state
  const toggleShowFullMessage = () => {
    setShowFullMessage(!showFullMessage);
  };

  return (
    <div className={style["post-caption"]}>
      {/* Render the message based on the showFullMessage state */}
      {showFullMessage ? message : message.slice(0, maxCharCount)}

      {/* Conditionally render the "See more" button */}
      {message.length > maxCharCount && (
        <button className={style.seemore} onClick={toggleShowFullMessage}>
          {showFullMessage ? 'less...' : 'more...'}
        </button>
      )}
    </div>
  );
};

export default LargeMessage;
