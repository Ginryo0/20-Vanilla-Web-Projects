const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

// Search by song or artist
async function searchSongs(term) {
  // fetch(`${apiURL}/suggest/${term}`)
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  console.log(data);
  showData(data);
}

// Show song and artist in DOM
function showData(data) {
  // let output = '';

  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class='btn' data-artist=${song.artist.name} data-songtitle=${song.title}>Get Lyrics</button>
  //   </li>
  //   `;
  // });

  // result.innerHTML = `
  // <ul class='songs'>
  //   ${output}
  // </ul>

  // `;

  // Reminder -> map -> one expression = no return or braces
  result.innerHTML = ` 
    <ul class='songs'>
    ${data.data
      .map(
        (song) =>
          `
      <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class='btn' data-artist='${song.artist.name}' data-songtitle='${song.title}'>Get Lyrics</button>
      </li>  
    `
      )
      .join('')}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
    ${
      data.prev
        ? `<button class='btn' onclick='getMoreSongs("${data.prev}")'>Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class='btn' onclick='getMoreSongs("${data.next}")'>Next</button>`
        : ''
    }
    `;
  } else {
    more.innerHTML = '';
  }
}

// Get prev and next song pages
async function getMoreSongs(url) {
  // you have to use proxy to bypass cors by sending headers
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

  // FAILED
  // const res = await fetch(url, {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  // });
  const data = await res.json();

  console.log(data);
  showData(data);
}

// Event listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert('Please type in a search term');
  } else {
    searchSongs(searchTerm);
  }
});

// Get lyrics for song
async function getLyrics(artist, songTitle) {
  console.log(songTitle);
  const url = new URL(`${apiURL}/v1/${artist}/${songTitle}`);

  const res = await fetch(url);
  const data = await res.json();

  // bypass errors
  if (data.error) {
    result.innerHTML = data.error;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;
  }

  more.innerHTML = '';
}

// Get lyrics button click
result.addEventListener('click', (e) => {
  const clickedEL = e.target;

  //  you have to check tag name
  if (clickedEL.tagName === 'BUTTON') {
    const artist = clickedEL.dataset['artist'];
    const song = clickedEL.dataset.songtitle;

    // const artist = clickedEl.getAttribute('data-artist');
    // const songTitle = clickedEl.getAttribute('data-songtitle');

    console.log(song);

    getLyrics(artist, song);
  }
});
