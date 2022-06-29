import Container from "./components/container.js";

const container = new Container("Container", { class: "container" }, {});

const app = document.getElementById("app");
app.appendChild(container);
