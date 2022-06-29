function createElement(tag, attributes, html) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((attribute) => {
    element.setAttribute(attribute, attributes[attribute]);
  });
  if (html != null) {
    element.innerHTML = html;
  }
  return element;
}

export default createElement;
