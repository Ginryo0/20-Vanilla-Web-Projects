const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const holdT = totalTime / 5;
const breatheT = holdT * 2;

function breatheAnimation() {
  text.textContent = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {
    text.textContent = 'Hold!';

    setTimeout(() => {
      text.textContent = 'Breathe Out!';
      container.className = 'container shrink';
    }, holdT);
  }, breatheT);
}

breatheAnimation();
setInterval(breatheAnimation, totalTime);
