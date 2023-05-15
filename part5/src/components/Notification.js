export const { ERROR, SUCCESS } = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const Notification = ({ type = SUCCESS, message }) => {
  if (message === null) {
    return null;
  }
  if (type === SUCCESS) {
    return <div className="notification">{message}</div>;
  }
  return <div className="notification error">{message}</div>
};

export default Notification;
