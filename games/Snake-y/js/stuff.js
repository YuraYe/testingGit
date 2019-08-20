// Цвета для змейки
const Colors = new Map([
    ['dark-red', {
       head: '#8a270c',
       prim: '#e04427',
       secd: '#e9b168',
       type: 'square',
       step: 3
    }],
    ['light-blue', {
       head: '#17587d',
       prim: '#2e8dc3',
       secd: '#5da5cd',
       type: 'circle',
       step: 3
    }],
    ['toxic', {
       head: '#523162',
       prim: '#9259d4',
       secd: '#1dc128',
       type: 'square',
       step: 3
    }],
    ['pig-head', {
       head: 'pig.png',
       prim: '#d088ed',
       secd: '#d088ed',
       type: 'img-sq',
       headAdd: 8,
       step: 0
    }],
    ['deer', {
       head: 'deer.png',
       body: 'mine-cart.png',
       type: 'images',
       headAdd: 6,
       bodyAdd: 0
    }],
 ]);
 // current color
 let color = Colors.get('dark-red');
 

let dir = 'r'; // for event listener answers


const FOOD = [];
