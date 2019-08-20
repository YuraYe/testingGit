// Слушатель нажатий клавиш
document.addEventListener('keydown', direction);

function direction(event) { // Проверка нажатия
   switch (event.keyCode) {
      case 65: // arrow left ⬅
      case 37:
         if (dir != 'r') {
            dir = 'l';
         }
         break;
      case 87: // arrow up ⬆
      case 38:
         if (dir != 'd') {
            dir = 'u';
         }
         break;
      case 68: // arrow right ➡
      case 39:
         if (dir != 'l') {
            dir = 'r';
         }
         break;
      case 83: // arrow down ⬇
      case 40:
         if (dir != 'u') {
            dir = 'd';
         }
         break;
      case 32: // space
      case 13: // enter
         if ($('.hello').hasClass('hidden'))
            playGame();
         else if (!PLAY)
            StartPlay();
         break;
   }
   // console.log(`dir = ${dir}`);
}
