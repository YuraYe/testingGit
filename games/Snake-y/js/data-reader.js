const VERSION = "v 0.5.1 beta"
// Получаем HTML элементы в переменыые (jQuery)
let speedText = $('#speed-text');
let speedSlider = $('#speed-range');

$('.version').text(VERSION);

//////////////////////////////////////////////////

let USER = TryToLoad('currentUser');

function ReadData() {
   let userIndex = 0;
   console.log(USER);
   // Выводим переменные из памяти на экран
   $('#username-field').text(USER.username);
   $('#best-score-field').text(USER.bestScore);
   $('#playedGames-field').text(USER.playedGames);
   speedText.text(SpeedConvert(USER.lastSpeed));
   speedSlider.val(+USER.lastSpeed);

   console.log(USER.username + ' sign in!');
}


function SpeedSave(speedValue) {  // "-1"
   USER.lastSpeed = speedValue;
   localStorage.setItem('currentUser', JSON.stringify(USER));

   // Получаем из памяти данные пользователей и парсим их
   let usersData = JSON.parse(localStorage.getItem('usersData'));
   usersData[USER.id].lastSpeed = speedValue;
   SaveUserData(usersData[USER.id]);
}


function Lose(killer = 'anonim') {
   //clearInterval(GAME); // Остановка игры

   setInterval(function() { // Вывод сообщения
      $('#canvas-alert').html("You lose...</br></br>😿");
      $('.pause-panel').removeClass('hidden');
      IsLose = true;
   }, delay);

   // Прорерка на дэбила ))))))
   if (score > 0) {
      // Если прошел тест - +1 к сыграным играм
      USER.playedGames += 1;

      // Проверка на рекорд
      if (score > USER.bestScore) {
         // Присвоение рекорда
         USER.bestScore = score;
         // Вывод сообщения про новый рекорд
         alert(`Your new best score is ${score}!\n Congratulations!!!  🎉🎉🎉🎉🎉🎉🎉`)
      }
      // Сохраняем в память
      SaveUserData(USER);
   }
   console.log('Cause of death - ' + killer)
}


// Отлов ошибок и пересоздание, в случае необходимости, объекта с данными пользователя
function TryToLoad(dataKey = 'currentUser') {
   let newUser = {};
   try {
      newUser = JSON.parse(localStorage.getItem(dataKey));
   } catch (err) {
      newUser = {
         username: "Player",
         id: 0,
         bestScore: 0,
         playedGames: 0,
         lastSpeed: 0
      };
      console.warn('Loading user data error!\n' + err);
   }
   return newUser;
}


function SaveUserData(thisUser) {
   try {
      // Перезаписываем нашего пользователя
      let allUsers = JSON.parse(localStorage.getItem('usersData'));
      allUsers[thisUser.id] = thisUser;

      localStorage.setItem('usersData', JSON.stringify(allUsers));
      localStorage.setItem('currentUser', JSON.stringify(thisUser));

      console.log('Your data was saved!');
   } catch (e) {
      // Отлов ошибок при записи и вывод в консоль
      console.error('Your data was NOT saved! With error:\n' + e);
   }
}
