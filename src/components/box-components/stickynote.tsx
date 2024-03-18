import * as React from 'react';
import { Card, CardHeader, IconButton, Box, TextareaAutosize } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNote, removeStickyNote } from '../../app/features/stickyNoteSlice';

interface StickyNoteItemProps {
  id: string;
  content: string;
  showDelete: boolean;
}


export const StickyNoteItem: React.FC<StickyNoteItemProps> = ({ id, content, showDelete }) => {

  const dispatch = useAppDispatch();
  
  // Update content of a sticky note
  const handleUpdate = (id: string, content: string) => {
    dispatch(updateStickyNote({id, content}));
  };

  // Delete a sticky note
  const handleDelete = (id: string) => {
    // Dispatch an action to delete the sticky note with the given id
    dispatch(removeStickyNote(id));
  };

  return (
    <Card
      className="stickyNote"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
      }}
    >
      {showDelete && (
        <IconButton aria-label="delete" size="small" color="error" onClick={() => handleDelete(id)} sx={{ position: 'absolute', top: '0', right: '0' }}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }} />
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <TextareaAutosize
          defaultValue={content}
          onChange={(event) => handleUpdate(id, event.target.value)}
          minRows={3}
          style={{ width: '100%', height: '100%', border: 'none', outline: 'none', resize: 'none' }}
        />
      </Box>
    </Card>
  );
};


//These components assume you have actions like deleteDocLink, deleteWebLink,
// updateStickyNote, etc., defined in your Redux slices. 
// Use useDispatch within each component to dispatch these actions, and
// useSelector to access any needed state from Redux.

