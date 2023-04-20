const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); // selecting seats on row + not occupied
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Initial updating UI + setting count and total
populateUI();
let ticketPrice = +movieSelect.value; // parse string into a number
updateSelectedCount();

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Copy selected seats into arr - instead of node list
  // map through array -> return new array after doing something on each item
  // the mapped array -> contains indices of each seat in seats node list

  const seatsIndices = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndices));
  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// Movie select event
movieSelect.addEventListener('change', (e) => {
  // select - change event
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', (e) => {
  // console.log(e.target); - clicked el
  // console.log(e.currentTarget); - container always
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});
