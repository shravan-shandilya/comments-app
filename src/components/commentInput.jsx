import { postComment } from "../api";
import { useState, useContext } from "react";
import { AuthorContext } from "../App";

function CommentInput({ parent, onUpdate }) {
  const author = useContext(AuthorContext);
  const [comment, setComment] = useState("");

  async function handleCommentButtonClick(event) {
    await postComment(author.id, comment, parent);
    setComment("");
    onUpdate();
  }

  return (
    <div className="comment-input">
      <img
        className="comment-input-profile-picture"
        src={author.display_picture}
        alt="author's profile"
      ></img>
      <input
        className="comment-input-input"
        placeholder="What are your thoughts?"
        onChange={(event) => setComment(event.target.value)}
        value={comment || ""}
      ></input>
      <button
        className="comment-input-button"
        onClick={handleCommentButtonClick}
      >
        Comment
      </button>
    </div>
  );
}

export default CommentInput;
