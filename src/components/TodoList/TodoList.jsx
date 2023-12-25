import React, { useEffect } from 'react'
import TodoListItems from './TodoListItems/TodoListItems'
import axios from 'axios'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import useStore from '../../stores/TodoActionStore'


const TodoList = () => {
  const queryClient = useQueryClient()
  const { Todos, setTodos, todoAdded } = useStore((state) => ({ Todos: state.Todos, setTodos: state.setTodos, todoAdded: state.todoAdded }))
  
  const fetchData = async () => {
    const { data } = await axios.get('http://localhost:3000/todo/all')
    return data
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });

  useEffect(() => {
    setTodos(data)
  }, [data])

  useEffect(() => {
    console.log(todoAdded);
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }, [todoAdded])


  return (
    <>
      {Todos && Todos.map((todo) => {
        return <TodoListItems key={todo._id} todo={todo} />
      })}
    </>
  )
}

export default TodoList