let tiles
let losers
let LOSE = false
let WINN = 0

$(function () {
    OnReload()
})


function TileOnClick (obj) {
    if (!LOSE) {
        // Проигрыш и перезагрузка страницы после задержки в 1000мс
        if (losers[+$(obj).text()] == 1) {
            $(obj).addClass('loser');
            LOSE = true;

            setTimeout(function () {
                window.location.reload(false)
            }, 1000)
        }
        // Делает плиточку зелёненькой - победоносненькой ))))))
        else if (WINN <= 1) {
            WINN++;
            $(obj).addClass('winner');

            if (WINN == 1) {
                setTimeout(function () {
                    alert('CONGRATULATIONS! YOU WIN!!!')
                }, 400)
                setTimeout(function () {
                    LOSE = false;
                    WINN = 0;
                    losers = OnReload(2, 2, 3)
                    console.log(tiles)
                }, 500)

            }
        }
    }
}


function OnReload (col = 2, row = 1, lose = 1) {

    deleteTable()
    tiles = []

    // Запуск функций и присваивание значений
    Draw(col, row)
    tiles = $('.luckgame-table .a-tile')
    losers = SetLosers(lose, tiles)

    // Событие нажатия на любую из плиток
    $(tiles).on('click', function () {
        TileOnClick(this)
    })
}


// Генерируем таблицу 
function Draw (col = 2, row = 1) {
    let id = 0;

    // тег-обертка таблицы
    $('.luckgame-wrapper').append('<table class="luckgame-table"></table>')

    for (let r = 0; r < row; r++) { // строки
        $('.luckgame-table').append('<tr></tr>')

        for (let c = 0; c < col; c++) { // колонки
            $('.luckgame-table>tr').last().append(`<th><div class="a-tile">${id}</div></th>`)
            id++
        }
    }
}

// Определяет, какие из плиток будут проигрышными
function SetLosers (count = 1, tiles) {
    losers = []

    for (let i = 0; i < tiles.length; i++) {
        losers[i] = 0
    }

    while (true) {
        let po = rand(0, tiles.length)

        // Проверка на повторы. 1 === "проиграть"
        if (losers[po] != 1) {
            losers[po] = 1;
            count--
        }

        if (count <= 0) // Выход из цикла
            break
    }

    return losers
}

// Генерирует рандомное целое число от min до max. Самый лучший вариант =)
function rand (min, max) {
    // случайное число от min до (max+1)
    let r = Math.random() * (max + 1 - min) + min
    return Math.floor(r)
}
function deleteTable () {
    $('.luckgame-table').remove()
}