import createElement from "./element.js";
import { postComment } from "../../api/api.js";
import SnackBar from "./snackbar.js";
const COMPONENT = "CommentInput";

// Template:
// <div class="comment-input">
//    <img class="comment-input-profile-picture" src=".."/>
//    <input class="comment-input-input" />
//    <button class="comment-input-button" />
// </div>

async function render(root, data, rerender) {
  console.log(`[Render] (${COMPONENT}) data`, data);
  const commentInput = createElement("div", { class: "comment-input" });

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
    console.log("posting comment");
    try {
      await postComment(data.author.id, input.value, -1);
      SnackBar.render(root, {
        success: true,
        text: "Your comment has been added",
      });
      input.value = "";
    } catch (err) {
      SnackBar.render(root, {
        success: false,
        text: "Failed to add your comment",
      });
    }
  });

  commentInput.appendChild(profileImage);
  commentInput.appendChild(input);
  commentInput.appendChild(button);

  return root.appendChild(commentInput);
}

export default { render };
