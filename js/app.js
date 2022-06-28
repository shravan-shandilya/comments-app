import { getComments } from "../api/api.js";

import Container from "./components/container.js";

(async () => {
  const comments = await getComments();
  console.log(comments);

  const app = document.getElementById("app");
  Container.render(app, { comments });
})();
