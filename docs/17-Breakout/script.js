const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const lvls = document.getElementById('lvls');
const btns = lvls.querySelectorAll('button');
const ctx = canvas.getContext('2d');

let score = 0;
let lvl = localStorage.getItem('lvl') ? +localStorage.getItem('lvl') : 0;
let colors = ['#0095dd', '#058a3d', '#dd5100'];
let primaryColor = colors[0];
setLvl();

/* Initiating Values */
// activate lvl button
async function setLvl() {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  });

  btns[lvl].classList.add('active');
  primaryColor = colors[lvl];
  document.body.style.backgroundColor = primaryColor;
}

const brickRowCount = 9;
const brickColumnCount = 5 + lvl;

// Listen to clicks on lvl buttons ->
lvls.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    lvl = +e.target.dataset.lvl;
    localStorage.setItem('lvl', lvl);
    location.reload();
  }
});

// Ball Obj
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 3 + lvl,
  dx: 3 + lvl,
  dy: -3 - lvl,
};

// Paddle Obj
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  dx: 0,
  speed: 7 + lvl,
};

// Brick obj
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// Creating brick array
let bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
// console.log(bricks);

// Drawing ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = primaryColor;
  ctx.fill();
  ctx.closePath();
}

// Drawing Paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = primaryColor;
  ctx.fill();
  ctx.closePath();
}

// Drawing Score
function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw bricks
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? primaryColor : 'transparent';
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle
function movePaddle() {
  paddle.x += paddle.dx;
  // console.log(paddle.x);
  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (x mvmnt)
  if (ball.x + ball.size >= canvas.width || ball.x - ball.size <= 0) {
    ball.dx *= -1;
  }
  // Wall collision (y mvmnt)
  if (ball.y + ball.size >= canvas.height || ball.y - ball.size <= 0) {
    ball.dy *= -1;
  }
  // Paddle collision
  if (
    ball.x - ball.size >= paddle.x &&
    ball.x + ball.size <= paddle.x + paddle.w &&
    ball.y + ball.size >= paddle.y
  ) {
    // ball.dy *= -1;
    // console.log(1);
    ball.dy = -ball.speed;
  }

  // Brick collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size >= brick.x &&
          ball.x + ball.size <= brick.x + brick.w &&
          ball.y - ball.size <= brick.y + brick.h &&
          ball.y + ball.size >= brick.y
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
          // console.log(ball.y);
        }
      }
    });
  });

  // Hit bot wall -> lose
  if (ball.y + 15 >= canvas.height) {
    // should be -> ball.y + ball.size (10) -> 15 because it doesn't catch ball hitting frame on lvl 3
    // console.log('lost');
    // console.log(ball.y);
    // console.log(canvas.height);

    showAllBricks();
    score = 0;
  }
}

// Increase score + add more when done
function increaseScore() {
  score++;

  if (score % (brickColumnCount * brickColumnCount) === 0) {
    showAllBricks();
  }
}

// Show all bricks
function showAllBricks() {
  bricks.forEach((column) => column.forEach((brick) => (brick.visible = true)));
}
// Draw Everything
function draw() {
  // Clear whole canvas for 0 left top -> to width and height
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas and animation
function update() {
  movePaddle();
  moveBall();
  // Draw all
  draw();

  requestAnimationFrame(update);
}

update();

//Keydown event
function keyDown(e) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

//Keyup event
function keyUp(e) {
  if (
    e.key === 'Right' ||
    e.key === 'ArrowRight' ||
    e.key === 'Left' ||
    e.key === 'ArrowLeft'
  ) {
    paddle.dx = 0;
  }
}

//Keybaord event handler
document.addEventListener('keyup', keyUp);
document.addEventListener('keydown', keyDown);

// Rules Event listeners
rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));
