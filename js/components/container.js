import createElement from "./element.js";
import CommentInput from "./commentInput.js";
import CommentList from "./commentList.js";
const COMPONENT = "Container";

// Template:
// <div class="container">
//   <h2 class="title">Discussion</h2>
//   <CommentInput />
//   <div class="divider"></div>
//   <CommentList />
// </div>

function render(root, data) {
  console.log(`[Render] (${COMPONENT}) data`, data);
  const container = createElement("div", { class: "container" });

  const title = createElement(
    "h2",
    {
      class: "title",
    },
    "Discussion"
  );
  container.appendChild(title);

  let commentInputObservable = CommentInput.render(container, {
    author: {
      id: 1,
      display_picture:
        "https://res.cloudinary.com/liveweb/image/upload/ghost/1.jpg",
    },
    placeholder: "What are your thoughts?",
  });

  const divider = createElement("hr", { class: "divider" });
  container.appendChild(divider);

  CommentList.render(container, {
    comments: data.comments,
  });

  return root.appendChild(container);
}

export default { render };
