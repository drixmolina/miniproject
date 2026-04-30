import { useState, useEffect } from 'react'
import './TaskManager.css'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [filter, setFilter] = useState('all')

  // Fetch tasks from API
  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/todos?_limit=10`)
      if (!response.ok) throw new Error('Failed to fetch tasks')
      
      const data = await response.json()
      // Transform API data to our format
      const transformedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        description: `Task ${task.id}`,
        completed: task.completed
      }))
      setTasks(transformedTasks)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // CREATE - Add new task
  const addTask = async () => {
    if (!title.trim()) {
      alert('Please enter a task title')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          completed: false
        })
      })

      if (!response.ok) throw new Error('Failed to create task')
      
      const newTask = await response.json()
      setTasks([...tasks, {
        id: newTask.id,
        title: newTask.title,
        description: description,
        completed: false
      }])
      
      setTitle('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // READ - Already done in useEffect

  // UPDATE - Edit task
  const updateTask = async (id) => {
    if (!title.trim()) {
      alert('Please enter a task title')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          completed: false
        })
      })

      if (!response.ok) throw new Error('Failed to update task')
      
      setTasks(tasks.map(task =>
        task.id === id
          ? { ...task, title, description }
          : task
      ))
      
      setTitle('')
      setDescription('')
      setEditingId(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // DELETE - Delete task
  const deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return

    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete task')
      
      setTasks(tasks.filter(task => task.id !== id))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  // Edit task
  const editTask = (task) => {
    setTitle(task.title)
    setDescription(task.description)
    setEditingId(task.id)
  }

  // Cancel edit
  const cancelEdit = () => {
    setTitle('')
    setDescription('')
    setEditingId(null)
  }

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'pending') return !task.completed
    return true
  })

  return (
    <div className="task-manager-container">
      <div className="task-manager">
        <h1>📊 Task Manager (CRUD + API)</h1>
        <p className="subtitle">Perform GET, POST, PUT, DELETE operations with JSONPlaceholder API</p>

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        <div className="editor-section">
          <h2>{editingId ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
          <div className="form-group">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title..."
              className="input-field"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description..."
              className="textarea-field"
              rows="3"
              disabled={loading}
            />
          </div>
          <div className="button-group">
            <button
              onClick={editingId ? () => updateTask(editingId) : addTask}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? '⏳ Processing...' : editingId ? 'Update Task' : 'Add Task'}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="btn btn-secondary"
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h2>Your Tasks</h2>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({tasks.length})
              </button>
              <button
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({tasks.filter(t => !t.completed).length})
              </button>
              <button
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Done ({tasks.filter(t => t.completed).length})
              </button>
            </div>
          </div>

          {loading && !tasks.length && (
            <div className="loading">Loading tasks...</div>
          )}

          {filteredTasks.length === 0 ? (
            <p className="empty-message">
              {tasks.length === 0 ? 'No tasks yet. Create one!' : 'No tasks in this filter.'}
            </p>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                  <div className="task-content">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-text">
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                    </div>
                  </div>
                  <div className="task-actions">
                    <button
                      onClick={() => editTask(task)}
                      className="btn-action btn-edit"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="btn-action btn-delete"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="crud-info">
          <h3>🔄 CRUD Operations Explained</h3>
          <ul>
            <li><strong>CREATE:</strong> Add new tasks (POST request)</li>
            <li><strong>READ:</strong> Fetch tasks from API (GET request)</li>
            <li><strong>UPDATE:</strong> Edit existing tasks (PUT request)</li>
            <li><strong>DELETE:</strong> Remove tasks (DELETE request)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
