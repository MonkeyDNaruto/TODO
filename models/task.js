const mongoose = require('mongoose');

// creating Schema for tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },    
    date: {
        type: Date,
        required: true
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;