// routes/taskListRoutes.js
const express = require('express');
const router = express.Router();
const taskListController = require('../controllers/taskListController');

router.post('/', taskListController.createTaskList);
router.get('/', taskListController.getTaskLists);
router.get('/:id', taskListController.getTaskList);
router.put('/:id', taskListController.updateTaskList);
router.delete('/:id', taskListController.deleteTaskList);

module.exports = router;
