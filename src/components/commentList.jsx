import Comment from "./comment";

function CommentList({ comments }) {
  let commentsList = comments.map((comment) => (
    <Comment
      comment={comment}
      key={comment.id}
      replies={comment.replies}
      upvotes={comment.upvotes}
      downvotes={comment.downvotes}
    />
  ));
  return <div className="comment-list">{commentsList}</div>;
}

export default CommentList;
