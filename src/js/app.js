// app.js

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

    // Función para solicitar permiso de notificación
    function requestNotificationPermission() {
        if ("Notification" in window) {
            if (Notification.permission === 'granted') {
                return Promise.resolve();
            } else if (Notification.permission !== 'denied') {
                return Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Permission denied');
                    }
                });
            } else {
                return Promise.reject('Permission denied');
            }
        } else {
            return Promise.reject('Notifications not supported');
        }
    }

    // Función para mostrar la notificación
    function showNotification(title, options) {
        if ("Notification" in window) {
            if (Notification.permission === 'granted') {
                new Notification(title, options);
            }
        }
    }

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
        li.classList.add('task-card'); // Añadir clase general para estilos de tarjeta
        if (selectedCategory) {
            li.classList.add(`category-${selectedCategory.toLowerCase()}`); // Clase dinámica basada en la categoría seleccionada
        }
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

        // Mostrar notificación al agregar una nueva tarea
        showNotification('New Task Added', {
            body: `Task: ${currentTaskTitle}`
        });
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

    // Cambiar entre modos (To-Do y Lista de Compras)
    const toggleMode = document.getElementById('toggle-mode');
    const modeLabel = document.getElementById('mode-label');

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

    // Filtrar tareas por categoría
    const filterButtons = document.querySelectorAll('.filter-button');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterCategory = button.getAttribute('data-filter');
            const allTasks = document.querySelectorAll('#todo-list li');

            allTasks.forEach(task => {
                const category = task.querySelector('.task-category').textContent.toLowerCase();
                if (filterCategory === 'all' || category === filterCategory) {
                    task.style.display = 'block';
                } else {
                    task.style.display = 'none';
                }
            });
        });
    });

    // Solicitar permiso de notificación al cargar la página
    requestNotificationPermission()
        .then(() => {
            console.log('Notification permission granted');
        })
        .catch((error) => {
            console.error('Failed to get notification permission:', error);
        });

});
