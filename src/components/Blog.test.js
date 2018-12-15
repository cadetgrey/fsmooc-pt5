import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  const blog = {
    title: 'Otsikko',
    author: 'Kirjoittaja',
    url: 'osoite.fi',
    likes: 5,
    user: {
      username: 'käyttäjä',
      name: 'nimi'
    }
  }
  const blogComponent = shallow(<Blog blog={blog} currentUser={blog.user} />)

  it('renders only title and author if not expanded', () => {
    const basicInfoDiv = blogComponent.find('.basicInfo')

    expect(basicInfoDiv.text()).toContain(blog.title)
    expect(basicInfoDiv.text()).toContain(blog.author)
  })

  it('after clicking name the details are displayed', () => {
    // haetaan klikattava osa komponentista
    const blogDiv = blogComponent.find('.blog')
    blogDiv.simulate('click')

    // haetaan tarkastettava, eli detaljit sisältävä osa komponentista
    const detailsDiv = blogComponent.find('.details')
    expect(detailsDiv.getElement().props.style).toEqual({ display : '' })

    const likesString = detailsDiv.text().match(/(\d+)/)
    expect(parseInt(likesString)).toBe(blog.likes)

    expect(detailsDiv.text()).toContain(`${blog.url}`)
    expect(detailsDiv.text()).toContain(`${blog.user.name}`)
  })

})