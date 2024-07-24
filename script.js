let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highScore = 0;
let box = ["one", "two", "three", "four"];

let h2 = document.querySelector("h2");
document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;
    console.log("Game Started");
    setTimeout(levelUp, 100);
  }
});

// Flash button and level up
function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 100);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 100);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  // random box
  let randIdx = Math.floor(Math.random() * box.length);
  let color = box[randIdx];
  let randBox = document.querySelector(`.${color}`);
  gameSeq.push(color);
  console.log("Hints");
  console.log(gameSeq);
  gameFlash(randBox);
}

// Button event listener
function btnPress() {
  let btn = this;
  userFlash(btn);
  let userBtn = btn.getAttribute("id");
  userSeq.push(userBtn);
  checkAns(userSeq.length - 1);
}

let btnAll = document.querySelectorAll(".box");
for (btn of btnAll) {
  btn.addEventListener("click", btnPress);
}

// Matching sequence
function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      levelUp();
    }
  } else {
    h2.innerText = `Game Over! Your score was ${level}.\nPress any key to start.`;
    let span = document.querySelector("span");

    if (level > span.innerText) {
      span.innerText = level;
    }
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

// Reset game
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
