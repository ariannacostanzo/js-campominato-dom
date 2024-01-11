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

//! gestisco gli eventi al click della cella

//! da sistemare
// const onCellClick = (event, scoreContainer, score) => {
//     const cell = event.target;
    
//     if (!cell.classList.contains('clicked')) {
//         const cellNumber = parseInt(cell.innerText);
//         console.log(cellNumber);
        
//         cell.classList.add('clicked');
//         score++;
//         scoreContainer.innerText = score;
//     }
// };

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
    let message = '';

    if(hasWon) {
        message = 'Hai vinto';
        logSomething('Hai perso, il tuo punteggio è: ' + score);
    } else {
        message = `Hai perso, il tuo punteggio è: ${score}`;
        logSomething('Hai vinto')
    }

    alert(message);
    revealFunction(bombs)
}




//! La funzione che gestisce il gioco

const startGame = (e) => {
    // *impedisco il reload al submit e svuoto la griglia 
    e.preventDefault();
    gridElement.innerHTML = '';

    //*Gameover
    let isGameOver = false;

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





//! Inizio il gioco con il submit del form
form.addEventListener('submit', startGame);



//? Mettere la logica all'interno dell'event listener di cell in una funzione 

//! milestone 3
//quando l'utente clicca su una cella, verifichiamo se la cella che ha premuto è una delle bombe,
//controllando se il numero di cella è nell'array delle bombe, se si la cella diventa rossa, raccogliamo iol punteggio e la
//partita termina, se no la cella è blu ed incrementa il punteggio, attenzione a fare una logic game over con flag
//la parte in cui controllo se ha vinto o perso e gli dico il punteggio lo metto in una funzione

//! bonus 
//alla fine scopri tutte le bombe e poi posso fare in modo che il gioco ricominci
//richiamando la funzione startGame() che deve avere tutto il codice
//per rivelare tutte le celle devo andarle a prendere tutte con queryselectorall e poi
//e dare classlist e fare girare in un ciclo for(let cell of cells) {cell.classlist.add('clicked)}