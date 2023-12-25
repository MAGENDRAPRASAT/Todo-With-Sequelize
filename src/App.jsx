import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NewItems from './components/NewItems'
import TodoList from './components/TodoList/TodoList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient= new QueryClient()

function App() {

  return (
    <>
    <QueryClientProvider client={queryClient}>
     <NewItems/>
     <TodoList/>
     </QueryClientProvider>
    </>
  )
}

export default App
