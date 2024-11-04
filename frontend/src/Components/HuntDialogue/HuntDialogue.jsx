import React, { useEffect } from 'react';
import { Dialog, DialogContent, Typography, Box, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const HuntDialog = ({ open, onClose, hunt, onPrevious, onNext }) => {
    const navigate = useNavigate();

    const handleParticipate = () => {
        navigate(`/map/${hunt.id}`);
    };
    
    useEffect(() => {

    }, [hunt]);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            BackdropProps={{
                style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 20px',  // Adds padding for the dialog content
                },
            }}
        >
            {/* Left Arrow - Positioned on the extreme left with padding */}
            <IconButton
                onClick={onPrevious}
                sx={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                }}
            >
                <ArrowBackIosIcon />
            </IconButton>

            {/* Right Arrow - Positioned on the extreme right with padding */}
            <IconButton
                onClick={onNext}
                sx={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                }}
            >
                <ArrowForwardIosIcon />
            </IconButton>

            {/* Inside the Dialog component, right before the Box wrapper: */}
            <IconButton
                onClick={onClose} // This will trigger the close function when clicked
                sx={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    color: 'white', // Customize color if needed
                    bgcolor: 'rgba(0, 0, 0, 0.5)', // Optional background for better visibility
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.7)', // Darken on hover
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    maxWidth: '600px',  // Limits width for central content
                    padding: '16px',    // Adds padding for the inner box
                }}
            >
                <DialogContent
                    sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        color: 'black',
                        borderRadius: '12px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                    }}
                >
                    {/* Image For Hunt */}
                    {/* <img src={hunt?.image} alt="Clue" style={{ width: '100px', height: 'auto', borderRadius: '4px', marginBottom: 8 }} /> */}

                    {/* Hunt Information */}
                    <Typography variant="h5" gutterBottom>
                        {hunt?.title}
                    </Typography>
                    <Typography variant="body1" mb={2}>
                        {hunt?.description}
                    </Typography>
                    <Typography variant="body2" mb={4}>
                        Players Active: {hunt?.activePlayers} | Completed: {hunt?.completedPlayers}
                    </Typography>

                    {/* Participate Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleParticipate}
                        sx={{
                            bgcolor: 'white',
                            color: '#e74c3c',
                            '&:hover': { bgcolor: '#f5f5f5' },
                        }}
                    >
                        Participate
                    </Button>
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default HuntDialog;
