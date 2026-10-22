const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createCheckbox = () => {
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  return checkBox;
};

const createLabel = (text) => {
  const label = document.createElement('label');
  label.innerText = text;
  label.className = 'task-label';
  return label;
};

const createEditInput = () => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  return editInput;
};

const createEditButton = () => {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';
  return editButton;
};

const createDeleteButton = () => {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';

  const deleteIcon = document.createElement('img');
  deleteIcon.src = './remove.svg';

  deleteButton.appendChild(deleteIcon);
  return deleteButton;
};

const createNewTask = (taskString) => {
  const newTask = document.createElement('li');
  newTask.append(
    createCheckbox(),
    createLabel(taskString),
    createEditInput(),
    createEditButton(),
    createDeleteButton(),
  );
  return newTask;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const task = createNewTask(newTaskInput.value);

  incompleteTasksList.appendChild(task);
  bindTaskEvents(task, markTaskCompleted);

  newTaskInput.value = '';
};

const toggleEditMode = function () {
  const taskToEdit = this.parentNode;

  const editInput = taskToEdit.querySelector('input[type=text]');
  const label = taskToEdit.querySelector('label');
  const editBtn = taskToEdit.querySelector('.edit');
  const isEditMode = taskToEdit.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  taskToEdit.classList.toggle('editMode');
};

const deleteTask = function () {
  const taskToDelete = this.parentNode;
  const ul = taskToDelete.parentNode;
  ul.removeChild(taskToDelete);
};

const markTaskCompleted = function () {
  const taskToComplete = this.parentNode;

  completedTasksList.appendChild(taskToComplete);
  bindTaskEvents(taskToComplete, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  const taskToIncomplete = this.parentNode;

  incompleteTasksList.appendChild(taskToIncomplete);
  bindTaskEvents(taskToIncomplete, markTaskCompleted);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, toggleHandler) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleHandler;
};

const bindEventsToAllTasks = function (taskList, toggleHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], toggleHandler);
  }
};

bindEventsToAllTasks(incompleteTasksList, markTaskCompleted);
bindEventsToAllTasks(completedTasksList, markTaskIncomplete);
