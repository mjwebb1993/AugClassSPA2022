import html from "html-literal";

export default st => html`
  <h2>Here are your directions</h2>
  <ul class="directions">
    <li>${st.directions.first}</li>
    ${st.directions.maneuvers.map(leg => `<li>${leg.narrative}</li>`)}
  </ul>
`;
