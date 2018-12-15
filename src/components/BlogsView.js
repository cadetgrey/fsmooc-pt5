import React from 'react'
import Blog from './Blog'

const BlogsView = ({blogs, currentUser, logout, handleLike, handleDelete }) => (
  <div className='blogs-view'>
    <h2>blogs</h2>

    <p>
      {currentUser.name} is logged in 
      <button onClick={logout}>logout</button>
    </p>
    
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={currentUser} />
    )}
  </div>
)

export default BlogsView