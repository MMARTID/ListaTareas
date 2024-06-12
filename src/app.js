document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Render todos
    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            };
            li.onclick = () => {
                todo.completed = !todo.completed;
                saveTodos();
                renderTodos();
            };
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    };

    // Save todos to localStorage
    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    // Add new todo
    form.onsubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            text: input.value,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        input.value = '';
    };

    // Initial render
    renderTodos();
});
