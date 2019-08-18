// Слушатель нажатий клавиш
document.addEventListener('keydown', direction);

let dir = 'r'; // for event listener answers

function direction(event) { // Проверка нажатия
   switch (event.keyCode) {
      case 65: // arrow left ⬅
         if (dir != 'r') {
            dir = 'l';
         }
         break;
      case 87: // arrow up ⬆
         if (dir != 'd') {
            dir = 'u';
         }
         break;
      case 68: // arrow right ➡
         if (dir != 'l') {
            dir = 'r';
         }
         break;
      case 83: // arrow down ⬇
         if (dir != 'u') {
            dir = 'd';
         }
         break;
      case 32:
      case 13:
         if ($('.hello').hasClass('hidden'))
            playGame();
         else if (!PLAY)
            StartPlay();
         break;
   }
   // console.log(`dir = ${dir}`);
}
