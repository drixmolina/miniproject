import { useState, useEffect } from 'react'
import './NotesApp.css'

export default function NotesApp() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes')
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes))
      } catch (error) {
        console.error('Error loading notes:', error)
      }
    }
  }, [])

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  const addOrUpdateNote = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Please fill in both title and content!')
      return
    }

    if (editingId) {
      // Update existing note
      setNotes(notes.map(note =>
        note.id === editingId
          ? { ...note, title, content, updatedAt: new Date().toLocaleString() }
          : note
      ))
      setEditingId(null)
    } else {
      // Add new note
      const newNote = {
        id: Date.now(),
        title,
        content,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      }
      setNotes([newNote, ...notes])
    }

    setTitle('')
    setContent('')
  }

  const deleteNote = (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  const editNote = (note) => {
    setTitle(note.title)
    setContent(note.content)
    setEditingId(note.id)
  }

  const cancelEdit = () => {
    setTitle('')
    setContent('')
    setEditingId(null)
  }

  return (
    <div className="notes-container">
      <div className="notes-app">
        <h1>📓 Notes App</h1>

        <div className="notes-editor">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="note-title-input"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="note-content-input"
            rows="6"
          />
          <div className="editor-buttons">
            <button onClick={addOrUpdateNote} className="save-btn">
              {editingId ? '💾 Update Note' : '➕ Add Note'}
            </button>
            {editingId && (
              <button onClick={cancelEdit} className="cancel-btn">
                ❌ Cancel
              </button>
            )}
          </div>
        </div>

        <div className="notes-info">
          Total Notes: {notes.length}
        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p className="empty-message">No notes yet. Create your first note! ✨</p>
          ) : (
            notes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <small>Created: {note.createdAt}</small>
                  <small>Updated: {note.updatedAt}</small>
                </div>
                <div className="note-actions">
                  <button onClick={() => editNote(note)} className="edit-btn">
                    ✏️ Edit
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="delete-btn">
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
