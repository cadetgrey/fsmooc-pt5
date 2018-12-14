import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpansion = () => {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const { blog, handleLike, handleDelete, currentUser } = this.props
    const blogIsOrphanOrViewerIsOwner = 
      !blog.user 
        ? true
        : blog.user.username === currentUser.username
        ? true
        : false

    const showWhenExpanded = { display: this.state.expanded ? '' : 'none'}

    const { title, author, url, likes } = blog
    const name = blog.user ? blog.user.name : ''

    // destructuring assignment for clarity?
    return (
      <div onClick={this.toggleExpansion} className='blog'>
        <div>{title} {author}</div>
        <div style={showWhenExpanded}>
          <a href={url}>{url}</a>
          {likes} likes <button onClick={() => handleLike(blog)}>like</button>
          {name ? `added by ${name}` : name}
          {blogIsOrphanOrViewerIsOwner ? <button onClick={() => handleDelete(blog)}>delete</button> : null}
        </div>
      </div>
    )
  }
}


export default Blog