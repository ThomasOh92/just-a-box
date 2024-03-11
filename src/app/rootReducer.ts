import { combineReducers } from '@reduxjs/toolkit';
import fileLinkSlice from './features/fileLinkSlice';
import stickyNoteSlice from './features/stickyNoteSlice';
import webLinkSlice from './features/webLinkSlice';


const rootReducer = combineReducers({
  fileLinks: fileLinkSlice,
  stickyNotes: stickyNoteSlice,
  webLinks: webLinkSlice,
  // Add other slices as needed
});

export default rootReducer;
