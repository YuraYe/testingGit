$('#btn-shop__snake-color').on('click', function () {
    $('#shop__color-snake').removeClass('hidden');
});


$('.color-circle').on('click', function () {
    color.head = "#fff";
    $('#shop__color-snake').addClass('hidden');
});