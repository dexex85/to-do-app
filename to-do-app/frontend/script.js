// frontend/script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from the server
    const loadTasks = async () => {
        const res = await fetch('/api/tasks');
        const tasks = await res.json();
        taskList.innerHTML = ''; // Clear the list
        tasks.forEach(task => renderTask(task));
    };

    // Render a single task
    const renderTask = (task) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.dataset.id = task.id;
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="toggle">✓</button>
            <button class="delete">x</button>
        `;

        // Toggle task completion
        li.querySelector('.toggle').addEventListener('click', async () => {
            await fetch(`/api/tasks/${task.id}`, { method: 'PATCH' });
            li.classList.toggle('completed');
        });

        // Delete task
        li.querySelector('.delete').addEventListener('click', async () => {
            await fetch(`/api/tasks/${task.id}`, { method: 'DELETE' });
            li.remove();
        });

        taskList.appendChild(li);
    };

    // Add a new task
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;

        const res = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const newTask = await res.json();
        renderTask(newTask);
        taskInput.value = '';
    });

    loadTasks(); // Load tasks when page loads
});
