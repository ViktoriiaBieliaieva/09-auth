'use client';

import css from './SignUpPage.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register, RegisterRequest } from '@/lib/api/clientApi';
import { isAxiosError } from 'axios';
import { useAuthStore } from '@/lib/store/authStore';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore(state => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as unknown as RegisterRequest;

      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push('/profile');
      }
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.response?.message ??
            err.response?.data?.error ??
            err.message ??
            'Request failed'
        );
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Oops... some error');
      }
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
