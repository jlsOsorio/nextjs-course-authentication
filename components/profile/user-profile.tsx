import { useSession } from 'next-auth/react';

import ProfileForm from './profile-form';
import styles from './user-profile.module.css';

const UserProfile = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  if (loading) {
    return <p className={styles.profile}>Loading...</p>;
  }

  if (session) {
    return (
      <section className={styles.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm />
      </section>
    );
  } else {
    window.location.href = '/auth';
  }
};

export default UserProfile;
