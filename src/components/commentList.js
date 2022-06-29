import createElement from "../element.js";
import Component from "./component.js";
import Comment from "./comment.js";

// Template:
// <div class="comment-list">
//   <Comment />
//   <Comment />
//   ...
//   <Comment />
// </div>

class CommentList extends Component {
  render(data) {
    if (data.comments != null && data.comments.length > 0) {
      data.comments.forEach((comment) => {
        this.element.appendChild(
          new Comment("Comment", { class: "comment" }, comment)
        );
      });
    } else {
      const noCommentsYet = createElement(
        "h2",
        { class: "no-comments-yet" },
        "No comments yet"
      );
      this.element.appendChild(noCommentsYet);
    }
  }
}

export default CommentList;
