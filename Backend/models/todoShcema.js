const mongoose = require('mongoose')

const todo = new mongoose.Schema({
   todo: {
      type: String,
      required: true
   },
   completed: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
})

const Todo = mongoose.model("Todos", todo)

module.exports = Todo