import React from 'react'
import { shallow } from 'enzyme'

import SimpleBlog from './SimpleBlog'

describe.skip('<SimpleBlog />', () => {
  it('renders title, author and likes', () => {
    const blog = {
      title: 'Otsikko',
      author: 'Kirjoittaja',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    const basicInfoDiv = blogComponent.find('.basicInfo')
    const likesDiv = blogComponent.find('.likes')
    const likesString = likesDiv.text().match(/(\d+)/)

    expect(basicInfoDiv.text()).toContain(blog.title)
    expect(basicInfoDiv.text()).toContain(blog.author)
    expect(parseInt(likesString)).toBe(blog.likes)
  })

  it('clicking like calls event handler once', () => {
    const blog = {
      title: 'Otsikko',
      author: 'Kirjoittaja',
      likes: 5
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})