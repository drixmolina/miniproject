import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import './BlogApp.css'

export default function BlogCreateEdit() {
  const { id } = useParams()
  const postId = id ? Number(id) : null
  const navigate = useNavigate()
  const { posts, createPost, updatePost } = useBlog()

  const existingPost = posts.find((post) => post.id === postId)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title)
      setContent(existingPost.content)
      setAuthor(existingPost.author)
    }
  }, [existingPost])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('All fields are required.')
      return
    }
    if (existingPost) {
      updatePost(existingPost.id, title, content)
      navigate(`/blog/${existingPost.id}`)
    } else {
      createPost(title, content, author)
      navigate('/blog')
    }
  }

  return (
    <div className="blog-page blog-form-page">
      <div className="blog-form-card">
        <div className="blog-form-header">
          <h1>{existingPost ? 'Edit Post' : 'Create Post'}</h1>
          <p>{existingPost ? 'Update the blog post details below.' : 'Write a new blog post and save it.'}</p>
        </div>

        {error && <p className="form-error">{error}</p>}

        <form onSubmit={handleSubmit} className="blog-form">
          <label>
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
            />
          </label>

          <label>
            Content
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="8"
              placeholder="Write your article content here..."
            />
          </label>

          <label>
            Author
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="button primary">
              {existingPost ? 'Update Post' : 'Publish Post'}
            </button>
            <button type="button" className="button secondary" onClick={() => navigate('/blog')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
