import { Todo } from './Todo.js';

let table = document.querySelector('table');
let input = document.querySelector('#new-task');
let addInput = document.querySelector('#add-task');

displayTodoList();

/*****************************************************************
 * EVENT LISTENERS
 ****************************************************************/
 addInput.addEventListener('touchend', () => {
  addTodoItemToLocalStorage();
  displayTodoList();
});

/*****************************************************************
 * ADD TODO ITEM TO LOCAL STORAGE
 ****************************************************************/
function addTodoItemToLocalStorage() {
  
  let todoItem = new Todo(input.value);
  let todoListBucket = localStorage.getItem("todoList");

  if (todoListBucket == undefined) {
    todoListBucket = []
    todoListBucket.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  }
  else {
    todoListBucket = JSON.parse(todoListBucket);
    todoListBucket.push(todoItem);
    localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  }
}

/*****************************************************************
 * REMOVE TODO ITEM FROM LOCAL STORAGE
 ****************************************************************/
 function removeTodoItemFromLocalStorage(target) {

  let todoListBucket = JSON.parse(localStorage.getItem("todoList"));
  let todoItemRow = target.parentNode.parentNode;
  let todoItemId = todoItemRow.classList[0];
  todoItemRow.parentNode.removeChild(todoItemRow);

  todoListBucket.findIndex((todoItem, index) => {
    if (todoItem.Id == todoItemId) {
      todoListBucket.splice(index, 1);
      return -1;
    }
  });

  localStorage.setItem("todoList", JSON.stringify(todoListBucket));
}

/*****************************************************************
 * DISPLAY TODO LIST
 ****************************************************************/
function displayTodoList() {

  let todoListBucket = JSON.parse(localStorage.getItem("todoList"));
  if (todoListBucket == undefined) {
    todoListBucket = []
  }
  table.innerHTML = '';
  
  todoListBucket.forEach(todoItem => {
    table.innerHTML +=
      `
      <tr class="${todoItem.Id}">
        <td><input type="checkbox" class=${todoItem.Id}></td>
        <td>${todoItem.Content}</td>
        <td class="${todoItem.Id} delete"><button>Delete</button></td>
      </tr>
       `
  });
  addListenersToDeleteButtons()
}

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




// let item = new Todo("Wash dishes");
// localStorage.setItem("todoList", JSON.stringify(item));

// let todoList = [];

// todoList.push(JSON.parse(localStorage.getItem("todoList")));

// console.log(todoList);



  // let todoItem = new Todo(input.value);
  // let todoListBucket = localStorage.getItem("todoList");

  // if (todoListBucket == undefined) {
  //   todoListBucket = []
  //   todoListBucket.push(todoItem);
  //   localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  // }
  // else {
  //   todoListBucket = JSON.parse(todoListBucket);
  //   todoListBucket.push(todoItem);
  //   localStorage.setItem("todoList", JSON.stringify(todoListBucket));
  // }

  
  // table.innerHTML = '';
  
  // todoListBucket.forEach(todoItem => {
  //   table.innerHTML +=
  //     `
  //     <tr class=${todoItem.Id}>
  //       <td><input type="checkbox" class=${todoItem.Id}></td>
  //       <td>${todoItem.Content}</td>
  //       <td class=${todoItem.Id}><button>delete</button></td>
  //     </tr>

  //      `
    
  // //   let li = document.createElement('li');
  // //   li.setAttribute('id', todoItem.Id)
  // //   li.appendChild(document.createTextNode(todoItem.Content));
  // //   ul.appendChild(li);
  //   // let cb = document.createElement('input');
  //   // cb.type = "checkbox";
  //   // cb.id = todoItem.Id;
  //   // ul.appendChild(cb);
    
  //   // let label = document.createElement('label');
  //   // label.htmlFor = todoItem.Id;
  //   // label.appendChild(document.createTextNode(todoItem.Content));
  //   // ul.appendChild(label);
    
  //   // let bt = document.createElement('button');
  //   // bt.innerHTML = 'delete';
  //   // ul.appendChild(bt);
  //   // ul.appendChild(document.createElement('br'));



