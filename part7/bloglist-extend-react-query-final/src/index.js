import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import { NotificationContextProvider } from 'contexts/NotificationContext'
import { LoginUserContextProvider } from 'contexts/LoginUserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoginUserContextProvider>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </LoginUserContextProvider>
  </QueryClientProvider>
)
