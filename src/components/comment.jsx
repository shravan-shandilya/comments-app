import { useState, useContext } from "react";
import CommentInput from "./commentInput";
import CommentList from "./commentList";
import { getComment } from "../api";
import { computeTimeAgo } from "../utils";
import { decode } from "he";
import { AuthorContext } from "../App";

import { postVote } from "../api";

function Comment({ comment }) {
  const author = useContext(AuthorContext);
  const [showReply, setShowReply] = useState(false);
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [downvotes, setDownvotes] = useState(comment.downvotes);
  const [replies, setReplies] = useState(comment.replies);

  const vote = async (type) => {
    await postVote(author.id, comment.id, type);
  };

  const updateVotes = async () => {
    let c = await getComment(comment.id);
    setUpvotes(c.upvotes);
    setDownvotes(c.downvotes);
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
          {/* <div className="comment-votes"></div> */}
          <button
            className="comment-actions-button"
            onClick={async () => {
              await vote("upvote");
              await updateVotes();
            }}
          >
            ▲ {upvotes}
          </button>
          <button
            className="comment-actions-button"
            onClick={async () => {
              await vote("downvote");
              await updateVotes();
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
