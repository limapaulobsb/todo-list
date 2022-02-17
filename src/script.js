import startObserver from './observer.js';

// ===> Start Global Variables <===

const date = new Date();
const responsiveBreakPoint = 500;

// ===> End Global Variables <===
// ===> Start Function Declarations <===

function adaptByWindowWidth() {
  function setDate(options) {
    const dateElem = document.getElementById('current-date');
    dateElem.innerText = date.toLocaleDateString('en-US', options);
  }

  if (window.innerWidth >= responsiveBreakPoint) {
    setDate({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  } else {
    setDate();
  }
}

function loadList() {
  const list = JSON.parse(localStorage.getItem('todos'));
  if (list) {
    let isCompleted;
    const listElem = document.getElementById('todo-list');

    list.forEach((item) => {
      const newTodo = document.createElement('li');
      newTodo.className = 'todo';
      [newTodo.innerText, isCompleted] = item;
      if (isCompleted) newTodo.classList.add('completed');
      newTodo.tabIndex = 0;
      listElem.appendChild(newTodo);
    });
  }
}

function saveList() {
  const todoElems = document.querySelectorAll('.todo');
  const list = [];
  todoElems.forEach((el) => list.push([el.innerText, el.matches('.completed')]));
  localStorage.setItem('todos', JSON.stringify(list));
  alert('List saved!');
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
  if (target.matches('.completed')) target.classList.remove('completed');
  else target.classList.add('completed');
}

function insertTodo() {
  const inputElem = document.getElementById('description-input');
  const listElem = document.getElementById('todo-list');
  const newTodo = document.createElement('li');
  newTodo.className = 'todo';
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
  const listElem = document.getElementById('todo-list');
  while (listElem.hasChildNodes()) {
    listElem.removeChild(listElem.firstElementChild);
  }
}

// ===> End Function Declarations <===
// ===> Start Onload Events and Listeners setup <===

window.onload = () => {
  startObserver();
  adaptByWindowWidth();
  loadList();

  document.addEventListener('click', ({ target }) => {
    if (target.matches('li')) {
      if (target.matches('.selected')) toggleCompleted(target);
      else changeSelection(target);
    } else if (target.matches('body > div')) {
      clearSelection();
    }
  });

  document.addEventListener('keydown', ({ key, target }) => {
    if (key === 'Enter' && target.matches('li')) {
      if (target.matches('.selected')) toggleCompleted(target);
      else changeSelection(target);
    }
  });

  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const { value } = document.getElementById('description-input');
    if (value) insertTodo();
  });

  document.getElementById('move-up').addEventListener('click', moveUp);
  document.getElementById('move-down').addEventListener('click', moveDown);
  document.getElementById('remove-selected').addEventListener('click', removeSelected);
  document.getElementById('save-list').addEventListener('click', saveList);
  document.getElementById('remove-completed').addEventListener('click', removeCompleted);
  document.getElementById('remove-all').addEventListener('click', removeAll);
};

window.addEventListener('resize', adaptByWindowWidth);

// ===> End Onload Events and Listeners setup <===
