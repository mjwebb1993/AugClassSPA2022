import html from "html-literal";

export default (state) => html`
  <footer>
    &copy; 2020 <a href="https://savvycoders.com/">Savvy Coders</a>
    <div class="api-status">API Status: ${state.apiStatus.message}</div>
  </footer>

`;
