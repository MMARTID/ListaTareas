function setupModalEvents(todoList, showNotification) {
    const modalForm = document.getElementById('modal-form');
    const todoModal = document.getElementById('todo-modal');

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-datetime').value;
        const taskNotes = document.getElementById('task-notes').value.trim();
        const currentTaskTitle = document.getElementById('modal-title').textContent;
        const taskFrequency = document.getElementById('task-frequency').value;
        const selectedCategory = document.getElementById('category-button').textContent.replace('Category: ', '');

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
        todoModal.style.display = 'none'; // Ocultar el modal estableciendo 'display' a 'none'

        // Mostrar notificación al agregar una nueva tarea
        showNotification('New Task Added', {
            body: `Task: ${currentTaskTitle}`
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    const closeModalButton = document.querySelector('.close');
    closeModalButton.addEventListener('click', () => {
        todoModal.style.display = 'none'; // Ocultar el modal estableciendo 'display' a 'none'
        console.log('Modal closed');
    });

    // Cerrar el modal al hacer clic fuera del modal
    window.addEventListener('click', (e) => {
        if (e.target === todoModal) {
            todoModal.style.display = 'none'; // Ocultar el modal estableciendo 'display' a 'none'
            console.log('Modal closed by clicking outside');
        }
    });
}

module.exports = { setupModalEvents };
