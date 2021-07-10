import { Die } from './Die.js'
console.log(window.location.pathname);
addListenerToModalCloseButton();

/******************************************************************************
 * ADD LISTENER TO CLOSE MODAL BUTTON
 *****************************************************************************/
 function addListenerToModalCloseButton() {

  let close = document.querySelector('.close');
  close.addEventListener('click', closeModal);
}

/******************************************************************************
 * CLOSE MODAL
 * Close modal for die trade
 *****************************************************************************/
 function closeModal() {

  let modal = document.querySelector('.modal');
  // document.querySelector('#tradeDieDiv').dataset.id = '';
  // document.querySelector('#tradeDieDiv').innerText= '';
  // document.querySelector('#tradeDieDiv').style.backgroundColor = '';
  // document.querySelector('#tradeDieDiv').style.color = '';
  
  // document.querySelector('#numSidesTradeInput').value = 6;
  // document.querySelector('#dieColorTradeInput').value = '#000000';
  // document.querySelector('#sidesColorTradeInput').value = '#ffffff';

  modal.style.display = 'none';
}

/******************************************************************************
 * DISPLAY DICE
 * Print a list of dice in localstorage
 *****************************************************************************/
 function displayDice(pageIsRollPrep) {

  let diceBag = localStorage.getItem("diceBag");

  // Determine if local storage is empty
  if(!diceBag) {
    diceBag = []
    // diceBag.push(die);
    // localStorage.setItem("diceBag", JSON.stringify(diceBag));
  }
  else {
    diceBag = JSON.parse(diceBag);
    // diceBag.push(die);
    // localStorage.setItem("diceBag", JSON.stringify(diceBag));
  }

  let table = document.querySelector('table tbody');
  table.innerHTML = '';

  if(pageIsRollPrep) {

    diceBag.forEach((die) => {
      table.innerHTML +=
        `
        <tr data-id="${die.id}" data-sides="${die.sides}" data-color="${die.color}" data-numColor="${die.numColor}">
          <td class="die">
            <div style='background-color: ${die.color}; color: ${die.numColor}'>${die.sides}</div>
          </td>
          <td class="quantity">0</td>
          <td class="remove">
            <button>-1</button>
          </td>
          <td class="add">
            <button>+1</button>
          </td>
        </tr>
        `;

      addListenersToRemoveButtons();
      addListenersToAddButtons();
    });
  }
  else {
    diceBag.forEach((die) => {
      table.innerHTML +=
        `
        <tr data-id="${die.id}" data-sides="${die.sides}" data-color="${die.color}" data-numColor="${die.numColor}">
          <td class="die">
            <div style='background-color: ${die.color}; color: ${die.numColor}'>${die.sides}</div>
          </td>
          <td class="toss">
            <button>Toss</button>
          </td>
          <td class="trade">
            <button>Trade</button>
          </td>
        </tr>
        `;

      addListenersToTossButtons();
      addListenersToTradeButtons();
    });
  }
}

/******************************************************************************
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *                           R O L L    V I E W 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *****************************************************************************/
if(window.location.pathname == '/WDD330_Spring2021/final/views/roll.html') {
  addListenerToRollButton();
  displayDice(true);
}

// console.log(window.location.pathname);

// let die = new Die(6, 'rgb(255, 255, 255)', 'rgb(0, 0, 0)');
// let diceBag = localStorage.getItem("diceBag");
// // Determine if local storage is empty
// if(!diceBag) {
//   diceBag = []
//   diceBag.push(die);
//   localStorage.setItem("diceBag", JSON.stringify(diceBag));
// }
// else {
//   diceBag = JSON.parse(diceBag);
//   diceBag.push(die);
//   localStorage.setItem("diceBag", JSON.stringify(diceBag));
// }


/******************************************************************************
 * ADD LISTENER TO ROLL BUTTON
 *****************************************************************************/
 function addListenerToRollButton() {

  let rollBtn = document.querySelector('#rollBtn');
  rollBtn.addEventListener('click', rollDice);
}

/******************************************************************************
 * ADD LISTENERS TO REMOVE BUTTONS
 *****************************************************************************/
 function addListenersToRemoveButtons() {
  
  let removeBtns = document.querySelectorAll('.remove button');

  removeBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        removeDieFromRoll(event.target);
      });
  });
}

/******************************************************************************
 * ADD LISTENERS TO REMOVE BUTTONS
 *****************************************************************************/
 function addListenersToAddButtons() {
  
  let addBtns = document.querySelectorAll('.add button');    

  addBtns.forEach(btn => {
    btn.addEventListener('click', event => {
      addDieToRoll(event.target);
    });
  });
}

/******************************************************************************
 * REMOVE DIE FROM ROLL
 *****************************************************************************/
function removeDieFromRoll(btn) {

  let quantityTd = btn.parentNode.previousSibling.previousSibling;
  let numDice = parseInt(quantityTd.innerHTML); 
  if (numDice) {
    numDice -= 1;
    quantityTd.innerHTML = numDice;
  }
}

/******************************************************************************
 * ADD DIE TO ROLL
 *****************************************************************************/
function addDieToRoll(btn) {

  let quantityTd = btn.parentNode.previousSibling.previousSibling.previousSibling.previousSibling;
  let numDice = parseInt(quantityTd.innerHTML); 
  numDice += 1;
  quantityTd.innerHTML = numDice;
}

/******************************************************************************
 * GET DICE IN HAND
 * Get an array of the dice selected to roll
 *****************************************************************************/
function getDiceRolls() {

  let rows = document.querySelectorAll('#allDice tr');
  let diceRolls = [];

  rows.forEach(row => {

    // if the number of rolls for a die is zero, skip it
    let rNumRolls = parseInt(row.firstChild.nextSibling.nextSibling.nextSibling.innerText);
    if (!rNumRolls) {
      return;
    }

    let rSides = row.dataset.sides;
    let rColor = row.dataset.color;
    let rNumColor = row.dataset.numcolor;
    let die = new Die(rSides, rColor, rNumColor)
    let dieRoll = { 'die': die, 'numRolls': rNumRolls, 'results': {} };

    diceRolls.push(dieRoll);
  });
  return diceRolls;
} 

/******************************************************************************
 * ROLL DICE
 *****************************************************************************/
function rollDice() {

  let diceRolls = getDiceRolls();

  if(diceRolls.length) {
    diceRolls.forEach(dieRoll => {
      dieRoll.results = dieRoll.die.roll(dieRoll.numRolls);
    }); 
  }

  displayRollModal(diceRolls);
}

/******************************************************************************
 * DISPLAY ROLL MODAL
 * Show modal for die trade
 *****************************************************************************/
 function displayRollModal(diceRolls) {

  let modal = document.querySelector('.modal');
  let table = document.querySelector('.modal table tbody');
  table.innerHTML = '';

  if(!diceRolls.length) {
    modal.style.display = 'block';
    table.innerHTML += "<tr><td>Pick up some dice first! You're just waving your hand around...</td></tr>";
    
    return;
  }
  
  // <tr data-id="${dieRoll.die.id}" data-sides="${dieRoll.die.sides}" data-color="${dieRoll.color}" data-numColor="${dieRoll.numColor}"></tr>
  diceRolls.forEach((dieRoll) => {
    table.innerHTML +=
      `
      <tr>
        <td class="die">
          <div style='background-color: ${dieRoll.die.color}; color: ${dieRoll.die.numColor}'>${dieRoll.die.sides}</div>
        </td>
        <td class="numRolled">${dieRoll.numRolls}</td>
        <td class="rollCalc">${dieRoll.results.join(' + ')}</td>
        <td class="rollSum">${dieRoll.results.reduce((acc, cv) => acc + cv)}</td>
      </tr>
      `;
  }); 

  modal.style.display = 'block';
}

/******************************************************************************
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *                             B A G   V I E W 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
 *****************************************************************************/
 if(window.location.pathname == '/WDD330_Spring2021/final/views/bag.html') {
  addListenerToAddDieButton();
  addListenerToTradeDieButton();
  displayDice(false);
}

/******************************************************************************
 * ADD LISTENERS TO TOSS BUTTONS
 *****************************************************************************/
 function addListenersToTossButtons() {
  
  let tossBtns = document.querySelectorAll('.toss button');

  tossBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        tossDie(event.target);
      });
  });
}

/******************************************************************************
 * ADD LISTENERS TO TRADE BUTTONS
 *****************************************************************************/
 function addListenersToTradeButtons() {
  
  let tradeBtns = document.querySelectorAll('.trade button');

  tradeBtns.forEach(btn => {
      btn.addEventListener('click', event => {
        displayTradeModal(event.target);
      });
  });
}

/******************************************************************************
 * ADD LISTENER TO ADD DIE BUTTON
 *****************************************************************************/
function addListenerToAddDieButton() {

  let addDieBtn = document.querySelector('#addDieBtn');
  addDieBtn.addEventListener('click', addDieToBag);
}

/******************************************************************************
 * ADD LISTENER TO TRADE DIE BUTTON
 *****************************************************************************/
function addListenerToTradeDieButton() {

  let tradeDieBtn = document.querySelector('#tradeDieBtn');
  tradeDieBtn.addEventListener('click', tradeDie);
}



/******************************************************************************
 * ADD DIE TO BAG
 * Add die to local storage
 *****************************************************************************/
function addDieToBag() {

  let addDieInputs = document.querySelectorAll('#addDieInputsDiv input');

  if(addDieInputs[0].value < 2 || !addDieInputs[0].value) {
    let numSidesInput = document.querySelector('#numSidesInput');
    numSidesInput.focus();
    numSidesInput.value = ''; 
    return;
  }

  let die = new Die(
    addDieInputs[0].value, 
    addDieInputs[1].value,
    addDieInputs[2].value
  );

  let diceBag = localStorage.getItem("diceBag");

  if(!diceBag) {
    diceBag = []
    diceBag.push(die);
    localStorage.setItem("diceBag", JSON.stringify(diceBag));
  }
  else {
    diceBag = JSON.parse(diceBag);
    diceBag.push(die);
    localStorage.setItem("diceBag", JSON.stringify(diceBag));
  }
  displayDice(false);
}

/******************************************************************************
 * TOSS DIE
 * Delete die from local storage
 *****************************************************************************/
 function tossDie(btn) {

  let diceBag = JSON.parse(localStorage.getItem("diceBag"));
  let dieId = btn.parentNode.parentNode.dataset.id;

  diceBag.some((die, index) => {
    if(die.id == dieId) {
      diceBag.splice(index, 1);
    }
  });

  localStorage.setItem("diceBag", JSON.stringify(diceBag));
  
  displayDice(false);
}

/******************************************************************************
 * DISPLAY TRADE MODAL
 * Show modal for die trade
 *****************************************************************************/
function displayTradeModal(btn) {

  let modal = document.querySelector('.modal');
  let oldDie = document.querySelector('#tradeDieDiv');
  let oldDieId = btn.parentNode.parentNode.dataset.id;
  let oldDieSides = btn.parentNode.parentNode.dataset.sides;
  let oldDieColor = btn.parentNode.parentNode.dataset.color;
  let oldDieNumColor = btn.parentNode.parentNode.dataset.numcolor;

  oldDie.dataset.id = oldDieId;
  oldDie.innerText = oldDieSides;
  oldDie.style.backgroundColor = oldDieColor;
  oldDie.style.color = oldDieNumColor;

  let numSidesTradeInput = document.querySelector('#tradeModalTable #numSidesTradeInput');
  let dieColorTradeInput = document.querySelector('#tradeModalTable #dieColorTradeInput');
  let sidesColorTradeInput = document.querySelector('#tradeModalTable #sidesColorTradeInput');

  numSidesTradeInput.value = oldDieSides;
  dieColorTradeInput.value = oldDieColor;
  sidesColorTradeInput.value = oldDieNumColor;
  
  modal.style.display = 'block';
}

/******************************************************************************
 * TRADE DIE
 * Exchange selected die with new die in localstorage
 *****************************************************************************/
function tradeDie() {
  
  let newSides = document.querySelector('#tradeModalTable #numSidesTradeInput').value;
  let newColor = document.querySelector('#tradeModalTable #dieColorTradeInput').value;
  let newNumColor = document.querySelector('#tradeModalTable #sidesColorTradeInput').value;

  let newDie = new Die(newSides, newColor, newNumColor);

  let oldDieId = document.querySelector('#tradeDieDiv').dataset.id;
  let diceBag = JSON.parse(localStorage.getItem("diceBag"));

  diceBag.some((die, index) => {
    if(die.id == oldDieId) {
      diceBag[index] = newDie;
    }
  });

  localStorage.setItem("diceBag", JSON.stringify(diceBag));
  closeModal();
  displayDice(false);
}
