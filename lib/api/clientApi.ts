import Note, { NewNoteData, NoteId, NoteTag } from '@/types/note';
import { nextServer } from './api';
import { User } from '@/types/user';

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(
  value: string,
  page: number,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>('/notes', {
    params: {
      search: value,
      page: page,
      perPage: 12,
      tag,
    },
  });
  return data;
}

export async function deleteNote(id: NoteId) {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(noteData: NewNoteData) {
  const { data } = await nextServer.post<Note>('/notes', noteData);
  return data;
}

export async function fetchNoteById(id: string) {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export async function register(data: RegisterRequest) {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}

export async function checkSession() {
  const res = await nextServer.get('/auth/session');
  return res.data;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

interface UserUpdate {
  username: string;
}

export async function updateMe(user: UserUpdate): Promise<User> {
  const { data } = await nextServer.patch<User>('/users/me', user);
  return data;
}
