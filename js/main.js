// Todo Raccolgo gli elementi
// Todo Creo un event listener
// Todo Creo le celle secondo le dimensioni della griglia
// Todo Cambio la dimensione delle celle in base al select

const gridElement = document.getElementById('grid');
const form = document.querySelector('form');
const difficultyLevelElement = document.querySelector('select');
const button = document.querySelector('button');

//tutta questa logica andrebbe in una funzione a parte chiamata startGame
form.addEventListener('submit', (e) => {
    // *impedisco il reload al submit e svuoto la griglia 
    e.preventDefault();
    gridElement.innerHTML = '';

    //Cambio il testo del button
    button.innerText = 'Ricomincia'

    // *Ottengo le dimensioni di rows e cols in base al select
    const difficultyLevel = difficultyLevelElement.value; 
    logSomething(difficultyLevel);
    let rows = 10;
    let cols = 10;
    let difficultyLevelCode = 'easy';

    switch(difficultyLevel) {
        case 'normal':
            rows = 9;
            cols = 9;
            difficultyLevelCode = 'normal';
            break;
        case 'hard': 
            rows = 7;
            cols = 7;
            difficultyLevelCode = 'hard';
            break;
    }

    const cellQuantity = rows * cols;

    //* creo tante celle quante rows * cols
    for (let i = 1; i <= cellQuantity; i++) {
        const cell = createCell(i);

        //* aggiungo la classe css per regolare la dimensione delle celle
        cell.classList.add(difficultyLevelCode);

        //* gestisco il cambio colore al click delle celle
        cell.addEventListener('click', () => {
            logSomething(i);
            cell.classList.toggle('clicked');
        })

        gridElement.appendChild(cell);
    }
    
});

//invece di dare la classe ad ogni cella è meglio darla alla griglia e nel css scriviamo #grid.normal cell {width; height;}
//soluzione ancora più pro è usare var in css con 10,9 o 7 in un calc nelle .cell e cambiare quello in javascript che chiamiamo --cols-per-row
//dopo che so che dimensioni saranno le rows e col con lo switch, devo prendere la root con query selector (':root)
// poi root.style.setProperty('--cols-per-row', cols);

//le celle vanno cliccate solo una volta ed il colore non è toggle

//! milestone 1
//serve un contatore che tiene i punti dell'utente ogni volta che clicca una cella che non è stata cliccata prima
//mettere il punteggio in pagina, nell'header

//! milestone 2
//generiamo 16 numeri casuali (tutti diversi) nel range della difficoltà prescelta
//serve il totale bombe ed il massimo punteggio; serve una funzione che genera le bombe
//la funzione avrà come paramentri il numero di bombe ed il numero di celle in cui si dispongono
//dentro ci sarà un array che va riempito con 16 numeri casuali ma tutti diversi
//serve un ciclo while che riempie l'array finche avrà 16 numeri diversi

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