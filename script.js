document.addEventListener('DOMContentLoaded', function () {
	const todoInput = document.getElementById('todoInput');
	const addTodoButton = document.getElementById('addTodo');
	const todoList = document.getElementById('todoList');

	addTodoButton.addEventListener('click', function () {
		const todoText = todoInput.value.trim();
		if (todoText !== '') {
			const todoItem = document.createElement('li');
			todoItem.innerHTML = `
                <input type="checkbox">
                <span>${todoText}</span>
                <button class="delete">Delete</button>
            `;
			todoList.appendChild(todoItem);
			todoInput.value = '';
			updateLocalStorage();
		}
	});

	todoList.addEventListener('change', function (event) {
		if (event.target.type === 'checkbox') {
			const todoItem = event.target.parentElement;
			todoItem.classList.toggle('completed');
			updateLocalStorage();
		}
	});

	todoList.addEventListener('click', function (event) {
		if (event.target.classList.contains('delete')) {
			const todoItem = event.target.parentElement;
			todoItem.remove();
			updateLocalStorage();
		}
	});

	function updateLocalStorage() {
		const todos = [];
		todoList.querySelectorAll('li').forEach(function (todoItem) {
			const todoText = todoItem.querySelector('span').innerText;
			const isCompleted = todoItem.classList.contains('completed');
			todos.push({ text: todoText, completed: isCompleted });
		});
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	function loadTodosFromLocalStorage() {
		const todos = JSON.parse(localStorage.getItem('todos') || '[]');
		todos.forEach(function (todo) {
			const todoItem = document.createElement('li');
			todoItem.innerHTML = `
                <input type="checkbox" ${
									todo.completed ? 'checked' : ''
								}>
                <span>${todo.text}</span>
                <button class="delete">Delete</button>
            `;
			if (todo.completed) {
				todoItem.classList.add('completed');
			}
			todoList.appendChild(todoItem);
		});
	}

	loadTodosFromLocalStorage();
});
