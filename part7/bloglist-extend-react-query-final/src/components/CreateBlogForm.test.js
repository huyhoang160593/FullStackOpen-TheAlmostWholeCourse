import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'
import axios from 'axios'

describe('<CreateBlogForm />', () => {
  test('update parent state and call onSubmit', async () => {
    const createBlog = jest.fn()
    const userMockEvent = userEvent.setup()
    const testData = 'the string will be test'

    render(<CreateBlogForm createBlogHandle={createBlog} />)

    const mock = jest.spyOn(axios, 'post')
    mock.mockResolvedValue({ hello: 'kun' })
    const inputs = screen.getAllByRole('textbox')
    const saveButton = screen.getByText('create')

    expect(inputs).toHaveLength(3)
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index]
      await userMockEvent.type(input, testData)
    }
    await userMockEvent.click(saveButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe(testData)
    expect(createBlog.mock.calls[0][0].author).toBe(testData)
    expect(createBlog.mock.calls[0][0].url).toBe(testData)
  })
})