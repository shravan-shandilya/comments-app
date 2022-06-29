import createElement from "../element.js";

class Component {
  constructor(name, attributes, data) {
    this.attributes = attributes;
    this.data = data;
    this.element = createElement("div", attributes);
    this.render(data);

    this.element.name = name;
    this.element.redraw = this.redraw.bind(this);

    return this.element;
  }

  redraw(data) {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }
    this.data = data;
    this.render(data);
  }
}

export default Component;
