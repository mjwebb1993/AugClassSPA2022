import html from "html-literal";

export default (state) => {
  return html`
    <div class="slide">
      <img id="slideImage" src="${state.currentSlide}">
    </div>
  `;
};
