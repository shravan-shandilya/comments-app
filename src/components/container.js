import createElement from "../element.js";
import Component from "./component.js";
import CommentInput from "./commentInput.js";
import CommentList from "./commentList.js";
import SnackBar from "./snackBar.js";

import { getComments } from "../api/api.js";

// Template:
// <div class="container">
//   <h2 class="title">Discussion</h2>
//   <CommentInput />
//   <div class="divider"></div>
//   <CommentList />
// </div>

class Container extends Component {
  async render(data) {
    const comments = await getComments();

    const title = createElement("h2", { class: "title" }, "Discussion");

    let randomUser = Math.floor(Math.random() * 10 + 1);
    const commentInput = new CommentInput(
      "CommentInput",
      { class: "comment-input" },
      {
        author: {
          id: randomUser,
          display_picture: `https://res.cloudinary.com/liveweb/image/upload/ghost/${randomUser}.jpg`,
        },
      }
    );

    commentInput.addEventListener(
      "comment:added",
      this.onCommentAdded.bind(this)
    );

    const divider = createElement("hr", { class: "divider" });

    const commentList = new CommentList(
      "CommentList",
      { class: "comment-list" },
      { comments }
    );

    const snackBar = new SnackBar(
      "SnackBar",
      {},
      { hide: true, status: null, message: null }
    );

    this.element.appendChild(title);
    this.title = title;

    this.element.appendChild(commentInput);
    this.commentInput = commentInput;

    this.element.appendChild(divider);
    this.divider = divider;

    this.element.appendChild(commentList);
    this.commentList = commentList;

    this.element.appendChild(snackBar);
    this.snackBar = snackBar;
  }

  async onCommentAdded(event) {
    let randomUser = Math.floor(Math.random() * 10 + 1);
    this.commentInput.redraw({
      author: {
        id: randomUser,
        display_picture: `https://res.cloudinary.com/liveweb/image/upload/ghost/${randomUser}.jpg`,
      },
    });
    this.commentList.redraw({ comments: await getComments() });
    this.snackBar.redraw({
      show: true,
      success: true,
      message: "Your comment has been added",
    });
  }
}

export default Container;
