import ProfileForm from './profile-form';
import styles from './user-profile.module.css';

const UserProfile = () => {
  // Redirect away if NOT auth

  return (
    <section className={styles.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
};

export default UserProfile;