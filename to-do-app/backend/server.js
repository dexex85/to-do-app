// backend/server.js
const express = require('express');
const taskRoutes = require('./routes/tasks');
const app = express();
const port = 3000;

// Middleware to parse JSON data
app.use(express.json());
app.use(express.static('../frontend')); // Serve frontend

// Routes for tasks
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
