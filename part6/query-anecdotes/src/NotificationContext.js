import { createContext, useReducer, useContext } from 'react';

export const { DISPLAY_NOTIFICATION, REMOVE_NOTIFICATION } = {
  DISPLAY_NOTIFICATION: 'DISPLAY_NOTIFICATION',
  REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
};

const initState = '';

const notificationReducer = (state, action) => {
  console.log('state:', state);
  console.log('action', action);
  switch (action.type) {
    case DISPLAY_NOTIFICATION:
      return action.payload;
    case REMOVE_NOTIFICATION:
      return initState;
    default:
      return state;
  }
};

const NotificationContext = createContext();

/** @type {React.FC<React.PropsWithChildren>} */
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initState
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const displayNotificationCurried = (dispatch) => {
  return async (message, timeoutBySeconds = 5) => {
    dispatch({
      type: DISPLAY_NOTIFICATION,
      payload: message,
    });
    setTimeout(() => {
      dispatch({
        type: REMOVE_NOTIFICATION,
      });
    }, timeoutBySeconds * 1000);
  };
};

export default NotificationContext;
