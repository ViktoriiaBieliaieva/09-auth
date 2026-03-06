import { cookies } from 'next/headers';
import { nextServer } from './api';
import Note, { NoteTag } from '@/types/note';
import { User } from '@/types/user';

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchServerNotes(
  value: string,
  page: number,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: value,
      page: page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchServerNoteById(id: string) {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}
