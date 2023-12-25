import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useStore from '../stores/TodoActionStore'

const NewItems = () => {
  const [todo, setTodo] = useState('')
  const { setTodoAdded } = useStore((state) => ({ setTodoAdded: state.setTodoAdded }))

  async function handleSubmit() {
    if (todo) {
      try {
        const response = await axios.post('http://localhost:3000/todo/create', { todo })
        if (response) {
          console.log("Todo added successfully");
          setTodoAdded()
          setTodo('')
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className='new-todo'>
      <div className='todo-input'>
        <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)}></input>
      </div>
      <div className='add-todo'>
        <button onClick={() => { handleSubmit() }}>add todo</button>
      </div>
    </div>
  )
}

export default NewItems