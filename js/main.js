// Todo Raccolgo gli elementi
// Todo Creo un event listener
// Todo Creo le celle secondo le dimensioni della griglia
// Todo Cambio la dimensione delle celle in base al select

const gridElement = document.getElementById('grid');
const form = document.querySelector('form');
const difficultyLevelElement = document.querySelector('select');
const button = document.querySelector('button');


const logSomething = (something) => console.log(something);

//creo la cella

const createCell = (content) => {

    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.innerText = content;

    return newCell;
}


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

