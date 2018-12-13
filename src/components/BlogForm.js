import React from 'react'

const BlogForm = ({ blogInfo, handleChange, submit }) => (
  <div>
    <h2>Add a blog</h2>
    <form onSubmit={submit}>
      <div>
        title
      <input
          type='text'
          name='title'
          value={blogInfo.title}
          onChange={handleChange} />
      </div>
      <div>
        author
      <input
          type='text'
          name='author'
          value={blogInfo.author}
          onChange={handleChange} />
      </div>
      <div>
        url
        <input
          type='text'
          name='url'
          value={blogInfo.url}
          onChange={handleChange} />
      </div>
      <button>create</button>
    </form>
  </div>
)

export default BlogForm