import createElement from "./element.js";

function render(root, data) {
  const snackbarContainer = createElement("div", {
    class: "snackbar-container",
  });
  const snackbar = createElement(
    "div",
    { class: data.success ? "snackbar-success" : "snackbar-failure" },
    data.text
  );
  snackbarContainer.appendChild(snackbar);

  setTimeout(() => {
    snackbarContainer.className = "snackbar-none";
  }, 3000 || data.delay);

  return root.appendChild(snackbarContainer);
}

export default { render };
