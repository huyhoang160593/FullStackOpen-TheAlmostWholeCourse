import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but hide url and likes', () => {
  /** @type {import("./Blog").User} */
  const user = {
    id: 'userid',
    name: 'puppycat',
    username: 'the99spuppycat'
  }
  /** @type {import('./Blog').Blog} */
  const blog = {
    id: 'id',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user
  }

  const { container } = render(<Blog blog={blog} user={user} />)

  const displayElement = container.querySelector('[aria-label="blogTitleAuthor"]')
  const hiddenURLElement = container.querySelector('[aria-label="blogURL"]')
  const hiddenLikesElement = container.querySelector('[aria-label="blogLikes"]')
  expect(displayElement).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(hiddenURLElement).toBeNull()
  expect(hiddenLikesElement).toBeNull()
})
