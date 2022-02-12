const foodEffect = new Audio("food.wav"); //Sound played when food is consumed
const gameOver = new Audio("gameover.wav"); //Sound played when game is over
let dir = { x: 0, y: 0 }; //direction given by user to guide snake
let snake = [{ x: 11, y: 11 }]; //snake body parts initially just head
let food = { x: 16, y: 19 }; //food part to be consumed
let lastPaintTime = 0; //last time screen was painted
let fpsControl = 4; //to control speed of snake
let score = 0;
var a = 5; //range of positions to render food particle
var b = 18;
document.getElementById("4").style;
document.getElementById("4").style.border = "4px solid white";
document.getElementById("4").style.background = "red";
function myfun(i) {
  fpsControl = i;
  document.getElementById("gameover").innerHTML = "";
  document.getElementById(4).style.border = "none";
  document.getElementById(7).style.border = "none";
  document.getElementById(11).style.border = "none";
  document.getElementById(4).style.background = "#f74349";
  document.getElementById(7).style.background = "#f74349";
  document.getElementById(11).style.background = "#f74349";
  document.getElementById(fpsControl).style.border = "4px solid white";
  document.getElementById(fpsControl).style.background = "red";
}

function main(currentTime) {
  //main function calls itself again and again for game continuation
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / fpsControl) {
    //to control frames/speed of snake
    return;
  }
  lastPaintTime = currentTime;
  gameLoop();
}

function isOver(gOver) {
  //function to check game is over
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  if (
    snake[0].x >= 22 ||
    snake[0].x <= 0 ||
    snake[0].y >= 22 ||
    snake[0].y <= 0
  )
    return true;
}

function gameLoop() {
  //main function of snake game development
  if (isOver(snake)) {
    //if game is over play gameover sound and alert on window
    gameOver.play();
    dir = { x: 0, y: 0 };
    document.getElementById("gameover").innerHTML =
      "GAMEOVER" + "<br>" + " YOUR SCORE : " + score;
    scoreboard.innerHTML = "Score: " + "0";
    snake = [{ x: 11, y: 11 }]; //reset game
    score = 0;
  }

  if (snake[0].x === food.x && snake[0].y === food.y) {
    //checks if snake eats food
    foodEffect.play();
    score += 1;
    scoreboard.innerHTML = "Score: " + score;
    snake.unshift({ x: snake[0].x + dir.x, y: snake[0].y + dir.y }); //adding one head part to start
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    }; //randomly adding food part
  }

  for (let i = snake.length - 2; i >= 0; i--) {
    //loop for updating each snake part to it's previous part to give effect of moving snake
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += dir.x; //for snake head to change it's direction
  snake[0].y += dir.y;

  board.innerHTML = "";
  snake.forEach((e, index) => {
    //creating snake parts and rendering it using css
    snakePart = document.createElement("div");
    snakePart.style.gridRowStart = e.y;
    snakePart.style.gridColumnStart = e.x;
    if (index === 0) {
      snakePart.classList.add("head");
    } else {
      snakePart.classList.add("afterHead");
    }
    board.appendChild(snakePart);
  });

  foodPart = document.createElement("div"); //creating food part and rendering it using css
  foodPart.style.gridRowStart = food.y; //giving grid position where food should be rendered
  foodPart.style.gridColumnStart = food.x;
  foodPart.classList.add("food");
  board.appendChild(foodPart);
}

window.requestAnimationFrame(main); //to continue game,requesting animation frame
window.addEventListener("keydown", (e) => {
  //event listener to check which key user is pressing
  dir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      dir.x = 0;
      dir.y = -1;
      document.getElementById("gameover").innerHTML = "";
      break;
    case "ArrowDown":
      dir.x = 0;
      dir.y = 1;
      document.getElementById("gameover").innerHTML = "";
      break;
    case "ArrowLeft":
      dir.x = -1;
      dir.y = 0;
      document.getElementById("gameover").innerHTML = "";
      break;
    case "ArrowRight":
      dir.x = 1;
      dir.y = 0;
      document.getElementById("gameover").innerHTML = "";
      break;
    default:
      break;
  }
});
