import { createContext, useState, useContext, useEffect } from 'react'

const BlogContext = createContext()

export function BlogProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('blogPosts')
    return saved ? JSON.parse(saved) : []
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Save posts to localStorage
  useEffect(() => {
    localStorage.setItem('blogPosts', JSON.stringify(posts))
  }, [posts])

  const createPost = (title, content, author) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      author,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      likes: 0
    }
    setPosts([newPost, ...posts])
    return newPost
  }

  const updatePost = (id, title, content) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, title, content, updatedAt: new Date().toLocaleString() }
        : post
    ))
  }

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  const likePost = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
  }

  const value = {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    likePost
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider')
  }
  return context
}
