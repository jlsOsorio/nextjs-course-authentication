import React, { FormEvent } from 'react';

import { IChangePassword } from '@/interfaces/user';
import styles from './profile-form.module.css';

interface ProfileFormProps {
  onChangePassword: (passwordData: IChangePassword) => void;
}

const ProfileForm = ({ onChangePassword }: ProfileFormProps) => {
  const oldPasswordRef = React.useRef<HTMLInputElement | null>(null);
  const newPasswordRef = React.useRef<HTMLInputElement | null>(null);

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current?.value;
    const enteredNewPassword = newPasswordRef.current?.value;

    // Optional: Add validation
    if (enteredOldPassword && enteredNewPassword) {
      onChangePassword({
        oldPassword: enteredOldPassword,
        newPassword: enteredNewPassword,
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input ref={newPasswordRef} type="password" id="new-password" />
      </div>
      <div className={styles.control}>
        <label htmlFor="old-password">Old Password</label>
        <input ref={oldPasswordRef} type="password" id="old-password" />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
