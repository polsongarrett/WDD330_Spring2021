let turn = 0; // turn tracker

let table = document.querySelector('table');       // get table node
table.addEventListener('touchend', event => {      // call putMark() when a cell is touched   
  // check that there is not already an 'X' or 'O'
  if (!event.target.innerText) {
    turn++;
    event.target.innerText = (turn % 2 == 0 ? "O" : "X");
  }
  else {
    alert('That square is occupied. Please choose another.');
  }
}); 

let tds = document.querySelectorAll('td');         // get node list of all td's
let resetBtn = document.querySelector('#reset');   // get reset button node

resetBtn.addEventListener('touchend', () => {
  tds.forEach(td => td.innerText = '');
  turn = 0;
});