// app/@modal/(.)notes/[id]/page.tsx

import { fetchServerNoteById } from '@/lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesPreviewClient from './NotePreview.client';

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPreviewClient />
    </HydrationBoundary>
  );
}
