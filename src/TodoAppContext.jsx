import { useState } from 'react'
import { useTodos } from './context/TodoContext'
import './TodoAppContext.css'

export default function TodoAppWithContext() {
  const { todos, addTodo, removeTodo, toggleTodo, clearCompleted, totalTodos, completedCount } = useTodos()
  const [input, setInput] = useState('')

  const handleAddTodo = () => {
    if (input.trim()) {
      addTodo(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className="todo-context-container">
      <div className="todo-context-app">
        <h1>📝 Todo List (Context API)</h1>
        <p className="subtitle">Global state management without props drilling</p>
        
        <div className="input-group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button onClick={handleAddTodo} className="add-btn">
            Add
          </button>
        </div>

        <div className="todo-stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{totalTodos}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Completed:</span>
            <span className="stat-value">{completedCount}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Remaining:</span>
            <span className="stat-value">{totalTodos - completedCount}</span>
          </div>
        </div>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">No tasks yet. Create one using Context API! 🚀</p>
          ) : (
            todos.map(todo => (
              <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {completedCount > 0 && (
          <button onClick={clearCompleted} className="clear-btn">
            Clear Completed ({completedCount})
          </button>
        )}

        <div className="context-info">
          <h3>✨ About Context API</h3>
          <p>
            This Todo app uses React Context API to manage state globally. No props drilling needed!
            The TodoProvider wraps the application and provides the useTodos hook to any component.
          </p>
        </div>
      </div>
    </div>
  )
}
