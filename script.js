function loadList() {
  const list = JSON.parse(localStorage.getItem('todos'));
  if (list) {
    let isCompleted;
    const listElem = document.querySelector('ol');
    list.forEach((item) => {
      const newTodo = document.createElement('li');
      [newTodo.innerText, isCompleted] = item;
      if (isCompleted) newTodo.className = 'completed';
      newTodo.tabIndex = 0;
      listElem.appendChild(newTodo);
    });
  }
}

function saveList() {
  const todoElems = document.querySelectorAll('li');
  const list = [];
  todoElems.forEach((el) => {
    list.push([el.innerText, el.matches('.completed')]);
  });
  localStorage.setItem('todos', JSON.stringify(list));
  alert('Tarefas salvas!');
}

function changeSelection(target) {
  const todoElem = document.querySelector('.selected');
  if (todoElem) todoElem.classList.remove('selected');
  target.classList.add('selected');
}

function clearSelection() {
  const todoElem = document.querySelector('.selected');
  if (todoElem) todoElem.classList.remove('selected');
}

function toggleCompleted(target) {
  if (target.matches('.completed')) {
    target.classList.remove('completed');
  } else {
    target.classList.add('completed');
  }
}

function insertTodo() {
  const inputElem = document.querySelector('input');
  const listElem = document.querySelector('ol');
  const newTodo = document.createElement('li');
  newTodo.innerText = inputElem.value;
  newTodo.tabIndex = 0;
  listElem.appendChild(newTodo);
  inputElem.value = '';
}

function moveUp() {
  const todoElem = document.querySelector('.selected');
  if (todoElem && todoElem.previousElementSibling) {
    todoElem.previousElementSibling.before(todoElem);
  }
}

function moveDown() {
  const todoElem = document.querySelector('.selected');
  if (todoElem && todoElem.nextElementSibling) {
    todoElem.nextElementSibling.after(todoElem);
  }
}

function removeSelected() {
  const todoElem = document.querySelector('.selected');
  if (todoElem) todoElem.remove();
}

function removeCompleted() {
  const todoElems = document.querySelectorAll('.completed');
  todoElems.forEach((el) => el.remove());
}

function removeAll() {
  const listElem = document.querySelector('ol');
  while (listElem.hasChildNodes()) {
    listElem.removeChild(listElem.firstElementChild);
  }
}

window.addEventListener('load', loadList);

document.addEventListener('click', ({ target }) => {
  if (target.matches('li')) {
    if (target.matches('.selected')) toggleCompleted(target);
    else changeSelection(target);
  } else if (target.matches('body')) {
    clearSelection();
  }
});

document.addEventListener('keydown', ({ key, target }) => {
  if ((key === 'Enter' || key === ' ') && target.matches('li')) {
    if (target.matches('.selected')) toggleCompleted(target);
    else changeSelection(target);
  }
});

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  insertTodo();
});

document.getElementById('save-list').addEventListener('click', saveList);
document.getElementById('move-up').addEventListener('click', moveUp);
document.getElementById('move-down').addEventListener('click', moveDown);
document.getElementById('remove-selected').addEventListener('click', removeSelected);
document.getElementById('remove-completed').addEventListener('click', removeCompleted);
document.getElementById('remove-all').addEventListener('click', removeAll);
