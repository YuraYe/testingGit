$('#btn-shop__snake-color').on('click', function () {
    playGame();
    drawShopSnake();
    $('#shop__color-snake').removeClass('hidden');
});


let tempColorId;

$('.color-set').on('click', function () {
    let id = $(this).index();

    switch (id) {
        case 0:
            tempColorId = 'dark-red';
            break;
        case 1:
            tempColorId = 'light-blue';
            break;
        case 2:
            tempColorId = 'toxic';
            break;
        case 3:
            tempColorId = 'pig-head';
            break;
        case 4:
            tempColorId = 'deer';
            break;
    }

    color = Colors.get(tempColorId);
    drawShopSnake();
});



function drawShopSnake() {
    let shopCanvas = document.getElementById('shop-colors__canvas');
    let scc = shopCanvas.getContext('2d');
    scc.clearRect(0, 0, shopCanvas.width, shopCanvas.height);
    let once = shopCanvas.width; // one tile size

    deg = 0;
    let shopSnake = []; // Объявляем массив змейки
    for (let i = 0; i < 8; i++) { // Цоклом заполняем её
        shopSnake[i] = {
            x: 0, // - i  --> для отступа
            y: i * once // индекс ячейки * размер ячейки
        }
    }

    for (let i = 0; i < shopSnake.length; i++) {
        SnakeFill(scc, shopSnake, once, i, false);
    }
}

$('#btn-shop__close').on('click', function () {
    $('#shop__color-snake').addClass('hidden');

    ColorSave(tempColorId);
});