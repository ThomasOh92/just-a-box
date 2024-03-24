import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StickyNote {
  id: string; // A unique identifier for each sticky note
  content: string;
  width: number;
  height: number;
  x: number;
  y: number
}

interface StickyNotesState {
  stickyNotesArray: StickyNote[];
}

const initialState: StickyNotesState = {
  stickyNotesArray: [
    {id: "note1", content: "content for note 1", width: 100, height: 100, x: 0, y: 0}
  ],
};

export const stickyNotesSlice = createSlice({
  name: 'stickyNotes',
  initialState,
  reducers: {
    addStickyNote: (state) => {
      const newNoteId = "note" + Math.random().toString(36).substring(7) // This is a placeholder. Use a proper UUID in a real app.
      const newNote = {
        id: newNoteId,
        content: "content for note " + newNoteId,
        width: 100,
        height: 100,
        x: 0,
        y: 0
      };
      state.stickyNotesArray.push(newNote);
    },
    removeStickyNote: (state, action: PayloadAction<string>) => {
      state.stickyNotesArray = state.stickyNotesArray.filter(note => note.id !== action.payload);
    },
    updateStickyNoteContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const { id, content } = action.payload;
      const note = state.stickyNotesArray.find(note => note.id === id);
      if (note) {
        note.content = content;
      }    
    },
    resizeStickyNote: (state, action: PayloadAction<{ id: string; width: number; height: number }>) => {
        const { id, width, height } = action.payload;
        const note = state.stickyNotesArray.find(note => note.id === id);
        if (note) {
          note.width = width;
          note.height = height;
        }
      }, 
    moveStickyNote: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const { id, x, y } = action.payload;
      const note = state.stickyNotesArray.find(note => note.id === id);
      if (note) {
        note.x = x;
        note.y = y;
      }
    },  
  },
});

export const { addStickyNote, removeStickyNote, updateStickyNoteContent, moveStickyNote } = stickyNotesSlice.actions;

export default stickyNotesSlice.reducer;
