import css from './Home.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found. Please return to the homepage.',
  openGraph: {
    url: 'https://08-zustand-kappa-coral.vercel.app/404',
    title: 'Page Not Found',
    description: 'The requested page could not be found. Please return to the homepage.',
    images: [
      {
        url: 'https://syhzhuelbxgnhopnwjgc.supabase.co/storage/v1/object/public/media/blog/404_page_cover.jpg',
        width: 1200,
        height: 630,
        alt: 'not found image',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
