import createElement from "./element.js";
import Comment from "./comment.js";
const COMPONENT = "CommentList";

// Template:
// <div class="comment-list">
//   <Comment />
//   <Comment />
//   ...
//   <Comment />
// </div>

function render(root, data) {
  console.log(`[Render] (${COMPONENT}) data`, data);
  const commentList = createElement("div", { class: "comment-list" });

  if (data.comments != null && data.comments.length > 0) {
    data.comments.forEach((comment) => {
      Comment.render(commentList, comment);
    });
  } else {
    const noCommentsYet = createElement(
      "h2",
      { class: "no-comments-yet" },
      "No comments yet"
    );

    commentList.appendChild(noCommentsYet);
  }

  return root.appendChild(commentList);
}

export default { render };
