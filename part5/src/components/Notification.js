/**
 * @typedef Props
 * @property {string} type
 * @property {string} message
 */

export const { ERROR, SUCCESS } = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

/** @param {Props} props */
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
