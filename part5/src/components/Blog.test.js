import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

/** @type {import("./Blog").User} */
const user = {
  id: 'userid',
  name: 'puppycat',
  username: 'the99spuppycat',
}
/** @type {import('./Blog').Blog} */
const blog = {
  id: 'id',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user,
}

describe('<Blog />', () => {
  /** @type {import('@testing-library/react').RenderResult} */
  let containerRender
  beforeEach(() => {
    containerRender = render(<Blog blog={blog} user={user} />)
  })
  test('renders title and author but hide url and likes', () => {
    const { container } = containerRender
    const displayElement = container.querySelector(
      '[aria-label="blogTitleAuthor"]'
    )
    const hiddenURLElement = container.querySelector('[aria-label="blogURL"]')
    const hiddenLikesElement = container.querySelector(
      '[aria-label="blogLikes"]'
    )
    expect(displayElement).toHaveTextContent(`${blog.title} ${blog.author}`)
    expect(hiddenURLElement).toBeNull()
    expect(hiddenLikesElement).toBeNull()
  })

  test('render url and likes when \'show\' button is clicked', async() => {
    const userEventMock = userEvent.setup()
    const { container } = containerRender
    const showButton = screen.getByText('view')

    await userEventMock.click(showButton)
    const hiddenURLElement = container.querySelector('[aria-label="blogURL"]')
    const hiddenLikesElement = container.querySelector(
      '[aria-label="blogLikes"]'
    )
    expect(hiddenURLElement).toBeDefined()
    expect(hiddenURLElement).toHaveTextContent(blog.url)
    expect(hiddenLikesElement).toBeDefined()
    expect(hiddenLikesElement).toHaveTextContent(`${blog.likes}`)
  })
})
