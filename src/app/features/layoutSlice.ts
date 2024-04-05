import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Layout {
    i: string,
    x: number,
    y: number,
    w: number,
    h: number
}
  
interface LayoutsState {
    lg: Layout[]
}

// Initial state
const initialState: LayoutsState = {
    lg: []
};
  
  // Creating the slice
  const layoutsSlice = createSlice({
    name: 'layouts',
    initialState,
    reducers: {
      // Action to set layouts
      setLayouts(state, action: PayloadAction<LayoutsState>) {
        const { lg } = action.payload;
        state.lg = lg;
      },
      // You can add more actions here as needed, for example:
      // addAction(state, action: PayloadAction<{ key: 'lg' | 'md', layout: Layout }>) {
      //   state[action.payload.key].push(action.payload.layout);
      // },
    },
  });
  
  // Exporting the action creators
  export const { setLayouts } = layoutsSlice.actions;
  
  // Exporting the reducer
  export default layoutsSlice.reducer;
  