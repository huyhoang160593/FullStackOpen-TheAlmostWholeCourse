import { useMutation } from '@apollo/client';
import { LOGIN } from 'apollo/mutations';
import { LocalStorageKeys } from 'constants/localStorageKeys';
import { useCallback } from 'react';

/** @typedef {import('apollo/mutations').LoginVariables} LoginVariables */
/** @typedef {import('apollo/mutations').LoginResult} LoginResult */

/**
 * @param {{
 *  show: boolean,
 *  setToken: React.Dispatch<React.SetStateAction<string>>
 * }} props
 * */
export default function LoginForm({setToken, show}) {
  /** @type {import('@apollo/client').MutationTuple<LoginResult, LoginVariables>} */
  const [login] = useMutation(LOGIN);

  const onLoginSubmitHandle = useCallback(
    /** @type {React.FormEventHandler<HTMLFormElement>} */ (
      async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const dataObject = /** @type {LoginVariables}*/ (
          Object.fromEntries(formData.entries())
        );

        event.currentTarget.reset();
        const result = await login({ variables: dataObject });
        const token = result.data.login.value
        localStorage.setItem(LocalStorageKeys.LIBRARY_USER_TOKEN, token)
        setToken(token)
      }
    ),
    [login, setToken]
  );

  if (!show) return null;
  return (
    <form onSubmit={onLoginSubmitHandle}>
      <h2>Login</h2>
      <fieldset>
        <legend>Login form</legend>
        <label htmlFor="username">username</label>
        <input id="username" name="username" type="text" />
        <br />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button type="submit">login</button>
      </fieldset>
    </form>
  );
}
