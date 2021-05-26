import { Todo } from './Todo.js';

let table = document.querySelector('table');
let input = document.querySelector('#task-text');
let addInput = document.querySelector('#add-task');
let allFilter = document.querySelector('#all');
let activeFilter = document.querySelector('#active');
let completeFilter = document.querySelector('#complete');
let countType = document.querySelector('#count-type');
let count = document.querySelector('#count');
let invalid = document.querySelector('#invalid-input-td');
let status = "All";

displayTodoList();

/*****************************************************************
 * ALL FILTER EVENT LISTENER
 ****************************************************************/
allFilter.addEventListener('touchend', () => {
  status = "All";
  displayTodoList();
});

/*****************************************************************
 * ACTIVE FILTER EVENT LISTENER
 ****************************************************************/
activeFilter.addEventListener('touchend', () => {
  status = "Active";
  displayTodoList(true);
});

/*****************************************************************
 * COMPLETE FILTER EVENT LISTENER
 ****************************************************************/
completeFilter.addEventListener('touchend', () => {
  status = "Completed"
  displayTodoList(false);
});

/*****************************************************************
 * ADD INPUT EVENT LISTENER
 ****************************************************************/
addInput.addEventListener('touchend', () => {
  addTodoItemToLocalStorage();
  displayTodoList();
});

/*****************************************************************
 * ADD LISTENERS TO DELETE BUTTONS
 ****************************************************************/
function addListenersToDeleteButtons() {
  
  let del = document.querySelectorAll('.delete');

 // foreach loop on the node list
  del.forEach(btn => {
    btn.addEventListener('touchend', event => {
      removeTodoItemFromLocalStorage(event.target);
      displayTodoList();
    });
  });
}

// create function adds the listeners to the delete buttons
//   foreach loop on the node list
// define listener to call remove todo item function

/*****************************************************************
 * ADD LISTENERS TO CHECKBOXES
 ****************************************************************/
function addListenersToCheckboxes() {

  let cb = document.querySelectorAll("input[type='checkbox']"); 
  cb.forEach(element => {
    element.addEventListener('click', event => {
      markAsCompleteIncomplete(event);
    });
  });
}

/*****************************************************************
 * DISPLAY TODO LIST
 ****************************************************************/
function displayTodoList(filterForActive) {
  
  let todoListBucket = JSON.parse(localStorage.getItem("todoList"));

  // Set array to empty if nothing is in local storage
  if(todoListBucket == undefined) {
    todoListBucket = []
  }

  // Get a new array based on filter paramter
  // Set task count type 
  switch(filterForActive) {
    case undefined:
      countType.innerText = status + " tasks:";
      break;

    case true:
      todoListBucket = todoListBucket.filter(todoItem => {
        return (todoItem.Completed == false)
      });
      countType.innerText = status + " tasks:";
      break;
      
    case false:
      todoListBucket = todoListBucket.filter(todoItem => {
        return (todoItem.Completed == true)
      });
      countType.innerText = status + " tasks:";
      break;
  }

  table.innerHTML = '';
  let sum = 0;
  // Display todo items
  todoListBucket.forEach((todoItem, index) => {
    table.innerHTML +=
      `
      <tr class="${todoItem.Id} row${index}">
        <td class="${todoItem.Id} input"><input type="checkbox"></td>
        <td class="${todoItem.Id} content">${todoItem.Content}</td>
        <td class="${todoItem.Id} delete"><button>Delete</button></td>
      </tr>
       `;
    sum++;
  });
  
  // Set task count number
  count.innerText = sum;

  // Refresh listeners
  addListenersToDeleteButtons();
  addListenersToCheckboxes();
  handleCheckboxes(todoListBucket);
}

/*****************************************************************
 * ADD TODO ITEM TO LOCAL STORAGE
 ****************************************************************/
function addTodoItemToLocalStorage() {
  
  let todoItem = new Todo(input.value);

  // Validate input
  // Do not let user submit an empty input
  if (todoItem.Content == "") {
    invalid.innerText = "You can't create a blank task!";
    return;
  }
  else {
    invalid.innerText = "";
  }

  let todoListBucket = localStorage.getItem("todoList");
  // Add item to local storage
  // Determine if local storage is empty
  if(todoListBucket == undefined) {
    todoListBucket = []
    todoListBucket.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  }
  else {
    todoListBucket = JSON.parse(todoListBucket);
    todoListBucket.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  }
  // Empty input field
  input.value = '';
}

/*****************************************************************
 * REMOVE TODO ITEM FROM LOCAL STORAGE
 ****************************************************************/
function removeTodoItemFromLocalStorage(target) {

  let todoListBucket = JSON.parse(localStorage.getItem("todoList")); // get list from localstorage
  let todoItemRow = target.parentNode.parentNode;                    
  let todoItemId = todoItemRow.classList[0];

  // modify the array
  todoListBucket.some((todoItem, index) => {
    if(todoItem.Id == todoItemId) {
      todoListBucket.splice(index, 1);
    }
  });

  // set localstorage = to the new array
  localStorage.setItem("todoList", JSON.stringify(todoListBucket));
}

/*****************************************************************
 * MARK AS COMPLETE/INCOMPLETE
 ****************************************************************/
function markAsCompleteIncomplete(event) {

  let cb = event.target;
  let currentTd = cb.parentNode;
  let nextSibling = currentTd.nextElementSibling;

  if(cb.checked) {
    nextSibling.style.textDecorationLine = 'line-through';
    setAsCompleteIncomplete(currentTd.classList[0], true);

    // Update count 
    if(status == "Active") {
      currentTd.parentNode.remove();
      count.innerText = (Number(count.innerText)-1);
    }
  }
  else {
    nextSibling.style.textDecorationLine = 'none';
    setAsCompleteIncomplete(currentTd.classList[0], false);

    // Update count 
    if(status == "Completed") {
      currentTd.parentNode.remove();
      count.innerText = (Number(count.innerText)-1);
    }
  }
}

/*****************************************************************
 * SET AS COMPLETE/INCOMPLETE
 ****************************************************************/
function setAsCompleteIncomplete(itemId, isComplete) {

  let todoListBucket = JSON.parse(localStorage.getItem("todoList"));

  if(isComplete) {
    todoListBucket.some((todoItem) => {
      if (todoItem.Id == itemId) {
        todoItem.Completed = true;
      }
    });  
  }
  else {
    todoListBucket.some((todoItem) => {
      if (todoItem.Id == itemId) {
        todoItem.Completed = false;
      }
    });  
  }

  localStorage.setItem("todoList", JSON.stringify(todoListBucket));
}

/*****************************************************************
 * HANDLE CHECKBOXES
 ****************************************************************/
function handleCheckboxes(todoListBucket) {

  let cb = document.querySelectorAll("input[type='checkbox']");

  cb.forEach((element, index) => {
    if(todoListBucket[index].Completed) {
      element.click();
    }
  });
}