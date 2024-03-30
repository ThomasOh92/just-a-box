import * as React from 'react';
import { Paper, Card, CardHeader, Box, TextareaAutosize } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface itemProps {
    text: string;
    size: string;
    color: string;
  }

export const Item: React.FC<itemProps> = ({ text, size, color}) => {

    return (
        <div>
            <div>
                <Card
                className="stickyNote"
                variant="outlined"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': { border: '1px dotted', borderColor: 'primary.dark', borderRadius: '5px' },
                    width: "200px",
                    height: "200px"
                }}   
                 >
                <CardHeader  sx={{ bgcolor: 'grey.200', padding: '13px' }} />
                <Box className="item-content" sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
                    <h1>Hello text{text}</h1>
                <h1>Hello size{size}</h1>
                    <h1>Hello color{color}</h1>

                </Box>
                </Card>
            </div>
        </div>
    )
};