import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DocLink {
  id: string; // A unique identifier for each document
  fileName: string;
  filePath: string;
}

interface DocLinksState {
  docLinks: DocLink[];
}

const initialState: DocLinksState = {
  docLinks: [],
};

export const docLinksSlice = createSlice({
  name: 'docLinks',
  initialState,
  reducers: {
    addDocLink: (state, action: PayloadAction<DocLink>) => {
      state.docLinks.push(action.payload);
    },
    removeDocLink: (state, action: PayloadAction<string>) => {
      state.docLinks = state.docLinks.filter(doc => doc.id !== action.payload);
    },
    // You can add more reducers as needed, for example, to update a document's details
    updateDocLink: (state, action: PayloadAction<{id: string, fileName?: string, filePath?: string}>) => {
      const index = state.docLinks.findIndex(doc => doc.id === action.payload.id);
      if(index !== -1) {
        const doc = state.docLinks[index];
        if(action.payload.fileName) doc.fileName = action.payload.fileName;
        if(action.payload.filePath) doc.filePath = action.payload.filePath;
      }
    },
  },
});

export const { addDocLink, removeDocLink, updateDocLink } = docLinksSlice.actions;

export default docLinksSlice.reducer;
