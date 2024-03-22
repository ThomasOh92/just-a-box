import * as React from 'react';
import { Card, CardHeader, IconButton, Box, TextareaAutosize } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNoteContent, removeStickyNote, moveStickyNote } from '../../app/features/stickyNoteSlice';
import {useDraggable} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface StickyNoteItemProps {
  id: string;
  content: string;
  width: number;
  height: number;
  x: number;
  y: number
}


export const StickyNoteItem: React.FC<StickyNoteItemProps> = ({id, content, x, y}) => {

  const dispatch = useAppDispatch();
  
  // Update content of a sticky note
  const handleContentChange = (id: string, content: string) => {
    dispatch(updateStickyNoteContent({id, content}));
  };

  // Move sticky note
  const handleMoveStickyNote = (id: string, x: number, y:number) => {
    dispatch(moveStickyNote({id, x, y}));
  };

  // Delete a sticky note
  const handleDelete = (id: string) => {
    dispatch(removeStickyNote(id));
  };

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString({
      x: x + (transform ? transform.x : 0),
      y: y + (transform ? transform.y : 0),
      scaleX: 1,
      scaleY: 1,
    }),
  };

  return (
    <Card
      className="stickyNote"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
        width: '100px',
        height: '100px'
      }}
      ref={setNodeRef}
      style={style}
    >
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }} {...listeners} {...attributes} />
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <TextareaAutosize
          defaultValue={content}
          onChange={(event) => handleContentChange(id, event.target.value)}
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

