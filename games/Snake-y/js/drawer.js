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

   // Рисуем границы игрового поля
   xxx.fillStyle = '#604e22';
   xxx.fillRect(0, 0, tileSize, Width);
   xxx.fillRect(0, 0, Height, tileSize);
   xxx.fillRect(0, Width - tileSize, Width, Height);
   xxx.fillRect(Height - tileSize, 0, Width, Height);

}


function drawSnake(snake, food) {
   // Временные переменные позиций
   let snakeX = snake[0].x;
   let snakeY = snake[0].y;

   // Проверка на задевание своего хвоста
   let lose = eatTail(snakeX, snakeY, snake);
   // Проверка на задевание стены
   if (snakeX < 1 || snakeX > tileSize * (Cols - 2) ||
      snakeY < 1 || snakeY > tileSize * (Rows - 2)) {
      Lose('evil wall');
      lose = true;
   }

   // Змейка
   for (let i = 0; i < snake.length; i++) {
      if (i === 0) // Голова
         xxx.fillStyle = "#E04B25";
      else if (i % 3) // Кратно числу
         xxx.fillStyle = "#F28068";
      else // Остальные
         xxx.fillStyle = "#F69C80";

      xxx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize); // Выводим змейку на экран
   }

   if (lose)
      return false;
   else
      MoveSnake(snake, food);

   return true;
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
         break;
      case 'u':
         snakeY -= tileSize;
         break;
      case 'r':
         snakeX += tileSize;
         break;
      case 'd':
         snakeY += tileSize;
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
   for (let i = 1; i < array.length; i++) {
      if (headX == array[i].x && headY == array[i].y) {
         Lose('suicide');
         return true;
      }
   }
   return false;
}


// Генератор еды в рандомных координатах
function genFood(image, imageAddSize, cost = 1) {
   return {
      // Координаты, в которых спаунится еда
      x: (Math.floor(Math.random() * (Cols - 1)) + 1) * tileSize,
      y: (Math.floor(Math.random() * (Rows - 1)) + 1) * tileSize,
      // Цена сбора еды
      cost: cost,
      // Картинка для еды
      img: image,
      // На сколько img выступает за границы ячейки
      add: imageAddSize
   };
}

// Генератор еды в рандомных координатах
function genCoords(obj) {
   obj.x = (Math.floor(Math.random() * (Cols - 1)) + 1) * tileSize;
   obj.y = (Math.floor(Math.random() * (Rows - 1)) + 1) * tileSize;

   return obj;
}
