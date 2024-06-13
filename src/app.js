document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoModal = document.getElementById('todo-modal');
    const closeModalButton = document.querySelector('.close');
    const modalForm = document.getElementById('modal-form');
    let currentTaskElement;

       // Abrir el modal al hacer clic en el botón de crear tarea
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentTaskTitle = todoInput.value.trim(); // Guardar el título de la tarea temporalmente
        todoModal.style.display = 'block'; // Abrir el modal
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', () => {
        todoModal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target == todoModal) {
            todoModal.style.display = 'none';
        }
    });

    // Manejar la submit del formulario del modal
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-date').value;
        const taskNotes = document.getElementById('task-notes').value.trim();
        if (currentTaskTitle) {
            // Crear la tarjeta de tarea después de guardar los detalles en el modal
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${currentTaskTitle}</span>
                <button class="delete">X</button>
            `;
            const taskDetails = document.createElement('div');
            taskDetails.innerHTML = `
                <p>Date: ${taskDate}</p>
                <p>Notes: ${taskNotes}</p>
            `;
            li.appendChild(taskDetails);
            todoList.appendChild(li); // Agregar la tarjeta a la lista de tareas
            currentTaskTitle = ''; // Limpiar la variable temporal
            todoInput.value = ''; // Limpiar el campo de entrada
            todoModal.style.display = 'none'; // Cerrar el modal
        }
    });
});