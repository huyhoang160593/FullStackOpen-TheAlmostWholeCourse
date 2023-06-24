import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { NotificationContextProvider } from 'contexts/NotificationContext'
import { LoginUserContextProvider } from 'contexts/LoginUserContext'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <LoginUserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </LoginUserContextProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
