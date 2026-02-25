import './App.css'
import React, { useState, useEffect } from 'react'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [avattuPost, setAvattuPost] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(oliot => setPosts(oliot))
  }, [])

  const togglePost = (id) => {
    setAvattuPost(avattuPost === id ? null : id)
  }

  return (
    <>
      <h2>Posts from typicode</h2>
      <div className="posts-container">
        {posts && posts.map(p => (
          <div
            className={`post-card ${avattuPost === p.id ? 'post-card-auki' : ''}`}
            key={p.id}
            onClick={() => togglePost(p.id)}
          >
            <span className="post-number">#{p.id}</span>
            <h4>{p.title}</h4>

            {avattuPost === p.id && (
              <div className="post-details">
                <p>{p.body}</p>
                <span className="post-user">User ID: {p.userId}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts