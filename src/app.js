document.addEventListener('DOMContentLoaded', () => {
    console.log('Document is ready');

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
        console.log(`Opening modal for task: ${currentTaskTitle}`);
        todoModal.classList.add('show'); // Agregar la clase 'show' para mostrar el modal
    });

    // Mostrar/ocultar el menú de categorías
    categoryButton.addEventListener('click', () => {
        categoryMenu.style.display = categoryMenu.style.display === 'block' ? 'none' : 'block';
        console.log(`Category menu ${categoryMenu.style.display === 'block' ? 'opened' : 'closed'}`);
    });

    // Seleccionar categoría
    categoryMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-option')) {
            selectedCategory = e.target.dataset.category;
            categoryButton.textContent = `Category: ${e.target.textContent}`;
            categoryMenu.style.display = 'none';
            console.log(`Selected category: ${selectedCategory}`);
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
            <div class="task-header">
                <span class="task-title">${currentTaskTitle}</span>
                <span class="task-category">${selectedCategory}</span>
                ${taskFrequency !== 'once' ? `<span class="task-frequency"><i class="fas fa-sync-alt"></i> ${taskFrequency}</span>` : ''}
                <div class="button-container">
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    <button class="confirm"><i class="fas fa-check"></i></button>
                </div>
            </div>
            <div class="task-details">
                <p><i class="fas fa-calendar-alt"></i> ${taskDate}</p>
                ${taskNotes ? `<p><i class="fas fa-sticky-note"></i> ${taskNotes}</p>` : ''}
            </div>
        `;
        todoList.appendChild(li);
        console.log(`Task added: ${currentTaskTitle}, Date: ${taskDate}, Notes: ${taskNotes}, Frequency: ${taskFrequency}, Category: ${selectedCategory}`);

        // Limpiar el formulario del modal y cerrar el modal
        modalForm.reset();
        todoModal.classList.remove('show'); // Remover la clase 'show' para ocultar el modal
        selectedCategory = '';
        categoryButton.textContent = 'Select Category';
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    const closeModalButton = document.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        todoModal.classList.remove('show'); // Remover la clase 'show' para ocultar el modal
        console.log('Modal closed');
    });

    // Cerrar el modal al hacer clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === todoModal) {
            todoModal.classList.remove('show'); // Remover la clase 'show' para ocultar el modal
            console.log('Modal closed by clicking outside');
        }
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const toggleMode = document.getElementById('toggle-mode');
    const modeLabel = document.getElementById('mode-label');
    const todoList = document.getElementById('todo-list');

    toggleMode.addEventListener('change', () => {
        if (toggleMode.checked) {
            modeLabel.textContent = 'Shopping List on';
            todoList.classList.add('shopping-list-mode');
            console.log('Switched to Shopping List mode');
        } else {
            modeLabel.textContent = 'To-Do Mode';
            todoList.classList.remove('shopping-list-mode');
            console.log('Switched to To-Do mode');
        }
    });
});
