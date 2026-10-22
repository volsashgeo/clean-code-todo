const newTaskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incompleteTasks');
const completedTasksList = document.getElementById('completed-tasks');

const createNewTask = function (taskString) {
  const newTask = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task-label';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  newTask.appendChild(checkBox);
  newTask.appendChild(label);
  newTask.appendChild(editInput);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);

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
