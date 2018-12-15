import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import blogService from './services/blogs'

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('if not logged in, shows only login form', () => {
    localStorage.clear()
    app.update()

    expect(app.exists('.login-form')).toEqual(true)
    expect(app.exists('.blogs-view')).toEqual(false)
  })

  it('if logged in, renders blogs', () => {
    const user = {
      username: 'kayttaja1',
      token: '12345612345678',
      name: 'Nimi1'
    }
    localStorage.setItem('loggedUser', JSON.stringify(user))
    app.setState({ user: user })

    const blogComponents = app.find(Blog)

    expect(app.exists('.blogs-view')).toEqual(true)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
  })
})
