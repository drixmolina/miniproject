import { useParams, Link, useNavigate } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'
import './BlogApp.css'

export default function BlogPost() {
  const { id } = useParams()
  const postId = Number(id)
  const navigate = useNavigate()
  const { posts, deletePost, likePost } = useBlog()
  const { isAuthenticated } = useAuth()

  const post = posts.find((item) => item.id === postId)

  if (!post) {
    return (
      <div className="blog-page blog-empty">
        <h2>Post not found</h2>
        <p>The post you are looking for does not exist or may have been deleted.</p>
        <Link to="/blog" className="button secondary">
          Back to Blog
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (confirm('Delete this post?')) {
      deletePost(post.id)
      navigate('/blog')
    }
  }

  return (
    <div className="blog-page">
      <div className="blog-detail-card">
        <div className="blog-detail-header">
          <div>
            <h1>{post.title}</h1>
            <p className="blog-meta">
              By <strong>{post.author}</strong> · {post.createdAt}
            </p>
          </div>
          <div className="blog-like">
            <button onClick={() => likePost(post.id)} className="button primary">
              👍 Like {post.likes}
            </button>
          </div>
        </div>

        <div className="blog-content">
          <p>{post.content}</p>
        </div>

        <div className="blog-detail-footer">
          <div>
            <p>
              <strong>Last updated:</strong> {post.updatedAt}
            </p>
          </div>
          <div className="blog-actions">
            <Link to="/blog" className="button secondary">
              ← Back to Blog
            </Link>
            {isAuthenticated && (
              <>
                <Link to={`/blog/${post.id}/edit`} className="button tertiary">
                  ✏️ Edit
                </Link>
                <button onClick={handleDelete} className="button danger">
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
