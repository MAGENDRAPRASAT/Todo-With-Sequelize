import { create } from 'zustand'

const useStore = create((set) => ({
    Todos: [],
  setTodos: (todos) =>
    set((state) => ({
      Todos: todos,
    })),
  todoAdded: true,
  setTodoAdded: () =>
    set((state) => ({
    
      todoAdded: !state.todoAdded,
    })),
}));

export default useStore
