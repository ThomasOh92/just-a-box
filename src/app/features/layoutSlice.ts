import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutItem {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number
}
  
interface LayoutsState {
  [breakpoint: string]: LayoutItem[]
}

// Initial state
const initialState: LayoutsState = {
    lg: [ 
      { i: "a", x: 0, y: 0, w: 1, h: 1 },
      { i: "b", x: 2, y: 2, w: 1, h: 1 },
      { i: "c", x: 5, y: 5, w: 1, h: 1 }
    ],
};

// Creating the slice
const layoutsSlice = createSlice({
  name: 'layouts',
  initialState,
  reducers: {
    setLayouts(state, action: PayloadAction<LayoutsState>) {
      return action.payload; // Replace the entire state with the new layouts
    },
    // setLayouts(state, action: PayloadAction<{breakpoint: string, layoutItems: LayoutItem[]}>) {
    //   const { breakpoint, layoutItems } = action.payload;
    //   state[breakpoint] = layoutItems;
    // },
    // Example of adding an item to a specific breakpoint
    addLayoutItem(state, action: PayloadAction<{ breakpoint: string; layoutItem: LayoutItem }>) {
      const { breakpoint, layoutItem } = action.payload;
      if (!state[breakpoint]) {
        state[breakpoint] = [];
      }
      state[breakpoint].push(layoutItem);
    }, 
  }
});
  
  // Exporting the action creators
  export const { setLayouts } = layoutsSlice.actions;
  
  // Exporting the reducer
  export default layoutsSlice.reducer;
  