import { create } from 'zustand';

export interface NoteProps {
  id: string;
  title: string;
  description: string;
  content: string;
  tags?: string[];
}
interface NoteStore {
  notes: NoteProps[];
  showEditor: boolean;
  existingNote?: NoteProps| undefined;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  setShowEditor: (val:boolean) => void;
  setExistingNote: (val:NoteProps| undefined) => void;
  addNote: (note: NoteProps) => void;
  editNote: (id: string, updatedNote: NoteProps) => void;
  deleteNote: (id: string) => void;
  importNotes: (notes: [NoteProps]) => void;
}

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  showEditor: false,
  existingNote: undefined,
  searchQuery:'',
  setSearchQuery: (val) => set({searchQuery: val}),
  setShowEditor: (val) => set({ showEditor: val }),
  setExistingNote: (note) => set(()=> ({ existingNote: note})),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  editNote: (id, updatedNote) =>
      set((state) => {
        const index = state.notes.findIndex((note) => note.id === id);
        return index !== -1 ? { notes: Object.assign([...state.notes], { [index]: updatedNote }) }: {notes: state.notes}
      }),
  deleteNote: (id) => set((state) => ({notes: state.notes.filter((note) => note.id !== id)})),
  importNotes: (importedNotes) => {
    set((state) => {
      const updatedNotes = state.notes.map((existingNote) =>
      importedNotes.some((importedNote) => importedNote.id === existingNote.id)
      ? importedNotes.find((importedNote) => importedNote.id === existingNote.id) || existingNote
      : existingNote
      );
      return {
        notes: [...importedNotes, ...updatedNotes],
        showEditor: false
      };
    });
  } 
}));
