import { create } from 'zustand';

export interface NoteProps {
  id: string;
  title: string;
  description: string;
  content: string;
}
interface NoteStore {
  notes: NoteProps[];
  showEditor: boolean;
  existingNote?: NoteProps| undefined;
  setShowEditor: (val:boolean) => void;
  setExitingNote: (val:NoteProps| undefined) => void;
  addNote: (note: NoteProps) => void;
  editNote: (id: string, updatedNote: NoteProps) => void;
  deleteNote: (id: string) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  showEditor: false,
  existingNote: undefined,
  setShowEditor: (val) => set({ showEditor: val }),
  setExitingNote: (note) => set(()=> ({ existingNote: note})),
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  editNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) => (note.id === id ? updatedNote : note)),
    })),
  deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
}));
