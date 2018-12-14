import React from 'react'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import BlogsView from './components/BlogsView'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      blogs: [],
      title: '',
      author: '',
      url: '',
      actionNotification: null
    }
  }

  async componentDidMount() {
    const blogsFromDb = await blogService.getAll()
    this.setState({ blogs: blogsFromDb })

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user });
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleLike = async (likedBlog) => {
    const updatedBlog = await blogService.update(likedBlog.id, {
      ...likedBlog,
      likes: likedBlog.likes + 1
    })
    console.log(updatedBlog)
    const blogs = this.state.blogs.filter(blog => blog.id !== likedBlog.id)
    this.setState({ blogs: blogs.concat(updatedBlog) });
  }

  handleDelete = async (blogToDelete) => {
    const { title, author } = blogToDelete
    if (window.confirm(`Delete ${title} by ${author}?`)) {
      try {
        console.log(blogToDelete)
        const res =  await blogService.remove(blogToDelete.id)
        console.log(res)
        this.setState({
          blogs: this.state.blogs.filter(blog => blog.id !== blogToDelete.id),
          actionNotification: `deleted ${title} by ${author}`
        })
      } catch (err) {
        this.setState({ actionNotification: err.error })
      }
      this.notificationTimeout()
    }
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (err) {
      // wrap this in a component, copy over from pt2 ???
      this.setState({ actionNotification: 'incorrect username or password' })
      this.notificationTimeout()
    }
  }

  logout = () => {
    this.setState({ user: null });
    window.localStorage.clear()
  }

  submit = async (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()

    try {
      const blog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      console.log(blog)

      this.setState({ title: '', author: '', url: '' });
    } catch (err) {
      console.log(err)
      this.setState({ actionNotification: err.error })
      this.notificationTimeout()
    }
  }

  notificationTimeout = () => {
    setTimeout(() => {
      this.setState({ actionNotification: null })
    }, 5000)
  }

  render() {
    const isLoggedIn = this.state.user === null ? false : true
    const blogFormInfo = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    return (
      <div>
        <Notification
          message={this.state.actionNotification} />
        {isLoggedIn ? (
          <div>
            <BlogsView
              blogs={this.state.blogs}
              currentUser={this.state.user}
              logout={this.logout}
              handleLike={this.handleLike}
              handleDelete={this.handleDelete} />
            <Togglable buttonLabel={'add a blog'} ref={component => this.blogForm = component}>
              <BlogForm
                blogInfo={blogFormInfo}
                handleChange={this.handleFieldChange}
                submit={this.submit} />
            </Togglable>
          </div>
        ) : (
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              login={this.login} />
          )}
      </div>
    );
  }
}



export default App;
