import { combineReducers } from '@reduxjs/toolkit';
import docLinkSlice from './features/docLinkSlice';
import stickyNoteSlice from './features/stickyNoteSlice';
import webLinkSlice from './features/webLinkSlice';


const rootReducer = combineReducers({
  dockLinks: docLinkSlice,
  stickyNotes: stickyNoteSlice,
  webLinks: webLinkSlice,
  // Add other slices as needed
});

export default rootReducer;
