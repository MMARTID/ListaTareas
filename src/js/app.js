document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        todoForm: document.getElementById('todo-form'),
        todoInput: document.getElementById('todo-input'),
        todoList: document.getElementById('todo-list'),
        todoModal: document.getElementById('todo-modal'),
        modalForm: document.getElementById('modal-form'),
        categoryButton: document.getElementById('category-button'),
        categoryMenu: document.getElementById('category-menu'),
        toggleMode: document.getElementById('toggle-mode'),
        modeLabel: document.getElementById('mode-label'),
        filterButtons: document.querySelectorAll('.filter-button'),
        closeModalButton: document.querySelector('.close')
    };

    let selectedCategory = '';

    function requestNotificationPermission() {
        return new Promise((resolve, reject) => {
            if (!("Notification" in window)) {
                reject('Notifications not supported');
            } else if (Notification.permission === 'granted') {
                resolve();
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    permission === 'granted' ? resolve() : reject('Permission denied');
                });
            } else {
                reject('Permission denied');
            }
        });
    }

    function showNotification(title, options) {
        if ("Notification" in window && Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }

    function addTaskToList(title, date, notes, frequency, category) {
        const li = document.createElement('li');
        li.classList.add('task-card');
        if (category) {
            li.classList.add(`category-${category.toLowerCase()}`);
        }
        const frequencySpan = frequency !== 'once' ? `<span class="task-frequency"><i class="fas fa-sync-alt"></i> ${frequency}</span>` : '';
        const notesPara = notes ? `<p><i class="fas fa-sticky-note"></i> ${notes}</p>` : '';
        li.innerHTML = `
            <div class="task-header">
                <span class="task-title">${title}</span>
                <span class="task-category">${category}</span>
                ${frequencySpan}
                <div class="button-container">
                    <button class="delete"><i class="fas fa-trash-alt"></i></button>
                    <button class="confirm"><i class="fas fa-check"></i></button>
                </div>
            </div>
            <div class="task-details">
                <p><i class="fas fa-calendar-alt"></i> ${date}</p>
                ${notesPara}
            </div>
        `;
        elements.todoList.appendChild(li);

        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            console.log(`Task deleted: ${title}`);
        });

        li.querySelector('.confirm').addEventListener('click', () => {
            li.classList.toggle('completed');
            console.log(`Task completed: ${title}`);
        });

        console.log(`Task added: ${title}, Date: ${date}, Notes: ${notes}, Frequency: ${frequency}, Category: ${category}`);
    }

    function openModal(taskTitle) {
        document.getElementById('modal-title').textContent = taskTitle;
        elements.todoModal.classList.add('show');
    }

    function closeModal() {
        elements.todoModal.classList.remove('show');
    }

    elements.todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const currentTaskTitle = elements.todoInput.value.trim();
        openModal(currentTaskTitle);
        console.log(`Opening modal for task: ${currentTaskTitle}`);
    });

    elements.categoryButton.addEventListener('click', () => {
        elements.categoryMenu.style.display = elements.categoryMenu.style.display === 'block' ? 'none' : 'block';
        console.log(`Category menu ${elements.categoryMenu.style.display === 'block' ? 'opened' : 'closed'}`);
    });

    elements.categoryMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-option')) {
            selectedCategory = e.target.dataset.category;
            elements.categoryButton.textContent = `Category: ${e.target.textContent}`;
            elements.categoryMenu.style.display = 'none';
            console.log(`Selected category: ${selectedCategory}`);
        }
    });

    elements.modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskDate = document.getElementById('task-datetime').value;
        const taskNotes = document.getElementById('task-notes').value.trim();
        const currentTaskTitle = document.getElementById('modal-title').textContent;
        const taskFrequency = document.getElementById('task-frequency').value;
        
        addTaskToList(currentTaskTitle, taskDate, taskNotes, taskFrequency, selectedCategory);
        
        elements.modalForm.reset();
        closeModal();
        selectedCategory = '';
        elements.categoryButton.textContent = 'Select Category';

        showNotification('New Task Added', {
            body: `Task: ${currentTaskTitle}`
        });
    });

    elements.closeModalButton.addEventListener('click', () => {
        closeModal();
        console.log('Modal closed');
    });

    window.addEventListener('click', (e) => {
        if (e.target === elements.todoModal) {
            closeModal();
            console.log('Modal closed by clicking outside');
        }
    });

    elements.toggleMode.addEventListener('change', () => {
        const modeText = elements.toggleMode.checked ? 'Shopping List on' : 'To-Do Mode';
        elements.modeLabel.textContent = modeText;
        elements.todoList.classList.toggle('shopping-list-mode', elements.toggleMode.checked);
        console.log(`Switched to ${modeText}`);
    });

    elements.filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterCategory = button.getAttribute('data-filter');
            const allTasks = elements.todoList.querySelectorAll('li');
            allTasks.forEach(task => {
                const category = task.querySelector('.task-category').textContent.toLowerCase();
                task.style.display = (filterCategory === 'all' || category === filterCategory) ? 'block' : 'none';
            });
        });
    });

    requestNotificationPermission()
        .then(() => {
            console.log('Notification permission granted');
        })
        .catch(error => {
            console.error('Failed to get notification permission:', error);
        });
});
