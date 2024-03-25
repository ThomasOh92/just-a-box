//Have a think - do I really need a layout slice?

import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// Define the type for a single layout item
export interface LayoutItem {
    id: string; // Unique identifier
    x: number; // x position
    y: number; // y position
    width: number; // width
    height: number; // height
    type: string; // stickynote, url or file
  }
  
// Define the type for the layouts state
interface LayoutsState {
  layoutItemArray: LayoutItem[];
}

const initialState: LayoutsState = {
  layoutItemArray: [
    {id:"note1", x:0, y:0, width:100, height:100, type:"sticky"},
  ]
};
  

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      //Should i have one reducer per type of item?

      // addLayoutItem: (state) => {
      //   const newID = Math.random().toString(36).substring(7) // This is a placeholder. Use a proper UUID in a real app.
      //   const newItem = {
      //     id: newID,
      //     x: 0,
      //     y: 0,

      //   };
      //   state.stickyNotesArray.push(newNote);
      // },
    },
  });
  
export const { setLayouts } = layoutSlice.actions;

export default layoutSlice.reducer;
  
