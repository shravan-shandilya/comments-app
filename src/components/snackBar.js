import createElement from "../element.js";
import Component from "./component.js";

// Template:
// <div class="snackbar-{show}">
//  <div class="snackbar-{success}"></div>
// </div>

class SnackBar extends Component {
  render(data) {
    if (data.show) {
      this.element.className = "snackbar-shown";
      const snackbarElement = createElement(
        "div",
        {
          class: data.success ? "snackbar-success" : "snackbar-failure",
        },
        data.message
      );
      this.element.appendChild(snackbarElement);
    } else {
      this.element.className = "snackbar-hidden";
    }

    if (data.show) {
      setTimeout(() => {
        this.element.redraw({ show: false, success: false, message: "" });
      }, 2000);
    }
  }
}

export default SnackBar;
