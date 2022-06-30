import { useState, useContext } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";
import { computeTimeAgo } from "../utils";
import { decode } from "he";
import { AuthorContext } from "../App";
import { postVote } from "../api";
import { toast } from "react-toastify";

function Comment({ comment, replies, upvotes, downvotes }) {
  const author = useContext(AuthorContext);
  const [showReply, setShowReply] = useState(false);

  const vote = async (type) => {
    await postVote(author.id, comment.id, type);
  };

  return (
    <div className="comment">
      <img
        className="comment-profile-picture"
        src={comment.author.display_picture}
        alt="author's profile"
      ></img>
      <div className="comment-body">
        <div className="comment-name">
          {comment.author.fname} {comment.author.sname}
          <span className="comment-time">
            {" "}
            · {computeTimeAgo(comment.created_at)}
          </span>
        </div>
        <div className="comment-body-text">{decode(comment.content)}</div>
        <div className="comment-votes-actions">
          <button
            className="comment-actions-button"
            onClick={async () => {
              await vote("upvote");
              toast.success("You upvoted the comment");
            }}
          >
            ▲ {upvotes}
          </button>
          <button
            className="comment-actions-button"
            onClick={async () => {
              await vote("downvote");
              toast.success("You downvoted the comment");
            }}
          >
            ▼ {downvotes}
          </button>
          {comment.parent === -1 && (
            <button
              className="comment-actions-button"
              onClick={() => setShowReply((prev) => !prev)}
            >
              {showReply ? "Close" : "Reply"}
            </button>
          )}
        </div>
        {showReply && (
          <div className="comment-reply-container">
            <CommentInput
              parent={comment.id}
              onUpdate={async () => {
                setShowReply(false);
              }}
            />
          </div>
        )}
        {replies && (
          <div className="reply-list-container">
            <CommentList comments={replies}></CommentList>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
