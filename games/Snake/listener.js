document.addEventListener('keydown', direction);

function direction(event) {
   switch (event.keyCode) {
      case 37: // arrow left ⬅
         if(dir != 'r')
            dir = 'l';
         break;

      case 38: // arrow up ⬆
         if(dir != 'd')
            dir = 'u';
         break;

      case 39: // arrow right ➡
         if(dir != 'l')
            dir = 'r';
         break;

      case 40: // arrow down ⬇
         if(dir != 'u')
            dir = 'd';
         break;
   }

   console.log(dir);
}
