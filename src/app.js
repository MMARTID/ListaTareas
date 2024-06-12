document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoModal = document.getElementById('todo-modal');
    const closeModalButton = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    let currentTaskElement;

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskTitle = todoInput.value.trim();
        if (taskTitle) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${taskTitle}</span>
                <button class="delete">X</button>
            `;
            todoList.appendChild(li);
            todoInput.value = '';
            li.addEventListener('click', () => {
                currentTaskElement = li;
                todoModal.style.display = 'block';
            });
            li.querySelector('.delete').addEventListener('click', (e) => {
                e.stopPropagation();
                li.remove();
            });
        }
    });

    closeModalButton.addEventListener('click', () => {
        todoModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == todoModal) {
            todoModal.style.display = 'none';
        }
    });

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-date').value;
        const taskNotes = document.getElementById('task-notes').value.trim();
        if (currentTaskElement) {
            const taskDetails = document.createElement('div');
            taskDetails.innerHTML = `
                <p>Date: ${taskDate}</p>
                <p>Notes: ${taskNotes}</p>
            `;
            currentTaskElement.appendChild(taskDetails);
            todoModal.style.display = 'none';
        }
    });
});
