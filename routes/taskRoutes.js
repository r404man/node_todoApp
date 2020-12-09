const express = require('express');
const taskController = require('../controllers/taskControllers');

const router = express.Router();

router.get('/', taskController.showTask);

router.post('/', taskController.createTask);

router.delete('/:id', taskController.deleteTask);

router.put('/:id', taskController.editTask);

module.exports = router;
