import * as React from 'react';
import { Card, CardHeader, Input } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNoteContent, removeFromStickyNoteState } from '../../app/features/stickyNoteSlice';
import '../../globalStyles.css';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

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
        width: '100%',
        height: '100%',
      }}

    >
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '11px' }} />
        <textarea  
          rows={6} 
          placeholder={"Enter your text here..."}
          style={{ width: '100%', height:'100%', border: '15px', padding: '7px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '7',
            outline: 'none',
            resize: 'none'}}
        />
      
     </Card>
  );
});


//These components assume you have actions like deleteDocLink, deleteWebLink,
// updateStickyNote, etc., defined in your Redux slices. 
// Use useDispatch within each component to dispatch these actions, and
// useSelector to access any needed state from Redux.

