// app/notes/filter/[...slug]/page.tsx
import { fetchNotes } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { NoteTag } from '@/types/note';
import { Metadata } from 'next';

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: NotesByTagProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: tag === 'all' ? 'All notes' : `${tag} Notes`,
    description:
      tag === 'all'
        ? 'Browse all your saved notes in one place. Organize, search, and manage your ideas easily.'
        : `Browse notes filtered by the "${tag}" tag. Quickly find and manage notes related to ${tag}.`,
    openGraph: {
      url: `https://08-zustand-kappa-coral.vercel.app/notes/filter/${tag}`,
      title: tag === 'all' ? 'All notes' : `${tag} Notes`,
      description:
        tag === 'all'
          ? 'Browse all your saved notes in one place. Organize, search, and manage your ideas easily.'
          : `Browse notes filtered by the "${tag}" tag. Quickly find and manage notes related to ${tag}.`,
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
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const tag = slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, tag],
    queryFn: () => (tag === 'all' ? fetchNotes('', 1) : fetchNotes('', 1, tag as NoteTag)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
