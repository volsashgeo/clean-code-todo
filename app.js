//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task'); //Add a new task.
const addButton = document.getElementsByTagName('button')[0]; //first button
const incompleteTasksList = document.getElementById('incompleteTasks'); //ul of #incompleteTasks
const completedTasksList = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
const createNewTask = function (taskString) {
  const newTask = document.createElement('li');

  //input (checkbox)
  const checkBox = document.createElement('input'); //checkbx
  //label
  const label = document.createElement('label'); //label
  //input (text)
  const editInput = document.createElement('input'); //text
  //button.edit
  const editButton = document.createElement('button'); //edit button

  //button.delete
  const deleteButton = document.createElement('button'); //delete button
  const deleteButtonImg = document.createElement('img'); //delete button image

  label.innerText = taskString;
  label.className = 'task';

  //Each elements, needs appending
  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  newTask.appendChild(checkBox);
  newTask.appendChild(label);
  newTask.appendChild(editInput);
  newTask.appendChild(editButton);
  newTask.appendChild(deleteButton);
  return newTask;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const task = createNewTask(newTaskInput.value);

  //Append task to incompleteTasksList
  incompleteTasksList.appendChild(task);
  bindTaskEvents(task, markTaskCompleted);

  newTaskInput.value = '';
};

//Edit an existing task.

const toggleEditMode = function () {
  const taskToEdit = this.parentNode;

  const editInput = taskToEdit.querySelector('input[type=text]');
  const label = taskToEdit.querySelector('label');
  const editBtn = taskToEdit.querySelector('.edit');
  const isEditMode = taskToEdit.classList.contains('editMode');
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  //toggle .editmode on the parent.
  taskToEdit.classList.toggle('editMode');
};

//Delete task.
const deleteTask = function () {
  const taskToDelete = this.parentNode;
  const ul = taskToDelete.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskToDelete);
};

//Mark task completed
const markTaskCompleted = function () {
  //Append the task list item to the #completed-tasks
  const taskToComplete = this.parentNode;
  completedTasksList.appendChild(taskToComplete);
  bindTaskEvents(taskToComplete, markTaskIncomplete);
};

const markTaskIncomplete = function () {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskToIncomplete = this.parentNode;
  incompleteTasksList.appendChild(taskToIncomplete);
  bindTaskEvents(taskToIncomplete, markTaskCompleted);
};

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, toggleHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  //Bind toggleEditMode to edit button.
  editButton.onclick = toggleEditMode;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind markTaskCompleted to toggleHandler.
  checkBox.onchange = toggleHandler;
};

const bindEventsToAllTasks = function (taskList, toggleHandler) {
  for (let i = 0; i < taskList.children.length; i++) {
    bindTaskEvents(taskList.children[i], toggleHandler);
  }
};

bindEventsToAllTasks(incompleteTasksList, markTaskCompleted);
bindEventsToAllTasks(completedTasksList, markTaskIncomplete);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
