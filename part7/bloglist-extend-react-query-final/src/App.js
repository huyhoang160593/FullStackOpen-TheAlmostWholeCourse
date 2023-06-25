import { useMemo } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import {
  useLoginUserValue,
} from 'contexts/LoginUserContext'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { IndexPage } from 'components/pages/IndexPage'
import { UsersPage } from 'components/pages/users/UsersPage'
import { useMatch } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { queryKeys } from 'misc/queryKeys'
import { routerPaths } from 'misc/router'
import { UserDetailPage } from 'components/pages/users/UserDetailPage'
import { BlogDetailPage } from 'components/pages/users/BlogDetailPage'
import { useQuery } from 'react-query'
import blogsServices from 'services/blogs'
import { Header } from 'components/Header'

const App = () => {
  const queryClient = useQueryClient()
  const user = useLoginUserValue()

  const { data } = useQuery(queryKeys.blogs, blogsServices.getAll, {
    retry: false,
    enabled: !!user,
  })

  const userDetailMatch = useMatch(routerPaths.USER_DETAIL)
  const userDetail = useMemo(() => getDetailUserGuard(), [userDetailMatch, data])

  const blogDetailMatch = useMatch(routerPaths.BLOG_DETAIL)
  const blogDetail = useMemo(() => getDetailBlogGuard(), [blogDetailMatch, data])

  function getDetailUserGuard () {
    /** @type {User[]} */
    const users = queryClient.getQueryData(queryKeys.users)
    if(userDetailMatch && users) {
      return users.find(user => user.id === userDetailMatch.params.id)
    }
    return null
  }

  function getDetailBlogGuard() {
    /** @type {Blog[]} */
    const blogs = queryClient.getQueryData(queryKeys.blogs)
    if(blogDetailMatch && blogs) {
      return blogs.find(blog => blog.id === blogDetailMatch.params.id)
    }
    return null
  }

  if (!user) {
    return (
      <>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <Header user={user} />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path={routerPaths.BLOG_DETAIL} element={<BlogDetailPage blog={blogDetail} />} />
        <Route path={routerPaths.USER_DETAIL} element={<UserDetailPage user={userDetail} />} />
        <Route path={routerPaths.USERS} element={<UsersPage />} />
        <Route path={routerPaths.INDEX} element={<IndexPage blogs={data} />} />
      </Routes>
    </>
  )
}

export default App
