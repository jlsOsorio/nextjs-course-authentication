import Link from 'next/link';

import styles from './main-navigation.module.css';
import { signOut, useSession } from 'next-auth/react';

const MainNavigation = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  function logoutHandler(): void {
    signOut();
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Next Auth
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Profile</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
