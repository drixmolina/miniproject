import { Link } from 'react-router-dom'
import { useBlog } from '../context/BlogContext'
import { useAuth } from '../context/AuthContext'
import './BlogApp.css'

export default function BlogHome() {
  const { posts, likePost } = useBlog()
  const { isAuthenticated } = useAuth()

  return (
    <div className="blog-home">
      <div className="blog-header">
        <h1>📝 Blog App</h1>
        <p>A Full-Stack React Application</p>
        {isAuthenticated && (
          <Link to="/blog/create" className="create-post-btn">
            ✍️ Create New Post
          </Link>
        )}
      </div>

      <div className="blog-description">
        <h2>Welcome to Our Blog</h2>
        <p>
          This is a capstone project that demonstrates all React concepts learned during training:
        </p>
        <ul className="features-list">
          <li>✅ <strong>Components & Props:</strong> Reusable post components</li>
          <li>✅ <strong>State Management:</strong> useState for local state, Context API for global state</li>
          <li>✅ <strong>Side Effects:</strong> useEffect for data persistence</li>
          <li>✅ <strong>Routing:</strong> Multiple pages with React Router</li>
          <li>✅ <strong>Authentication:</strong> Protected routes for authenticated users</li>
          <li>✅ <strong>CRUD Operations:</strong> Create, Read, Update, Delete posts</li>
          <li>✅ <strong>LocalStorage:</strong> Data persistence across sessions</li>
          <li>✅ <strong>Responsive Design:</strong> Mobile-friendly interface</li>
        </ul>
      </div>

      <div className="posts-section">
        <h2>📚 Recent Posts ({posts.length})</h2>
        
        {posts.length === 0 ? (
          <div className="empty-posts">
            <p>No blog posts yet.</p>
            {isAuthenticated ? (
              <Link to="/blog/create" className="create-link">
                Create your first post →
              </Link>
            ) : (
              <p className="login-prompt">Login to create blog posts</p>
            )}
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-header">
                  <h3>{post.title}</h3>
                  <span className="post-date">{post.createdAt}</span>
                </div>
                
                <p className="post-author">By {post.author}</p>
                
                <div className="post-excerpt">
                  {post.content.substring(0, 150)}...
                </div>
                
                <div className="post-footer">
                  <button
                    onClick={() => likePost(post.id)}
                    className="like-btn"
                  >
                    👍 {post.likes > 0 ? post.likes : 'Like'}
                  </button>
                  
                  <Link to={`/blog/${post.id}`} className="read-more-btn">
                    Read More →
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="post-actions">
                    <Link to={`/blog/${post.id}/edit`} className="edit-btn">
                      ✏️ Edit
                    </Link>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
