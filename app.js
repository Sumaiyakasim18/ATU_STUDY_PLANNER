/**
 * ATU Student Study Planner - Main Application Logic (Updated with Time & Enhanced Responsiveness)
 * Author: Sumaiya Kasim (Accra Technical University)
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Selectors
    const taskForm = document.getElementById('task-form');
    const taskTitleInput = document.getElementById('task-title');
    const taskSubjectSelect = document.getElementById('task-subject');
    const taskTimeInput = document.getElementById('task-time');
    const titleError = document.getElementById('title-error');
    const taskListContainer = document.getElementById('task-list');
    
    const totalTasksEl = document.getElementById('total-tasks');
    const completedTasksEl = document.getElementById('completed-tasks');
    const pendingTasksEl = document.getElementById('pending-tasks');
    const progressPercentageEl = document.getElementById('progress-percentage');
    const progressBarFill = document.getElementById('progress-bar-fill');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Application State
    let tasks = JSON.parse(localStorage.getItem('atu_study_tasks')) || [];
    let currentFilter = 'all';

    // Initialize Application
    initApp();

    function initApp() {
        loadThemePreference();
        renderTasks();
        updateStatistics();

        taskForm.addEventListener('submit', handleAddTask);

        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentFilter = e.target.getAttribute('data-filter');
                renderTasks();
            });
        });

        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    function handleAddTask(e) {
        e.preventDefault();
        const title = taskTitleInput.value.trim();
        const subject = taskSubjectSelect.value;
        const time = taskTimeInput.value;

        if (title === '') {
            titleError.style.display = 'block';
            taskTitleInput.focus();
            return;
        }
        titleError.style.display = 'none';

        // Format time nicely if provided (e.g., 14:30 -> 02:30 PM)
        let formattedTime = '';
        if (time) {
            const [hours, minutes] = time.split(':');
            const h = parseInt(hours, 10);
            const period = h >= 12 ? 'PM' : 'AM';
            const adjustedHours = h % 12 || 12;
            formattedTime = `${adjustedHours}:${minutes} ${period}`;
        }

        const newTask = {
            id: Date.now().toString(),
            title: title,
            subject: subject,
            dueTime: formattedTime,
            completed: false,
            createdAt: new Date().toISOString()
        };

        tasks.unshift(newTask);
        saveTasksToLocalStorage();

        // Reset form
        taskTitleInput.value = '';
        taskTimeInput.value = '';
        taskTitleInput.focus();

        renderTasks();
        updateStatistics();
    }

    window.toggleTaskCompletion = function(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        saveTasksToLocalStorage();
        renderTasks();
        updateStatistics();
    };

    window.deleteTask = function(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasksToLocalStorage();
        renderTasks();
        updateStatistics();
    };

    function renderTasks() {
        taskListContainer.innerHTML = '';

        let filteredTasks = tasks;
        if (currentFilter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        }

        if (filteredTasks.length === 0) {
            let emptyMessage = "No tasks found.";
            let emptySub = "Add a task using the form to get started!";
            if (currentFilter === 'pending') {
                emptyMessage = "No pending tasks!";
                emptySub = "All caught up on your studies.";
            } else if (currentFilter === 'completed') {
                emptyMessage = "No completed tasks yet.";
                emptySub = "Mark tasks as completed as you finish them.";
            }

            taskListContainer.innerHTML = `
                <div class="empty-state">
                    <span class="empty-icon">📚</span>
                    <h3>${emptyMessage}</h3>
                    <p>${emptySub}</p>
                </div>
            `;
            return;
        }

        filteredTasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            let timeHtml = task.dueTime ? `<span class="task-time-badge">⏰ Due: ${escapeHtml(task.dueTime)}</span>` : '';

            taskItem.innerHTML = `
                <div class="task-info">
                    <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                        onclick="toggleTaskCompletion('${task.id}')" aria-label="Mark task as completed">
                    <div class="task-details">
                        <span class="task-title-text">${escapeHtml(task.title)}</span>
                        <div class="task-meta">
                            <span class="task-subject-badge">${escapeHtml(task.subject)}</span>
                            ${timeHtml}
                        </div>
                    </div>
                </div>
                <button class="delete-btn" onclick="deleteTask('${task.id}')" aria-label="Delete task" title="Delete Task">
                    🗑️
                </button>
            `;
            taskListContainer.appendChild(taskItem);
        });
    }

    function updateStatistics() {
        const total = tasks.length;
        const completed = tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

        totalTasksEl.textContent = total;
        completedTasksEl.textContent = completed;
        pendingTasksEl.textContent = pending;
        progressPercentageEl.textContent = `${percentage}%`;
        progressBarFill.style.width = `${percentage}%`;
    }

    function saveTasksToLocalStorage() {
        try {
            localStorage.setItem('atu_study_tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Error saving tasks to Local Storage:", error);
        }
    }

    function toggleTheme() {
        const htmlEl = document.documentElement;
        const currentTheme = htmlEl.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('atu_study_theme', newTheme);
        themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    function loadThemePreference() {
        const savedTheme = localStorage.getItem('atu_study_theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    function escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
});