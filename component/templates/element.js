class <%= props.class %> extends <% if (props.framework === 'polymer' ) { %>Polymer.Element<% } else { %>HTMLElement<% } %> {

  constructor(){
    super();
  }
  // Specify observed attributes so that
  // attributeChangedCallback will work
  static get observedAttributes() {
    /*
     *return ["color", "size"];
     */
  }

  static get is() {
    return '<%= props.name %>';
  }

  connectedCallback(){
    // Create some CSS to apply to the shadow dom
/*
 *    const style = document.createElement("link");
 *    console.log(style.isConnected);
 *    style.setAttribute("rel", "stylesheet");
 *    style.setAttribute("href", "style.css");
 *
 *    // Create a shadow root
 *    const shadow = this.attachShadow({ mode: "open" });
 *
 *    // Create spans
 *    // Take attribute content and put it inside the info span
 *    const text = this.getAttribute("data-text");
 *
 *    // Insert icon
 *    let imgUrl;
 *    if (this.hasAttribute("img")) {
 *      imgUrl = this.getAttribute("img");
 *    } else {
 *      imgUrl = "img/default.png";
 *    }
 *
 *    const innerHTML = `<span class="wrapper"><span class="icon" tabindex="0"><img src="${imgUrl}"></span><span class="info">${text}</span></span>`
 *
 *    const template = document.createElement("template");
 *    template.innerHTML = innerHTML;
 *
 *    const wrapper = template.content.cloneNode(true);
 *
 *    const img = document.createElement("img");
 *    img.src = imgUrl;
 *
 *    // Attach the created elements to the shadow dom
 *    shadow.appendChild(style);
 *    console.log(style.isConnected);
 *    shadow.appendChild(wrapper);
 */
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
