'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import css from './EditProfilePage.module.css';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe, updateMe } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function EditProfilePage() {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });
  const [username, setUsername] = useState('');
  useEffect(() => {
    if (user) setUsername(user.username);
  }, [user]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success('Profile updated');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      router.push('/profile');
    },
    onError: () => {
      toast.error('Failed to update profile');
    },
  });

  const handleCancel = () => router.back();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ username });
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || '/avatar-placeholder.png'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button onClick={handleCancel} type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
