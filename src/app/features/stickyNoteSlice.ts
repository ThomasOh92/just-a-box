import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickyNote {
  id: string; // A unique identifier for each sticky note
  text: string;
  width: number;
  height: number;
}

interface StickyNotesState {
  stickyNotes: StickyNote[];
}

const initialState: StickyNotesState = {
  stickyNotes: [],
};

export const stickyNotesSlice = createSlice({
  name: 'stickyNotes',
  initialState,
  reducers: {
    addStickyNote: (state, action: PayloadAction<Omit<StickyNote, 'id'>>) => {
      // Assuming an external function to generate unique IDs, e.g., UUID
      const newNote = {
        id: Math.random().toString(36).substring(7), // This is a placeholder. Use a proper UUID in a real app.
        ...action.payload,
      };
      state.stickyNotes.push(newNote);
    },
    removeStickyNote: (state, action: PayloadAction<string>) => {
      state.stickyNotes = state.stickyNotes.filter(note => note.id !== action.payload);
    },
    updateStickyNote: (state, action: PayloadAction<StickyNote>) => {
      const index = state.stickyNotes.findIndex(note => note.id === action.payload.id);
      if (index !== -1) {
        state.stickyNotes[index] = action.payload;
      }
    },
    resizeStickyNote: (state, action: PayloadAction<{ id: string; width: number; height: number; }>) => {
        const { id, width, height } = action.payload;
        const note = state.stickyNotes.find(note => note.id === id);
        if (note) {
          note.width = width;
          note.height = height;
        }
      },  
  },
});

export const { addStickyNote, removeStickyNote, updateStickyNote } = stickyNotesSlice.actions;

export default stickyNotesSlice.reducer;
