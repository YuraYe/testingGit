let tiles  = []
let losers = []

let LOSE = false
let WINN = 0

// Контрольные значения
let cols = 2
let rows = 1
let step = 0

let counter = 1
let color   = 1

$(function () {
    OnReload()
})


function OnReload (col = 2, row = 1, lose = 0) {

    deleteTable()
    tiles = []
    losers = []

    $('body').removeClass('win-body') // Очистка фона :)

    // Запуск функций и присваивание значений
    Draw(col, row)
    tiles = $('.luckgame-table .a-tile')
    SetLosers(lose + 1, tiles)
    step++

    // Событие нажатия на любую из плиток
    $(tiles).on('click', function () {
        TileOnClick(this)
    })
}

function TileOnClick (obj) {
    if (!LOSE) {
        // Проигрыш и перезагрузка страницы после задержки в 1000мс
        if (losers[+$(obj).text()] == 1) {
            $(obj).addClass('loser')
            LOSE = true

            setTimeout(function () {
                window.location.reload(false)
            }, 1000)
        }
        // Делает плиточку зелёненькой - победоносненькой ))))))
        else if (WINN <= tiles.length / 2) {
            WINN++
            $(obj).addClass('winner')

            // Победил, если открыл половину ячеек (все зелёные)
            if (WINN == tiles.length / 2) {
                setTimeout(function () {
                    $('body').addClass('win-body') // Стиль победы для фона
                }, 250)
                setTimeout(function () {
                    // Обнуление ключевых переменных победы и порожения
                    LOSE = false
                    WINN = 0
                    
                    if (rows % 4 == 0) 
                        cols += 1
                    else 
                        rows += 1

                    OnReload(rows, cols, tiles.length / 2)

                    // Считаем количество пройденых уровней
                    //counter++
                }, 500)

            }
        }
    }
}



// Генерируем таблицу 
function Draw (col = 2, row = 1) {
    let id = 0;
    color = rand(1, 5)

    // тег-обертка таблицы
    $('.luckgame-wrapper').append('<table id="luckgame-table" class="luckgame-table"></table>')

    for (let r = 0; r < row; r++) { // строки
        $('.luckgame-table').append('<tr></tr>')

        for (let c = 0; c < col; c++) { // колонки
            $('.luckgame-table>tr').last().append(`<th><div class="a-tile a-tile${color}">${id}</div></th>`)
            id++
        }
    }
    
    $('#luckgame-table').height($('#luckgame-table').width())

    $('#game-infopanel p').remove()
    $('#game-infopanel').append(`<p>LEVEL:  ${String(counter++)}</p>`)
}

// Определяет, какие из плиток будут проигрышными
function SetLosers (count = 1, tiles) {
    for (let i = 0; i < tiles.length; i++) {
        losers[i] = 0
    }

    while (true) {
        let po = rand(0, tiles.length - 1)

        // Проверка на повторы. 1 === "проиграть"
        if (losers[po] != 1) {
            losers[po] = 1;
            count--
        }

        if (count <= 0) // Выход из цикла
            break
    }
    console.log(losers)
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