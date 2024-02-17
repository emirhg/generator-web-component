const template = require("./html-template.pug");
class <%= props.class %> extends HTMLElement {

  constructor(){
    super();
  }
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
  }

  static get is() {
    return '<%= props.name %>';
  }

  connectedCallback() {
    // Create a shadow root
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = template;
  }

  disconnectedCallback() {
    console.log("Custom square element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom square element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("Custom square element attributes changed.");
    updateStyle(this);
  }
}

customElements.define(<%= props.class %>.is, <%= props.class %>);
