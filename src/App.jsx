import { useState } from 'react'
import './App.css'
import TodoApp from './TodoApp'
import NotesApp from './NotesApp'
import WeatherApp from './WeatherApp'

function App() {
  const [currentApp, setCurrentApp] = useState('counter')
  const [count, setCount] = useState(0)

  return (
    <>
      {currentApp === 'counter' ? (
        <div className="container">
          <div className="counter-app">
            <h1>Counter App</h1>
            <div className="counter-display">
              <h2>{count}</h2>
            </div>
            <div className="button-group">
              <button
                className="btn btn-increment"
                onClick={() => setCount(count + 1)}
              >
                Increment
              </button>
              <button
                className="btn btn-decrement"
                onClick={() => setCount(count - 1)}
              >
                Decrement
              </button>
              <button
                className="btn btn-reset"
                onClick={() => setCount(0)}
              >
                Reset
              </button>
            </div>
            <div className="nav-buttons">
              <button
                className="nav-btn"
                onClick={() => setCurrentApp('todo')}
              >
                Go to Todo App →
              </button>
              <button
                className="nav-btn"
                onClick={() => setCurrentApp('notes')}
              >
                Go to Notes App →
              </button>
              <button
                className="nav-btn"
                onClick={() => setCurrentApp('weather')}
              >
                Go to Weather App →
              </button>
            </div>
          </div>
        </div>
      ) : currentApp === 'todo' ? (
        <div className="todo-wrapper">
          <button
            className="back-nav-btn"
            onClick={() => setCurrentApp('counter')}
          >
            ← Back to Counter App
          </button>
          <TodoApp />
        </div>
      ) : currentApp === 'notes' ? (
        <div className="notes-wrapper">
          <button
            className="back-nav-btn"
            onClick={() => setCurrentApp('counter')}
          >
            ← Back to Counter App
          </button>
          <NotesApp />
        </div>
      ) : (
        <div className="weather-wrapper">
          <button
            className="back-nav-btn"
            onClick={() => setCurrentApp('counter')}
          >
            ← Back to Counter App
          </button>
          <WeatherApp />
        </div>
      )}
    </>
  )
}

export default App
