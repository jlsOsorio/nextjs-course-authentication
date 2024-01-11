import React, { FormEvent } from 'react';

import styles from './auth-form.module.css';
import { ICreateUser } from '@/interfaces/user';
import { JsonResponse } from '@/pages/api/auth/signup';

async function createUser({
  email,
  password,
}: ICreateUser): Promise<JsonResponse> {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data: JsonResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

const AuthForm = () => {
  const emailInputRef = React.useRef<HTMLInputElement | null>(null);
  const passwordInputRef = React.useRef<HTMLInputElement | null>(null);

  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  function switchAuthModeHandler(): void {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    // Optional: Add validation

    if (isLogin) {
      //login
    } else {
      if (enteredEmail && enteredPassword) {
        const user: ICreateUser = {
          email: enteredEmail,
          password: enteredPassword,
        };

        try {
          const result = await createUser(user);
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
