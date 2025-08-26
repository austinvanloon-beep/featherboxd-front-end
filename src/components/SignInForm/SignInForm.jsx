import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';

import { signIn } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

import styles from './SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <>
      <div className={styles.signInBackground} />
      <main className={styles.signInMain}>
        <h1 className={styles.signInTitle}>Sign In</h1>
        <p className={styles.signInMessage}>{message}</p>
        <form className={styles.signInForm} autoComplete="off" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.label}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={styles.input}
              autoComplete="off"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              autoComplete="off"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={`${styles.button} ${styles.primaryBtn}`}>Sign In</button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className={`${styles.button} ${styles.secondaryBtn}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignInForm;

