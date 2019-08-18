let RegUSER;

try {
   RegUSER = JSON.parse(localStorage.getItem('usersData'));

   if(RegUSER == null)
      throw new Error('Is null!');
} catch (e) {
   localStorage.setItem('usersData', '{users:[]}');
   RegUSER = localStorage['usersData'];
   localStorage.setItem('currentUser', '{}');
   console.warn('User was unsaved and recreated!\n' + e);
}


// Проверяем, был ли выполнен вход в систему
// Если да, то сразу запускаем игру
CheckUser();

function CheckUser() {
   let currentUser = localStorage.getItem('currentUser');

   if (currentUser !== '{}') {
      $('#allgame-wrapper').removeClass('hidden');
      MainGame();
   } else {
      $('.hello').removeClass('hidden');
   }
}

let autorizer = false;

$('#play-button').on('click', function () {
   StartPlay();
});

let newUser = {};

function StartPlay() {
   let username = $('#username-input').val();

   if (RegUSER != '{users:[]}') {
      if (username !== '') {
         if ($('#isNewPlayer').is(':checked')) {

            let isNew = true;
            RegUSER.forEach(function (item) {
               if (item.username === username) {
                  isNew = false;
               }
            });

            if (isNew) {
               newUser = {
                  "username": username,
                  "id": RegUSER.length,
                  "bestScore": 0,
                  "playedGames": 0,
                  "lastSpeed": "0"
               };

               RegUSER.push(newUser);

               console.log(newUser);
               console.log(RegUSER);

               localStorage.setItem('usersData', JSON.stringify(RegUSER));
               localStorage.setItem('currentUser', JSON.stringify(newUser));

               autorizer = true;
               console.log('Created!\n' + localStorage['usersData']);
            }

            if (!autorizer)
               alert("I know this user. Don't use him/her name, please!");

         } else {

            let isNew = true;
            RegUSER.forEach(function (item, index) {
               if (item.username == username) {
                  localStorage.setItem('currentUser', JSON.stringify(item));
                  console.log(item);
                  autorizer = true;
               }
            });
            if (!autorizer)
               alert("I don't know this user!");
         }

         if (autorizer)
            SignIn(newUser);

      } else {
         alert('Enter username!');
      }

   } else {
      newUser = {
         "username": username,
         "id": 0,
         "bestScore": 0,
         "playedGames": 0,
         "lastSpeed": "0"
      };


      autorizer = true;
      console.log('Created!');
      SignIn(newUser);
   }
}


$('#sign-out-btn').on('click', function () {
   localStorage.setItem('currentUser', '{}');
   $('.hello').removeClass('hidden');
   $('#allgame-wrapper').addClass('hidden');
});


function SignIn(newUser) {
   let users;
   try {
      // Парсим данные из памяти
      users = JSON.parse(localStorage.getItem('usersData'));
      // Пытаемся в полученый массив добавить нового пользователя
      users.push(newUser);
   } catch (e) {
      // При ошибке перезаписываем объект
      users = [newUser];
      console.warn('Data was empty or broken!\n' + e);
   }
   localStorage.setItem('usersData', JSON.stringify(users));
   localStorage.setItem('currentUser', JSON.stringify(newUser));

   USER = TryToLoad('currentUser');

   $('.hello').addClass('hidden');
   $('#allgame-wrapper').removeClass('hidden');
   MainGame();
}

//
// console.log("All created users:  " + localStorage.getItem('usersData'));
// console.log("Current user:  " + localStorage.getItem('currentUser'));