import createElement from "../element.js";
import Component from "./component.js";
import { postComment } from "../api/api.js";

// Template:
// <div class="comment-input">
//    <img class="comment-input-profile-picture"></img>
//    <input class="comment-input-input" placeholder="what are your thoughts?"></input>
//    <button class="comment-input-button">Comment</button>
// </div>

class CommentInput extends Component {
  render(data) {
    const profileImage = createElement("img", {
      class: "comment-input-profile-picture",
      src: data.author.display_picture,
    });

    const input = createElement("input", {
      class: "comment-input-input",
      type: "text",
      placeholder: "What are your thoughts?",
    });

    const button = createElement(
      "button",
      { class: "comment-input-button" },
      "Comment"
    );

    button.addEventListener("click", async () => {
      try {
        let res = await postComment(data.author.id, input.value, -1);
        input.value = "";
        this.element.dispatchEvent(
          new CustomEvent("comment:added", {
            display_picture: profileImage,
            content: input.value,
          })
        );
      } catch (err) {
        console.error(err);
      }
    });

    this.element.appendChild(profileImage);
    this.element.appendChild(input);
    this.element.appendChild(button);
  }
}

export default CommentInput;
