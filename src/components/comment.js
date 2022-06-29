import createElement from "../element.js";
import Component from "./component.js";
import { computeTimeAgo } from "../utils.js";

// Template:
// <div class="comment">
//   <img class="comment-profile-picture">
//   <div class="comment-body">
//      <div class="comment-name">
//         {{data.fname}}
//         <span>· 45 mins ago</span>
//      </div>
//      <div class="comment-body-text">
//          {{data.content}}
//      </div>
//      <div class="comment-actions">
//          <button class="comment-actions-button">▲ Upvote</button>
//          <button class="comment-actions-button">Reply</button>
//      </div>
// </div>

class Comment extends Component {
  render(data) {
    const profileImage = createElement("img", {
      class: "comment-profile-picture",
      src: data.author.display_picture,
    });

    const commentBody = createElement("div", { class: "comment-body" });

    const commentName = createElement(
      "div",
      { class: "comment-name" },
      `${data.author.fname} ${
        data.author.sname
      } <span class="comment-time">· ${computeTimeAgo(data.created_at)}</span>`
    );

    const commentBodyText = createElement(
      "div",
      {
        class: "comment-body-text",
      },
      data.content
    );

    const commentActions = createElement("div", { class: "comment-actions" });
    const upvoteButton = createElement(
      "button",
      {
        class: "comment-actions-button",
      },
      "▲ Upvote"
    );
    const replyButton = createElement(
      "button",
      {
        class: "comment-actions-button",
      },
      "Reply"
    );

    commentActions.appendChild(upvoteButton);
    commentActions.appendChild(replyButton);

    commentBody.appendChild(commentName);
    commentBody.appendChild(commentBodyText);
    commentBody.appendChild(commentActions);

    this.element.appendChild(profileImage);
    this.element.appendChild(commentBody);
  }
}

export default Comment;
