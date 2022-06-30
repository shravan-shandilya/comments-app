import Comment from "./comment";

function CommentList({ comments }) {
  let commentsList = comments.map((comment) => (
    <Comment comment={comment} key={comment.id} />
  ));
  return <div className="comment-list">{commentsList}</div>;
}

export default CommentList;
