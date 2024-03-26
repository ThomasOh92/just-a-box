import * as React from 'react';
import { Paper, Card, CardHeader, Box, TextareaAutosize } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateStickyNoteContent, removeStickyNote } from '../../app/features/stickyNoteSlice';



interface StickyNoteItemProps {
  id: string;
  content: string;
  width: number;
  height: number;
  x: number;
  y: number
}


export const StickyNoteItem: React.FC<StickyNoteItemProps> = ({id, content, x, y, width, height}) => {

  const dispatch = useAppDispatch();
  
  // Update content of a sticky note
  const handleContentChange = (id: string, content: string) => {
    dispatch(updateStickyNoteContent({id, content}));
  };

  // Delete a sticky note
  const handleDelete = (id: string) => {
    dispatch(removeStickyNote(id));
  };


  // const style = {
  //   // position: "absolute",
  //   transform: CSS.Transform.toString({
  //     x: x + (transform ? transform.x : 0),
  //     y: y + (transform ? transform.y : 0),
  //     scaleX: 1,
  //     scaleY: 1
  //   }),
  // };

  return (
    <Card
      className="stickyNote"
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
        width: width,
        height: height
      }}

    >
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }} />
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <TextareaAutosize
          defaultValue={content}
          onChange={(event) => handleContentChange(id, event.target.value)}
          minRows={2}
          style={{ width: '100%', height:'40%', border: 'none', 
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: '10',
            outline: 'none',
            resize: 'none'}}
        />
      </Box>
    </Card>
  );
};


//These components assume you have actions like deleteDocLink, deleteWebLink,
// updateStickyNote, etc., defined in your Redux slices. 
// Use useDispatch within each component to dispatch these actions, and
// useSelector to access any needed state from Redux.

