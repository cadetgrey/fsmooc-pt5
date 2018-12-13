import React from 'react'
import Blog from './Blog'

const BlogsView = ({blogs, currentUser, logout}) => (
  <div>
    <h2>blogs</h2>

    <p>
      {currentUser.name} is logged in 
      <button onClick={logout}>logout</button>
    </p>

    {blogs.map(blog =>
      <Blog key={blog._id} blog={blog} />
    )}
  </div>
)

export default BlogsView