import { postComment } from "../api";
import { useState, useContext } from "react";
import { AuthorContext } from "../App";
import { toast } from "react-toastify";

function CommentInput({ parent, onUpdate }) {
  const author = useContext(AuthorContext);
  const [comment, setComment] = useState("");

  async function handleCommentButtonClick(event) {
    event.preventDefault()
    await postComment(author.id, comment, parent);
    setComment("");
    if (onUpdate) onUpdate();
    toast.success("Your comment was added");
  }

  return (
    <div className="comment-input">
      <img
        className="comment-input-profile-picture"
        src={author.display_picture}
        alt="author's profile"
      ></img>
      <form class="comment-input-form">
        <input
          className="comment-input-input"
          placeholder="What are your thoughts?"
          onChange={(event) => setComment(event.target.value)}
          value={comment || ""}
        ></input>
        <input
          type="submit"
          className="comment-input-button"
          onClick={handleCommentButtonClick}
          value="Comment"
        ></input>
      </form>
    </div>
  );
}

export default CommentInput;
