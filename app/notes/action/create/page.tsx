import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create New Note',
  description:
    'Create a new note to save your thoughts, ideas, and important information in one place.',
  openGraph: {
    url: 'https://08-zustand-kappa-coral.vercel.app/notes/action/create',
    title: 'Create New Note',
    description: 'Quickly create a new note and keep your ideas organized and accessible anytime.',
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
