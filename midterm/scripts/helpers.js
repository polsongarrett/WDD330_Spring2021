import { Todo } from './Todo.js';

let table = document.querySelector('table');
let input = document.querySelector('#new-task');
let addInput = document.querySelector('#add-task');
let allFilter = document.querySelector('#all');
let activeFilter = document.querySelector('#active');
let completeFilter = document.querySelector('#complete');
let count = document.querySelector('#count');

displayTodoList();

/*****************************************************************
 * ALL FILTER EVENT LISTENER
 ****************************************************************/
allFilter.addEventListener('touchend', () => {
  displayTodoList();
});

/*****************************************************************
 * ACTIVE FILTER EVENT LISTENER
 ****************************************************************/
activeFilter.addEventListener('touchend', () => {
  displayTodoList(true);
});

/*****************************************************************
 * COMPLETE FILTER EVENT LISTENER
 ****************************************************************/
completeFilter.addEventListener('touchend', () => {
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
  del.forEach(btn => {
    btn.addEventListener('touchend', event => {
      removeTodoItemFromLocalStorage(event.target);
      displayTodoList();
    });
  });
}

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

  // get a new array based on filter paramter
  switch(filterForActive) {
    case undefined:
      count.innerText = "Total tasks:";
      break;

    case true:
      todoListBucket = todoListBucket.filter(todoItem => {
        return (todoItem.Completed == false)
      });
      count.innerText = "Active tasks:";
      break;
      
    case false:
      todoListBucket = todoListBucket.filter(todoItem => {
        return (todoItem.Completed == true)
      });
      count.innerText = "Completed tasks:";
      break;
  }

  if(todoListBucket == undefined) {
    todoListBucket = []
  }

  table.innerHTML = '';
  let sum = 0;

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
  
  count.innerText += (' ' + sum);
  addListenersToDeleteButtons();
  addListenersToCheckboxes();
  handleCheckboxes(todoListBucket);
}

/*****************************************************************
 * ADD TODO ITEM TO LOCAL STORAGE
 ****************************************************************/
function addTodoItemToLocalStorage() {
  
  let todoItem = new Todo(input.value);
  let todoListBucket = localStorage.getItem("todoList");

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
  input.value = '';
}

/*****************************************************************
 * REMOVE TODO ITEM FROM LOCAL STORAGE
 ****************************************************************/
function removeTodoItemFromLocalStorage(target) {

  let todoListBucket = JSON.parse(localStorage.getItem("todoList"));
  let todoItemRow = target.parentNode.parentNode;
  let todoItemId = todoItemRow.classList[0];
  todoItemRow.parentNode.removeChild(todoItemRow);

  todoListBucket.some((todoItem, index) => {
    if(todoItem.Id == todoItemId) {
      todoListBucket.splice(index, 1);
    }
  });

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
  }
  else {
    nextSibling.style.textDecorationLine = 'none';
    setAsCompleteIncomplete(currentTd.classList[0], false);
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