
const logSomething = (something) => console.log(something);

//creo la cella

const createCell = (content) => {

    const newCell = document.createElement('div');
    newCell.classList.add('cell');
    newCell.innerText = content;

    return newCell;
}
