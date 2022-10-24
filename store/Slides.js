import * as slideImgs from '../assets/img/slides';

export default {
  header: "Slides",
  view: "Slides",
  slides: Object.values(slideImgs),
  currentSlide: "",
  index: 0, // Start from the first slide
  transition: 3000 // Wait 3 seconds
};
