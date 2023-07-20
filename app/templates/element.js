<% if (props.type === 'standalone' && props.framework === 'polymer') { %><link rel="import" href="../polymer/polymer-element.html">
<% } %><% if (props.includeTemplate) { %>
<%= props.class %>Template = document.createElement("template");
stylesheet = document.createElement("link");

stylesheet.setAttribute("ref", "stylesheet");  
stylesheet.setAttribute("href", "<%=props.name%>.css")
<%= props.class %>Template.innerHTML = `
<template id="<%= props.name %>">
</template>
`
<% } %>
class <%= props.class %> extends <% if (props.framework === 'polymer' ) { %>Polymer.Element<% } else { %>HTMLElement<% } %> {
  constructor() {
    super();
  }

  connectedCallback(){
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    shadowRoot.appendChild(<%=props.class%>Template.content);
    shadowRoot.appendChild(stylesheet);
  }
  static get is() {
    return '<%= props.name %>';
  }
  <% if (props.framework === 'polymer' ) { %>
  static get properties() {
    return {

    };
  }<% } %>
}

customElements.define(<%= props.class %>.is, <%= props.class %>);
