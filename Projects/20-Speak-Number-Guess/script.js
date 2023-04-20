const msgEl = document.getElementById('msg');

const randN = getRandomNumber();

console.log('Number', randN);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

let recognition = new window.SpeechRecognition();

// Starting voice recognition
recognition.start();

// Capture user speak
function onSpeak(e){
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
  // console.log(msg);
}


// Write What user speaks
function writeMessage(msg){
  msgEl.innerHTML = ` 
    <div>You said: </div>
    <span class='box'>${msg}</span>
  `
}

// Check msg against number
function checkNumber(msg){
  const num = +msg;

  // Check used spoke a number
  if (Number.isNaN(num)){
    msgEl.innerHTML += '<div>This is not a valid number.</div>'
    return;
  }

  // Check number range
  if (num < 1 || num > 100){
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
    return;
  }

  // Check number
  if (num === randN){
    document.body.innerHTML = `
    <h2>Congrats! You have guessed the number <br><br>
    It was ${num}</h2>
    <button class="play-again" id="play-again">Play Again</button>
    `
  } else if (num > randN) {
    msgEl.innerHTML += `<div>Go Lower</div>`
  } else {
    msgEl.innerHTML += `<div>Go Higher</div>`
  }
}

// Generate random number
function getRandomNumber(){
  // 1 - 100
  return Math.floor(Math.random() * 100) + 1;
}

// Speak result
recognition.addEventListener('result', onSpeak)

// End SR service -> start it again
recognition.addEventListener('end', () => {
  // console.log('End');
  recognition.start();
})

// reload page to play again
document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-again'){
    window.location.reload();
  }
})