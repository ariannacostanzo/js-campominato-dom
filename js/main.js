// Todo Raccolgo gli elementi
// Todo Creo un event listener
// Todo Creo le celle secondo le dimensioni della griglia
// Todo Cambio la dimensione delle celle in base al select

//! Raccolgo gli elementi della pagina che mi servono
const gridElement = document.getElementById('grid');
const form = document.querySelector('form');
const difficultyLevelElement = document.querySelector('select');
const button = document.querySelector('button');
const scoreContainer = document.getElementById('score');
const winContainer = document.getElementById('win');
const closeWin = document.getElementById('close');
const loseContainer = document.getElementById('lose');
const closeLose = document.getElementById('close-lose');
const scoreText = document.getElementById('score-text');
const bestScorePopup = document.getElementById('best-score-popup');
const bestScoreContainer = document.getElementById('best-score');
let bestScore = 0;

bestScoreContainer.innerText = bestScore;
//! ---------------------
//! FUNZIONI
//! ---------------------

const logSomething = (something) => console.log(something);

//! creo la cella

const createCell = (content) => {

    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.innerText = content;

    return newCell;
}


//! gestisco la creazione delle bombe

const generateBombs = (maxCellNumber, bombNumber) => {
    const bombs = [];

    //*Continuo a generare numeri finche non sono 16 diversi
    while (bombs.length < bombNumber) {
        const randomNumber = Math.floor(Math.random() *maxCellNumber) + 1;

        if(!bombs.includes(randomNumber)) bombs.push(randomNumber);
        
    }

    return bombs;
};

//! Rivelo tutte le caselle

const revealAllCells = (bombs) => {
    console.log('fine gioco');
    const cells = document.querySelectorAll('.cell');

    for (let cell of cells) {
        cell.classList.add('clicked');

        const cellNumber = parseInt(cell.innerText);

        if (bombs.includes(cellNumber)) {
            cell.classList.add('bomb');
        }
        
    }

};

//! gestisco la vittoria o sconfitta

const endGame = (score, hasWon, bombs, revealFunction) => {
    
    if(hasWon) {
        winContainer.classList.remove('d-none');
        logSomething('Hai vinto');
    } else {
        if (score > bestScore) {
            bestScore = score;
        }
        loseContainer.classList.remove('d-none');
        logSomething('Hai perso, il tuo punteggio è: ' + score);
        scoreText.innerHTML = `Il tuo punteggio è: <strong>${score}</strong>.`
        bestScorePopup.innerHTML = `Il tuo miglior punteggio è stato: <strong>${bestScore}</strong>.`
        bestScoreContainer.innerText = bestScore;
    }


    revealFunction(bombs)
}




//! La funzione che gestisce il gioco

const startGame = (e) => {
    // *impedisco il reload al submit e svuoto la griglia 
    e.preventDefault();
    gridElement.innerHTML = '';

    //*Cambio il testo del button
    button.innerText = 'Ricomincia'

    // *Ottengo le dimensioni di rows e cols in base al select
    const difficultyLevel = difficultyLevelElement.value; 
    logSomething(difficultyLevel);
    let rows = 10;
    let cols = 10;

    switch(difficultyLevel) {
        case 'normal':
            rows = 9;
            cols = 9;
            break;
        case 'hard': 
            rows = 7;
            cols = 7;
            break;
    }

    const cellQuantity = rows * cols;

    //*cambio la dimensione delle celle nel css
    const root = document.querySelector(':root');
    root.style.setProperty('--rows-per-cols', cols);

    //*Creo un contatore per il punteggio
    let score = 0;

    //*Lo stampo in pagina
    scoreContainer.innerText = score;

    //* Logica delle bombe
    const bombNumber = 16;

    const bombs = generateBombs(cellQuantity, bombNumber)
    logSomething(bombs);

    //*Logica del punteggio
    const maxScore = cellQuantity - bombNumber;

    //* creo tante celle quante rows * cols
    for (let i = 1; i <= cellQuantity; i++) {
        const cell = createCell(i);

        //* gestisco il click delle celle
        cell.addEventListener('click', () => {

            //* se ho premuto il tasto non potrò ripremerlo
            if (cell.classList.contains('clicked')) return

            //* se il tasto non l'ho ancora premuto, aggiungo la classe, stampo il numero
            cell.classList.add('clicked');
            logSomething(i);

            const hasHitBomb = bombs.includes(i);

            //*se ho pestato una bomba 
            if (hasHitBomb) {
                cell.classList.add('bomb');
                endGame(score, false, bombs, revealAllCells)
            }  else {
                score++;
                scoreContainer.innerText = score;

                //*se ho raggiunto il punteggio massimo
                if(score === maxScore) {
                endGame(score, true, bombs, revealAllCells)
                }
                
            }
            
        });

        //*aggiungo le celle alla griglia
        gridElement.appendChild(cell);

    }
};


//!Chiudo il popup 'Hai vinto'
closeWin.addEventListener('click', () => {
    winContainer.classList.add('d-none');
});

closeLose.addEventListener('click', () => {
    loseContainer.classList.add('d-none');
});

//! Inizio il gioco con il submit del form
form.addEventListener('submit', startGame);



