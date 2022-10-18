import html from "html-literal";

export default st => html`
  <h2>Input the Starting Location and The Desired Destination!</h2>
  <form id="direction" method="POST" action="">
    <div id="fromLocation">
      <h3>Starting Location</h3>
      <div>
        <label for="fromStreet">Street: </label>
        <input
          type="text"
          name="fromStreet"
          id="fromStreet"
          placeholder="Enter Street Address"
          required
        />
        <label for="fromCity">City: </label>
        <input
          type="text"
          name="fromCity"
          id="fromCity"
          placeholder="Enter City"
          required
        />
        <label for="fromState">State: </label>
        <input
          type="text"
          name="fromState"
          id="fromState"
          placeholder="Enter State Initials"
          required
        />
      </div>
    </div>
    <div id="toLocation">
      <h3>Final Location</h3>
      <div>
        <label for="toStreet">Street: </label>
        <input
          type="text"
          name="toStreet"
          id="toStreet"
          placeholder="Enter Street Address"
          required
        />
        <label for="toCity">City: </label>
        <input
          type="text"
          name="toCity"
          id="toCity"
          placeholder="Enter City"
          required
        />
        <label for="toState">State: </label>
        <input
          type="text"
          name="toState"
          id="toState"
          placeholder="Enter State Initials"
          required
        />
      </div>
    </div>
    <input type="submit" name="submitDirection" value="Submit Destination" />
  </form>

  <h2>Here are your directions</h2>
  <div class="directions">
    <ul class="directions">
      ${checkDirection(st.directions.maneuvers)}
    </ul>
  </div>
`;

function checkDirection(maneuvers) {
  if (maneuvers) {
    return maneuvers.map(leg => `<li>${leg.narrative}</li>`);
  } else {
    return `Please Submit Addresses Above!`;
  }
}

// function mapDirection(legs, state) {
//   if (checkDirection(state.directions.maneuvers)) {
//     return `<li>${state.directions.first}</li> ${legs.map(
//       leg => `<li>${leg.narrative}</li>`
//     )}`;
//   }
// }
