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





/* Indexes within the board
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

/*
    Event listener to every single tile
    When a tile is clicked the userAction function is called with a reference to the specific tile and its index
    The tile changes to either X or O
    While the index updates the in-memory saved array
*/
tiles.forEach((tile,index) =>{
    tile.addEventListener('click',() => userAction(tile,index));
});




function handleResultValidation() {
    let roundWon = false;
    for (let i =0; i <=7; i++){
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === ''){
            continue;
        }
        if (a === b && b === c){
            roundWon = true;
            break;
        }
    }
    if (roundWon){
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON );
        isGameActive = false;
        return;
    }

    if(!board.includes('')){
        announce(TIE);
    }
}



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

const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }

    return true;
};

// Allows you inpute X or O depending on the player
const updateBoard = (index) => {
    board[index] = currentPlayer;
}

// To change players when the other has made his move
const changePlayer = () =>{
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`)
}

// To allow players to make a move during their turn
const userAction = (tile,index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

const resetBoard = () => {
    board = ['','','','','','','','',''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer = 'O'){
        changePlayer();
    }

    tiles.forEach(tile => {
        tile.innerText = '';
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}
reset.addEventListener('click',resetBoard);