import {
  NotificationTypes,
  useNotificationValue,
} from 'contexts/NotificationContext'
import { MdiInformationSlabCircleOutline } from './svgs/MdiInformationSlabCircleOutline'
import MdiCheckCircleOutline from './svgs/MdiCheckCircleOutline'
import MdiAlertOutline from './svgs/MdiAlertOutline'
import MdiCloseCircleOutline from './svgs/MdiCloseCircleOutline'

const Notification = () => {
  const messageObject = useNotificationValue()
  if (!messageObject.message) {
    return null
  }
  switch (messageObject.type) {
    case NotificationTypes.INFO:
      return (
        <section className="alert alert-info">
          <MdiInformationSlabCircleOutline />
          <span>{messageObject.message}</span>
        </section>
      )
    case NotificationTypes.SUCCESS:
      return (
        <section className="alert alert-success">
          <MdiCheckCircleOutline />
          <span>{messageObject.message}</span>
        </section>
      )
    case NotificationTypes.WARNING:
      return (
        <section className="alert alert-warning">
          <MdiAlertOutline />
          <span>{messageObject.message}</span>
        </section>
      )
    default:
      return (
        <section className="alert alert-error">
          <MdiCloseCircleOutline />
          <span>{messageObject.message}</span>
        </section>
      )
  }
}

export default Notification
