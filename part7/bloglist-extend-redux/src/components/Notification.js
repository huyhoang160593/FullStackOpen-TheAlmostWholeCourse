import { SUCCESS } from 'reducers/notificationReducer'
import { useAppSelector } from 'store.js'

const Notification = () => {
  const notification = useAppSelector((state) => state.notification)
  if (notification.message === null) {
    return null
  }
  switch (notification.type) {
    case SUCCESS: {
      return <div className="notification">{notification.message}</div>
    }
    default: {
      return <div className="notification error">{notification.message}</div>
    }
  }
}

export default Notification
