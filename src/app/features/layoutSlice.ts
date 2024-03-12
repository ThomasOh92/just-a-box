import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for a single layout item
export interface LayoutItem {
    i: string; // Unique identifier
    x: number; // x position
    y: number; // y position
    w: number; // width
    h: number; // height
    minH?: number; // minimum height (optional)
  }
  
// Define the type for the layouts state
interface LayoutsState {
    layouts: {
        md: LayoutItem[];
      };
}

const initialState: LayoutsState = {
    layouts: {
      md: []
    },
};
  

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
      // You can add more reducers as needed]
      setLayouts: (state, action: PayloadAction<LayoutsState['layouts']>) => {
        state.layouts = action.payload;
      },
    },
  });
  
export const { setLayouts } = layoutSlice.actions;

export default layoutSlice.reducer;
  
