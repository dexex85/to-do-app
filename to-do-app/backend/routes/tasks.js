// backend/routes/tasks.js
const express = require('express');
const fs = require('fs');
const router = express.Router();
const dataFile = './backend/data/tasks.json';

// Helper to read/write tasks
const readTasks = () => JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const writeTasks = (tasks) => fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));

// Get all tasks
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// Add a new task
router.post('/', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// Delete a task
router.delete('/:id', (req, res) => {
  const tasks = readTasks();
  const updatedTasks = tasks.filter(task => task.id !== parseInt(req.params.id));
  writeTasks(updatedTasks);
  res.status(200).json({ message: 'Task deleted' });
});

// Toggle task completion
router.patch('/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(task => task.id === parseInt(req.params.id));
  if (task) {
    task.completed = !task.completed;
    writeTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

module.exports = router;
