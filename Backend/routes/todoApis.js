const express = require('express')
const mongoose = require('mongoose')
const routes = express.Router()
const Todo = require('../models/todoShcema')
const { getAll, createTodo, updateTodo, deleteTodo } = require('../mysqlConnectionPool/database')



routes.post('/create', async (req, res) => {
    try {
        const todo = await createTodo(req.body.todo)
        if (todo) {
            return res.status(200).json({ message: "Todo added successfully" })
        }
    }
    catch (error) {
        return res.status(400).json({ message: "Failed to add todo", error: error.message })
    }
})

routes.get('/all', async (req, res) => {
    try {
        const todos = await getAll()
        res.send(todos)
    }
    catch (error) {
        res.status(404).json({ message: "Failed to get todos", error: error.message })
    }
})


routes.delete('/delete/:id', async (req, res) => {
    try {
        const todo = await deleteTodo(req.params.id)
        if (todo==1) {
            return res.status(200).json({ message: "Todo deleted successfully" })
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
            todo = await updateTodo({ "title": req.body.todo, "id": req.params.id, 'completed': String(req.body.completed) })
            console.log(todo);
        }
        else if (req.body.completed != null) {
            todo = await updateTodo({ "completed": String(req.body.completed), "id": req.params.id })
            console.log(todo);
        }
        else if (req.body.todo) {
            todo = await updateTodo({ "title": req.body.todo, "id": req.params.id })
        }

        if (todo == 1) {
            return res.status(200).json({ message: "Todo updated successfully" })
        }
    }
    catch (error) {
        res.status(404).json({ message: "Failed to update todo", error: error.message })
    }
})


module.exports = routes