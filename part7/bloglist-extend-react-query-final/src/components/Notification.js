import { NotificationTypes, useNotificationValue } from 'contexts/NotificationContext'

const Notification = () => {
  const messageObject = useNotificationValue()
  if (!messageObject.message) {
    return null
  }
  switch (messageObject.type) {
    case NotificationTypes.SUCCESS:
      return <div className="notification">{messageObject.message}</div>
    case NotificationTypes.ERROR:
      return <div className="notification error">{messageObject.message}</div>
    default:
      return null
  }
}

export default Notification
