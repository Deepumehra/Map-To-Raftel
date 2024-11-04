import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Avatar, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import A1 from '../Avatars/A1.jpeg';
import A2 from '../Avatars/A2.jpeg';
import A3 from '../Avatars/A3.jpeg';
import A4 from '../Avatars/A4.jpeg';
import A5 from '../Avatars/A5.jpeg';
import A6 from '../Avatars/A6.jpeg';
import A7 from '../Avatars/A7.jpeg';
import A8 from '../Avatars/A8.jpeg';
import A9 from '../Avatars/A9.jpeg';
import A10 from '../Avatars/A10.jpeg';

const avatars = [
    A1, A2, A3, A4, A5, A6, A7, A8, A9, A10
];

const AvatarSelectDialog = ({ open, onClose, onSelect }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={1}>
                <DialogTitle>Select an Avatar</DialogTitle>
                <IconButton onClick={onClose} size="small">
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent dividers>
                <Grid container spacing={2} justifyContent="center">
                    {avatars.map((avatar, index) => (
                        <Grid item xs={4} sm={3} key={index}>
                            <Avatar
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                onClick={() => onSelect(index+1)}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        transform: 'scale(1.1)',
                                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                                    },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AvatarSelectDialog;
