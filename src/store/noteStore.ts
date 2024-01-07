import { create } from 'zustand';

export interface NoteProps {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface CreateEditNote {
   showEditor: boolean;
   exitingNote?: NoteProps | null;
}

interface NoteStore {
  notes: NoteProps[];
  createEditNote: CreateEditNote;
  setCreateEditNote: (val: CreateEditNote) => void;
  addNote: (note: NoteProps) => void;
  editNote: (id: string, updatedNote: NoteProps) => void;
  deleteNote: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  createEditNote: {
    showEditor: false,
    exitingNote: null
  },
  setCreateEditNote: (val) => set({ createEditNote: val }),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  editNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? updatedNote : note)),
    })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
}));
