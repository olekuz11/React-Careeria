import './App.css'
import React, { useState, useEffect } from 'react'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(oliot => setPosts(oliot))
  }, [])

  return (
    <>
      <h2>Posts from typicode</h2>
      <div className="posts-container">
        {posts && posts.map(p => (
          <div className="post-card" key={p.id}>
            <span className="post-number">#{p.id}</span>
            <h4>{p.title}</h4>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Posts