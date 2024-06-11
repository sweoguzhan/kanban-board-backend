// controllers/taskListController.js
const TaskList = require('../models/TaskListSchema');

exports.createTaskList = async (req, res) => {
    const { cardId, title, completed } = req.body;
    try {
        const newTaskList = await TaskList.create({ cardId, title, completed });
        res.status(201).json(newTaskList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskLists = async (req, res) => {
    try {
        const taskLists = await TaskList.find();
        res.status(200).json(taskLists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskList = async (req, res) => {
    const { id } = req.params;
    try {
        const taskList = await TaskList.findById(id);
        res.status(200).json(taskList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateTaskList = async (req, res) => {
    const { id } = req.params;
    const { cardId, title, completed } = req.body;
    try {
        const updatedTaskList = await TaskList.findByIdAndUpdate(
            id,
            { cardId, title, completed },
            { new: true }
        );
        res.status(200).json(updatedTaskList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteTaskList = async (req, res) => {
    const { id } = req.params;
    try {
        await TaskList.findByIdAndDelete(id);
        res.status(200).json({ message: 'TaskList deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
