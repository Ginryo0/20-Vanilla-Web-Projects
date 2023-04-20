const trackContainer = document.getElementById('track-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const prgoress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Tracks titles
const tracks = ['اواخر البقرة', 'اواخر الحشر', 'النساء', 'مريم', 'اية الكرسي'];

// Keep tracking tracks
let trackIdx = 3;

// Initially load track details into DOM
loadTrack(tracks[trackIdx]);

function loadTrack(track) {
  title.textContent = track;
  audio.src = `audio/${track}.mp3`;
  cover.src = `imgs/${track}.jpg`;
}

//Play Track
function playTrack() {
  // show progress and title
  trackContainer.classList.add('play');

  // Convert play to pause
  playBtn.querySelector('i.fas').className = 'fas fa-pause';

  // Play track
  audio.play();
}

// Pause Track
function pauseTrack() {
  // hide progress and title
  trackContainer.classList.remove('play');

  // Convert pause to play
  playBtn.querySelector('i.fas').className = 'fas fa-play';

  // Pause track
  audio.pause();
}

// Previous Track
function prevTrack() {
  trackIdx--;

  if (trackIdx < 0) {
    trackIdx = tracks.length - 1;
  }

  loadTrack(tracks[trackIdx]);

  playTrack();
}

// Next Track
function nextTrack() {
  trackIdx++;

  if (trackIdx > tracks.length - 1) {
    trackIdx = 0;
  }

  loadTrack(tracks[trackIdx]);

  playTrack();
}

// Update progress bar
function updateProgress(e) {
  // e. target would work here too

  // destructuring
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setPrgoress(e) {
  // container width
  const width = this.clientWidth;
  // offset in container
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}
// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = trackContainer.classList.contains('play');
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// Change song
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// Updating progress by time
audio.addEventListener('timeupdate', updateProgress);

// Click on prgoress bar (container)
progressContainer.addEventListener('click', setPrgoress);

// Track ends
audio.addEventListener('ended', nextTrack);
