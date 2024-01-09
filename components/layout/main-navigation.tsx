import Link from 'next/link';

import styles from './main-navigation.module.css';

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Next Auth
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/auth">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
