// SELECTION OF DOM
const container = document.querySelector(".container");
// select all seats in the row that donot have occupied class and put in an array
const seats = document.querySelectorAll(".row .seat:not(.occupied");
// get the spans
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
// getthe movie price and convert to int
const ticketPrice = +movieSelect.value;

// EVENT LISTENER
container.addEventListener("click", e => {
  if (
    //   if the list of class has seat
    e.target.classList.contains("seat") &&
    // and not occupied
    !e.target.classList.contains("occupied")
  ) {
    //   toggle the css class selected [other options are add remove]
    e.target.classList.toggle("selected");
  }
});
