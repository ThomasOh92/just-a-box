import * as React from 'react';
import { Card, CardHeader, IconButton, Box, TextareaAutosize } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface StickyNoteItemProps {
  id: string;
  content: string;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  showDelete: boolean;
}

export const StickyNoteItem: React.FC<StickyNoteItemProps> = ({ id, content, onUpdate, onDelete, showDelete }) => {
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
        <IconButton aria-label="delete" size="small" color="error" onClick={() => onDelete(id)} sx={{ position: 'absolute', top: '0', right: '0' }}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      )}
      <CardHeader className="dragHandle" sx={{ bgcolor: 'grey.200', padding: '13px' }} />
      <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
        <TextareaAutosize
          defaultValue={content}
          onChange={(event) => onUpdate(id, event.target.value)}
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

