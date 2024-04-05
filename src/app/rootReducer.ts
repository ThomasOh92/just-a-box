import { combineReducers } from '@reduxjs/toolkit';
import fileLinkSlice from './features/fileLinkSlice';
import stickyNoteSlice from './features/stickyNoteSlice';
import webLinkSlice from './features/webLinkSlice';
import layoutSlice from './features/layoutSlice';


const rootReducer = combineReducers({
  fileLinks: fileLinkSlice,
  stickyNotes: stickyNoteSlice,
  webLinks: webLinkSlice,
  layout: layoutSlice
  // Add other slices as needed
});

export default rootReducer;
//this gets exported to store.ts, where the store configuration is handled