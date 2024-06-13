document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const todoModal = document.getElementById('todo-modal');
    const modalForm = document.getElementById('modal-form');
    const categoryButton = document.getElementById('category-button');
    const categoryMenu = document.getElementById('category-menu');
    let selectedCategory = '';

    // Abrir el modal al hacer clic en el botón de crear tarea
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentTaskTitle = todoInput.value.trim();
        document.getElementById('modal-title').textContent = currentTaskTitle;
        todoModal.style.display = 'block';
    });

    // Mostrar/ocultar el menú de categorías
    categoryButton.addEventListener('click', () => {
        categoryMenu.style.display = categoryMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Seleccionar categoría
    categoryMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-option')) {
            selectedCategory = e.target.dataset.category;
            categoryButton.textContent = `Category: ${e.target.textContent}`;
            categoryMenu.style.display = 'none';
        }
    });

    // Manejar la submit del formulario del modal
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-datetime').value;
        const taskNotes = document.getElementById('task-notes').value.trim();
        const currentTaskTitle = document.getElementById('modal-title').textContent;
        const taskFrequency = document.getElementById('task-frequency').value;

        // Crear la tarjeta de tarea
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <span>${currentTaskTitle}</span>
                <span class="category">${selectedCategory}</span>
                <button class="delete">X</button>
            </div>
            <div>
                <p>Date: ${taskDate}</p>
                <p>Notes: ${taskNotes}</p>
                <p>Frequency: ${taskFrequency}</p>
            </div>
        `;
        todoList.appendChild(li);

        // Limpiar el formulario del modal y cerrar el modal
        modalForm.reset();
        todoModal.style.display = 'none';
        selectedCategory = '';
        categoryButton.textContent = 'Select Category';
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    const closeModalButton = document.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        todoModal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === todoModal) {
            todoModal.style.display = 'none';
        }
    });
});
