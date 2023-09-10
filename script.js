document.addEventListener('DOMContentLoaded', function () {
	// Get references to the necessary DOM elements
	const todoInput = document.getElementById('todoInput');
	const addTodoButton = document.getElementById('addTodo');
	const todoList = document.getElementById('todoList');

	// Event listener for adding a new todo
	addTodoButton.addEventListener('click', function () {
		// Get the text from the input field and remove leading/trailing spaces
		const todoText = todoInput.value.trim();
		if (todoText !== '') {
			// Create a new todo item (list item)
			const todoItem = document.createElement('li');
			todoItem.innerHTML = `
                <input type="checkbox">
                <span>${todoText}</span>
                <button class="delete-todo-button">Delete</button>
            `;
			// Add the todo item to the todo list
			todoList.appendChild(todoItem);
			// Clear the input field
			todoInput.value = '';
			// Update local storage with the new todo
			updateLocalStorage();
		}
	});

	// Event listener for marking a todo as completed
	todoList.addEventListener('change', function (event) {
		if (event.target.type === 'checkbox') {
			// Get the parent element (todo item)
			const todoItem = event.target.parentElement;
			// Toggle the 'completed' class to indicate completion status
			todoItem.classList.toggle('completed');
			// Update local storage with the updated completion status
			updateLocalStorage();
		}
	});

	// Event listener for deleting a todo
	todoList.addEventListener('click', function (event) {
		if (event.target.classList.contains('delete-todo-button')) {
			// Get the parent element (todo item)
			const todoItem = event.target.parentElement;
			// Remove the todo item from the DOM
			todoItem.remove();
			// Update local storage to reflect the deletion
			updateLocalStorage();
		}
	});

	// Function to update local storage with the current todo list state
	function updateLocalStorage() {
		const todos = [];
		// Iterate through each todo item in the list
		todoList.querySelectorAll('li').forEach(function (todoItem) {
			// Get the text and completion status of the todo
			const todoText = todoItem.querySelector('span').innerText;
			const isCompleted = todoItem.classList.contains('completed');
			// Add the todo to the list of todos
			todos.push({ text: todoText, completed: isCompleted });
		});
		// Store the list of todos in local storage as a JSON string
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	// Function to load todos from local storage and display them in the UI
	function loadTodosFromLocalStorage() {
		const todos = JSON.parse(localStorage.getItem('todos') || '[]');
		todos.forEach(function (todo) {
			const todoItem = document.createElement('li');
			todoItem.innerHTML = `
                <input type="checkbox" ${
									todo.completed ? 'checked' : ''
								}>
                <span>${todo.text}</span>
                <button class="delete-todo-button">Delete</button>
            `;
			if (todo.completed) {
				todoItem.classList.add('completed');
			}
			todoList.appendChild(todoItem);
		});
	}

	// Load todos from local storage when the page loads
	loadTodosFromLocalStorage();
});
