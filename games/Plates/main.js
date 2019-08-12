$(function () {
    OnReload()
})


function OnReload (col = 2, row = 1, lose = 0) {

    deleteTable()
    tiles = []
    losers = []

    $('body').removeClass('win-body') // Очистка фона :)

    // Генерируем таблицу 
    let id = 0;
    color = rand(1, 5)
    // тег-обертка таблицы
    $('.luckgame-wrapper').append('<table class="luckgame-table"></table>')

    for (let r = 0; r < row; r++) { // строки
        $('.luckgame-table').append('<tr></tr>')

        for (let c = 0; c < col; c++) { // колонки
            $('.luckgame-table>tr').last().append(`<th><div class="a-tile a-tile${color}">${id}</div></th>`)
            id++
        }
    }

    $('#game-infopanel p').remove()
    $('#game-infopanel').append(`<p>LEVEL:  ${String(counter++)}</p>`)
    /* ** *** *** **** ***** ****** ***** **** *** *** ** */


    tiles = $('.luckgame-table .a-tile')
    SetLosers(lose + 1, tiles)
    step++

    // Событие нажатия на любую из плиток
    $(tiles).on('click', function () {
        TileOnClick(this)
    })
}
