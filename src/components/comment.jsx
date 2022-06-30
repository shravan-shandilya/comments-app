import { useState, useEffect } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";
import { getComment } from "../api";
import { computeTimeAgo } from "../utils";
import { decode } from "he";

function Comment({ comment }) {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState(comment.replies);

  return (
    <div className="comment">
      <img
        className="comment-profile-picture"
        src={comment.author.display_picture}
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
        <div className="comment-actions">
          <button className="comment-actions-button">▲ Upvote</button>
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
                let latestComment = await getComment(comment.id);
                setReplies(latestComment.replies);
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
