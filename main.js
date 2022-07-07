let board = ['','','','','','','','','']
let currentPlayer = 'X'
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';

const tiles = Array.from(document.querySelectorAll('.tile')); // Array.from is used so that it can be treated as an array and not as a nodelist
const playerDisplay = document.querySelector('.display-player');
const reset = document.querySelector('#reset');
const announcer = document.querySelector('.announcer');





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

tiles.forEach((tile,index) =>{
    tile.addEventListener('click',() => userAction(tile,index));
});

reset.addEventListener('click',resetBoard);


const announce = (type) => {
    switch(type){
        case PLAYERO_WON:
            announcer.innerHTML = 'Player <span class = "playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class = "playerX">X</span> Won';
            break;
        case TIE:
            announcer.innerHTML = 'Tie'
    }
    announcer.classList.remove('hide');
};


const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}


const userAction = (tile,index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}
