import createElement from "./element.js";
const COMPONENT = "Comment";

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

function render(root, data) {
  console.log(`[Render] (${COMPONENT}) data`, data);
  const comment = createElement("div", { class: "comment" });

  const profileImage = createElement("img", {
    class: "comment-profile-picture",
    src: data.author.display_picture,
  });
  comment.appendChild(profileImage);

  const commentBody = createElement("div", { class: "comment-body" });

  const commentName = createElement(
    "div",
    { class: "comment-name" },
    `${data.author.fname} ${data.author.sname}`
  );
  commentBody.appendChild(commentName);

  const commentBodyText = createElement(
    "div",
    { class: "comment-body-text" },
    data.content
  );

  commentBody.appendChild(commentBodyText);

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
  commentBody.appendChild(commentActions);

  comment.appendChild(commentBody);
  return root.appendChild(comment);
}

export default { render };
