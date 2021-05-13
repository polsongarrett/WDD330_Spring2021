let turn = 0; // turn tracker

let table = document.querySelector('table');               // get table node
table.addEventListener('touchend', event =>                // call putMark() when a cell is touched   
  event.target.innerText = putMark(event.target.innerText)
); 

/************ PUT MARK FUNCTION **************/
function putMark(content) {
  // check that there is not already an 'X' or 'O'
  if(!content) {
    let p1 = 'X';
    let p2 = 'O';
    turn++;
    return (turn % 2 == 0 ? p2 : p1);
  }
  else {
    alert('That square is occupied. Please choose another.');
    return content;
  }
}

let tds = document.querySelectorAll('td');                // get node list of all td's
let resetBtn = document.querySelector('#reset');          // get reset button node
resetBtn.addEventListener('touchend', () => resetGame()); // call resetGame() when button is pressed


/************ RESET GAME FUNCTION **************/
function resetGame() {
  tds.forEach(td => td.innerText = '');
  turn = 0;
}



