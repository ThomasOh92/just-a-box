import * as React from 'react';
import { Card, CardHeader, Box, TextareaAutosize } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNoteContent, removeFromStickyNoteState } from '../../app/features/stickyNoteSlice';

interface StickyNoteItemProps {
  id: string;
  content: string;
}

export const StickyNoteItem = React.forwardRef<HTMLDivElement, StickyNoteItemProps>(({ id, content}, ref) => {

  const dispatch = useAppDispatch();
  
  // Update content of a sticky note
  const handleContentChange = (id: string, content: string) => {
    dispatch(updateStickyNoteContent({id, content}));
  };

  // Delete a sticky note
  const handleDelete = (id: string) => {
    dispatch(removeFromStickyNoteState(id));
  };


  return (
    <Card
      className="stickyNote"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
        maxWidth: '100%',
        maxHeight: '100%',
      }}

    >
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }} />
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <TextareaAutosize
          defaultValue={content}
          onChange={(event) => handleContentChange(id, event.target.value)}
          minRows={2}
          style={{ width: '100%', height:'100%', border: 'none', 
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '10',
            outline: 'none',
            resize: 'none'}}
        />
      </Box>
    </Card>
  );
});


//These components assume you have actions like deleteDocLink, deleteWebLink,
// updateStickyNote, etc., defined in your Redux slices. 
// Use useDispatch within each component to dispatch these actions, and
// useSelector to access any needed state from Redux.

