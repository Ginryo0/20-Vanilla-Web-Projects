const video = document.getElementById('video');
const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Function to toggle video play/paus

function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Updating Btns
function updatePlayIcon() {
  if (video.paused) {
    playBtn.innerHTML = '<i class="fa fa-play fa-2x">';
  } else {
    playBtn.innerHTML = '<i class="fa fa-pause fa-2x">';
  }
}

// function timestamp 0 padding
function timePadding(t) {
  if (t.length < 2) {
    return `0${t}`;
  }
  return t;
}

// Updating progress & timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  // Calculating mins and secs
  let mins = String(Math.floor(video.currentTime / 60));
  mins = timePadding(mins);
  let secs = String(Math.floor(video.currentTime % 60));
  secs = timePadding(secs);

  timestamp.textContent = `${mins}:${secs}`;
}

// Setting timestamp to progress
function setVideoProgress() {
  video.currentTime = (progress.value * video.duration) / 100;
}

// Stopping Video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

// Event Listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);
