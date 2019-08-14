// Html canvas output
const canvas = document.getElementById('game-canvas');
const xxx = canvas.getContext('2d');

let scoreField = document.getElementById('score-field');

let dir; // for event listener answers

let score = 0; // just a score! Really?) of course not!

// Background texture
const bgimg = new Image();
bgimg.src = "img/background.png";
const tileSize = 32; // one tile size

// Fruit image texture
const apple = new Image();
   apple.src = "img/food/apple.png";
const cherry = new Image();
   cherry.src = "img/food/cherry.png";

let food = genFood();

let snake = [];
snake[0] = {
   x: 9 * tileSize,
   y: 10 * tileSize
}

function draw() {

   xxx.drawImage(bgimg, 0, 0); // Background
   xxx.drawImage(food.img, food.x, food.y); // Food

   // Snake
   for(let i = 0; i < snake.length; i++) {
      if(i === 0)
         xxx.fillStyle = "#E04B25";
      else if(i % 3)
         xxx.fillStyle = "#F28068";
      else
         xxx.fillStyle = "#F69C80";

      xxx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
   }

   let snakeX = snake[0].x;
   let snakeY = snake[0].y;

   if(snake[0].x == food.x && snake[0].y == food.y) {
      score++;
      scoreField.innerHTML = String(score);

      food = genFood();
   }
   else {
      snake.pop();
   }

   if(snakeX < tileSize || snakeX > tileSize * 17 ||
      snakeY < tileSize * 3 || snakeY > tileSize * 17)
       clearInterval(GAME);

   switch (dir) {
      case 'left':
         snakeX -= tileSize;
         break;

      case 'up':
         snakeY -= tileSize;
         break;

      case 'right':
         snakeX += tileSize;
         break;

      case 'down':
         snakeY += tileSize;
         break;
   }

   let newPos = {
      x: snakeX,
      y: snakeY
   };

   eatTail(newPos, snake);

   snake.unshift (newPos);

}


function genFood() {
   return {
      x: Math.floor(Math.random() * 17 + 1) * tileSize,
      y: Math.floor(Math.random() * 15 + 3) * tileSize,
      cost: 1,
      img: apple
   };
}


function eatTail(head, array) {
   for(let i = 0; i < array.length; i++) {
      if(head.x == array[i].x && head.y == array[i].y) {
         clearInterval(GAME);
      }
   }
}


document.addEventListener('keydown', direction);

function direction(event) {
   switch (event.keyCode) {
      case 65: // arrow left ⬅
         if(dir != 'right') {
            dir = 'left';
            console.log(dir);
         }
         break;
      case 87: // arrow up ⬆
         if(dir != 'down') {
            dir = 'up';
            console.log(dir);
         }
         break;
      case 68: // arrow right ➡
         if(dir != 'left') {
            dir = 'right';
            console.log(dir);
         }
         break;
      case 83: // arrow down ⬇
         if(dir != 'up') {
            dir = 'down';
            console.log(dir);
         }
         break;
   }
}



// Like Update function in Unity
// Redraw canvas
let GAME = setInterval(draw, 150);
