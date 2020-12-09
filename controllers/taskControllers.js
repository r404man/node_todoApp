const { result } = require('lodash');
const Task = require('../models/task');

// @route localhost/
// @desc Add :id task 
const createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        task.save()
        res.redirect('/')
    } catch (err) {
        console.error(err);
        res.status(500).render('error/500');
    }
}

// @route localhost/
// @desc Show all tasks
const showTask = async (req, res) => {
    try {
        const result = await Task.find().sort({ createdAt: -1 })
        res.render('index', { tasks: result });

    } catch (err) {
        console.error(err);
        res.status(400).render('error/400');
    }
}

// @route localhost/:id
// @desc Delete :id task 
const deleteTask = async (req, res) => {
    try {
        await Task.remove({ _id: req.params.id });
        res.redirect('/');

    } catch (err) {
        console.error(err);
        res.status(500).render('errors/500');
    }
}

// @route localhost/:id
// @desc Put :id task 
const editTask = async (req, res) => {

    try {
        let task = await Task.findById(req.params.id).lean()

        if (!task) {
            return res.status(404).render('errors/404');
        }
        else {

            task = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
                new: true,
                runValidators: true,
            });
            res.redirect('/');
        }

    } catch (err) {
        console.error(err);
        res.status(500).render('errors/500');
    }
}


module.exports = {
    createTask,
    showTask,
    deleteTask,
    editTask,
}
