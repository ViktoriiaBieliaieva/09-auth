import { Metadata } from 'next';
import css from './ProfilePage.module.css';
import Link from 'next/link';
import { getServerMe } from '@/lib/api/serverApi';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Profile',
  description:
    'Manage your personal profile in the Notes App. View and update your account information while creating, editing, and organizing your notes efficiently.',
  openGraph: {
    url: 'https://08-zustand-kappa-coral.vercel.app/profile',
    title: 'Profile',
    description:
      'Manage your personal profile in the Notes App. View and update your account information while creating, editing, and organizing your notes efficiently.',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'note image',
      },
    ],
  },
};

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user?.avatar || '/avatar-placeholder.png'}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />{' '}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
