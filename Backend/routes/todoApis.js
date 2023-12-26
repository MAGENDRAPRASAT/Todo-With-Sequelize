const express = require('express')
//const mongoose = require('mongoose')
const routes = express.Router()
//const Todo = require('../models/todoShcema')
//const { getAll, createTodo, updateTodo, deleteTodo } = require('../mysqlConnectionPool/database')
const { Todos } = require('../models/todoSequlizeModel')



routes.post('/create', async (req, res) => {
    try {
        const todo = await Todos.create(req.body)

        if (todo) {
             res.status(200).json({ message: "Todo added successfully" })
        }
    }
    catch (error) {
         res.status(400).json({ message: "Failed to add todo", error: error.message })
    }
})



routes.get('/all', async (req, res) => {
    try {
        const todos = await Todos.findAll()
        res.send(todos)
    }
    catch (error) {
        res.status(404).json({ message: "Failed to get todos", error: error.message })
    }
})


routes.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await Todos.destroy({
            where: {
                id: req.params.id
            }
        })
        if (todo) {
             res.status(200).json({ message: "Todo deleted successfully" })
        }
    }
    catch (error) {
        res.status(404).json({ message: "Failed to delete todo", error: error.message })
    }
})

routes.put('/update/:id', async (req, res) => {
    try {
        let todo;
        if (req.body.todo && req.body.completed) {
            todo = await Todos.update({ "todo": req.body.todo, 'completed': req.body.completed }, {
                where: {
                    id: req.params.id
                }
            })

        }
        else if (req.body.completed != null) {
            todo = await Todos.update({ "completed": req.body.completed }, {
                where: {
                    id: req.params.id
                }
            })

        }
        else if (req.body.todo) {
            todo = await Todos.update({ "todo": req.body.todo }, {
                where: {
                    id: req.params.id
                }
            })
        }

        if (todo) {
            return res.status(200).json({ message: "Todo updated successfully" })
        }
    }
    catch (error) {
        res.status(404).json({ message: "Failed to update todo", error: error.message })
    }
})


module.exports = routes