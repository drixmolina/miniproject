import { createContext, useState, useContext } from 'react'

const TodoContext = createContext()

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage on initialization
    const saved = localStorage.getItem('contextTodos')
    return saved ? JSON.parse(saved) : []
  })

  // Save to localStorage whenever todos change
  const addTodo = (text) => {
    if (text.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    }
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    localStorage.setItem('contextTodos', JSON.stringify(updatedTodos))
  }

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    localStorage.setItem('contextTodos', JSON.stringify(updatedTodos))
  }

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)
    localStorage.setItem('contextTodos', JSON.stringify(updatedTodos))
  }

  const clearCompleted = () => {
    const updatedTodos = todos.filter(todo => !todo.completed)
    setTodos(updatedTodos)
    localStorage.setItem('contextTodos', JSON.stringify(updatedTodos))
  }

  const value = {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
    clearCompleted,
    totalTodos: todos.length,
    completedCount: todos.filter(t => t.completed).length
  }

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  )
}

export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider')
  }
  return context
}
