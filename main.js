let board = ['','','','','','','','','']
let currentPlayer = 'X'
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

/* How the board looks
    0 1 2
    3 4 5
    6 7 8
*/

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
];



const tiles = Array.from(document.querySelectorAll('.tile')); // Array.from is used so that it can be treated as an array and not as a nodelist
const playerDisplay = document.querySelector('.display-player');
const reset = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');

