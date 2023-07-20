<% if (props.type === 'standalone' && props.framework === 'polymer') { %><link rel="import" href="../polymer/polymer-element.html">
<% } %><% if (props.includeTemplate) { %>
<%= props.class %>Template = document.createElement("template");

<%= props.class %>Template.innerHTML = `
<dom-module id="<%= props.name %>">
  <template>
    <style>

    </style>

  </template>
</dom-module>
`
<% } %>
class <%= props.class %> extends <% if (props.framework === 'polymer' ) { %>Polymer.Element<% } else { %>HTMLElement<% } %> {
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
