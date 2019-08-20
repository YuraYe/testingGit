function drawField(sizeStep = 13) {
   let counter = 0;

   const partW = Width / sizeStep;
   const partH = Height / sizeStep;

   // Рисуем игровое поле
   for (let h = 0; h < sizeStep; h++) {
      for (let w = 0; w < sizeStep; w++) {
         if (counter % 2)
            xxx.fillStyle = '#AAD751';
         else
            xxx.fillStyle = '#a2d148';

         xxx.fillRect(
            w * partW,
            h * partH,
            (w + 1) * partW,
            (h + 1) * partH
         );
         counter++;
      }
   }

   let p = 2;
   // Рисуем границы игрового поля
   xxx.fillStyle = '#604e22';
   xxx.fillRect(0, 0, tileSize - p, Width);
   xxx.fillRect(0, 0, Height, tileSize - p);
   xxx.fillRect(0, Width - tileSize + p, Width, Height);
   xxx.fillRect(Height - tileSize + p, 0, Width, Height);

}


function drawSnake(snake, food) {
   // Временные переменные позиций
   let snakeX = snake[0].x;
   let snakeY = snake[0].y;

   // Проверка на задевание своего хвоста
   PLAY = eatTail(snakeX, snakeY, snake);
   // Проверка на задевание стены
   if (snakeX < 1 || snakeX > tileSize * (Cols - 2) ||
      snakeY < 1 || snakeY > tileSize * (Rows - 2)) {
      Lose('evil wall');
      PLAY = false;
   }

   if (PLAY === true)
      MoveSnake(snake, food);
}

function SnakeFill(ctx, snake, tileSize, i, isRotate) {
   switch (color.type) {
      case 'square':
         if (i === 0) // Голова
            ctx.fillStyle = color.head;
         else if (i % color.step) // Кратно числу
            ctx.fillStyle = color.prim;
         else // Остальные
            ctx.fillStyle = color.secd;

         // Выводим змейку на экран
         ctx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
         break;

      case 'circle':
         if (i === 0) // Голова
            ctx.fillStyle = color.head;
         else if (i % color.step) // Кратно числу
            ctx.fillStyle = color.prim;
         else // Остальные
            ctx.fillStyle = color.secd;

         let half = tileSize / 2;
         ctx.arc(snake[i].x + half, snake[i].y + half, half, 0, Math.PI * 2);
         // Выводим змейку на экран
         ctx.stroke();
         break;

      case 'img-sq':
         if (i === 0) { // Голова
            let img = new Image(tileSize, tileSize);
            img.src = 'img/snake/' + color.head;
            if (isRotate)
               drawRotateImage(img, snake[i].x, snake[i].y, color.headAdd, deg);
               else
               drawMyImage(ctx, tileSize, img, 0, i * tileSize, 1);

         } else if (i % color.step) { // Кратно числу
            ctx.fillStyle = color.prim;
            // Выводим змейку на экран
            ctx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
         } else { // Остальные
            ctx.fillStyle = color.secd;
            // Выводим змейку на экран
            ctx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
         }
         break;

      case 'images':
         if (i === 0) { // Голова
            let img = new Image(tileSize, tileSize);
            img.src = 'img/snake/' + color.head;

            if (isRotate)
               drawRotateImage(img, snake[i].x, snake[i].y, color.headAdd, deg);
            else
               drawMyImage(ctx, tileSize, img, 0, i * tileSize, 1);

         } else {
            let img = new Image(tileSize, tileSize);
            img.src = 'img/snake/' + color.body;

            if (isRotate)
               drawRotateImage(img, snake[i].x, snake[i].y, color.bodyAdd, deg);
            else
               drawMyImage(ctx, tileSize, img, 0, i * tileSize, 1);

         }
         break;
   }
}

function MoveSnake(snake, food) {
   // Временные переменные позиций
   let snakeX = snake[0].x;
   let snakeY = snake[0].y;

   // Щтобы кушац :)
   if (snake[0].x === food.x &&
      snake[0].y === food.y) {
      score += food.cost;
      scoreField.innerHTML = String(score);

      food = genCoords(food); // Респаун еды
      console.log(USER.username + ' eat food!');
   } else {
      // Если не съел еду - длина-- , а если съел, то - нет
      snake.pop();
   }

   // Проверяем, куда идет змейка
   switch (dir) {
      case 'l':
         snakeX -= tileSize;
         deg = 90;
         break;
      case 'u':
         snakeY -= tileSize;
         deg = 180;
         break;
      case 'r':
         snakeX += tileSize;
         deg = 270;
         break;
      case 'd':
         snakeY += tileSize;
         deg = 0;
         break;
   }

   let newPos = {
      x: snakeX,
      y: snakeY
   };

   // Добавляем на перед
   snake.unshift(newPos);
}


// Та самая проверка на съедание хвоста
function eatTail(headX, headY, array) {
   for (let i = 2; i < array.length; i++) {
      if (headX == array[i].x && headY == array[i].y) {
         Lose('suicide');
         return false;
      }
   }
   return true;
}


// Генератор еды в рандомных координатах
function genFood(image, imageAddSize, cost = 1) {
   return {
      // Координаты, в которых спаунится еда
      x: (Math.floor(Math.random() * (Cols - 8)) + 4) * tileSize,
      y: (Math.floor(Math.random() * (Rows - 8)) + 4) * tileSize,
      // Цена сбора еды
      cost: cost,
      // Картинка для еды
      img: image,
      // На сколько img выступает за границы ячейки
      add: imageAddSize
   };
}


function drawMyImage(xxx, tileSize, img, x, y, add) {
   xxx.drawImage(img, x - add, y - add, tileSize + add * 2, tileSize + add * 2);
}

function drawRotateImage(img, x, y, add, deg) {
   // #СПИЖЕНА + мои доработки
   //Convert degrees to radian
   var rad = deg * Math.PI / 180;
   //Set the origin to the center of the image
   xxx.translate(x + tileSize / 2, y + tileSize / 2);
   //Rotate the canvas around the origin
   xxx.rotate(rad);
   //draw the image
   xxx.drawImage(img, (tileSize / 2 * (-1)) - add, (tileSize / 2 * (-1)) - add, tileSize + add * 2, tileSize + add * 2);
   //reset the canvas
   xxx.rotate(rad * (-1));
   xxx.translate((x + tileSize / 2) * (-1), (y + tileSize / 2) * (-1));
}

// Генератор еды в рандомных координатах
function genCoords(obj) {
   obj.x = (Math.floor(Math.random() * (Cols - 1)) + 1) * tileSize;
   obj.y = (Math.floor(Math.random() * (Rows - 1)) + 1) * tileSize;

   return obj;
}