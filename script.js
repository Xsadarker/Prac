
const bird = document.getElementById("bird");
const gameContainer = document.getElementById("gameContainer");
const scoreEl = document.getElementById("score");

let birdY = 200;
let gravity = 1.5;
let velocity = 0;
let isGameOver = false;
let score = 0;

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function jump(e) {
  if (e.code === "Space" || e.type === "click") {
    velocity = -10;
    if (isGameOver) location.reload();
  }
}

function createPipe() {
  const gap = 150;
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");
  const pipeHeight = Math.floor(Math.random() * 200) + 50;

  pipeTop.classList.add("pipe");
  pipeBottom.classList.add("pipe");

  pipeTop.style.height = `${pipeHeight}px`;
  pipeTop.style.top = "0px";
  pipeBottom.style.height = `${window.innerHeight - pipeHeight - gap}px`;
  pipeBottom.style.bottom = "0px";

  let pipeX = window.innerWidth;

  pipeTop.style.left = `${pipeX}px`;
  pipeBottom.style.left = `${pipeX}px`;

  gameContainer.appendChild(pipeTop);
  gameContainer.appendChild(pipeBottom);

  function movePipe() {
    if (isGameOver) return;

    pipeX -= 3;
    pipeTop.style.left = `${pipeX}px`;
    pipeBottom.style.left = `${pipeX}px`;

    if (
      pipeX < 140 &&
      pipeX + 60 > 100 &&
      (birdY < pipeHeight || birdY + 40 > pipeHeight + gap)
    ) {
      gameOver();
    }

    if (pipeX + 60 === 100) {
      score++;
      scoreEl.textContent = score;
    }

    if (pipeX + 60 > 0) {
      requestAnimationFrame(movePipe);
    } else {
      pipeTop.remove();
      pipeBottom.remove();
    }
  }

  movePipe();
}

function gameOver() {
  isGameOver = true;
  alert("Game Over! Score: " + score);
}

function update() {
  if (isGameOver) return;

  velocity += gravity;
  birdY += velocity;
  bird.style.top = `${birdY}px`;

  if (birdY + 40 > window.innerHeight || birdY < 0) {
    gameOver();
  }

  requestAnimationFrame(update);
}

setInterval(createPipe, 2000);
update();
