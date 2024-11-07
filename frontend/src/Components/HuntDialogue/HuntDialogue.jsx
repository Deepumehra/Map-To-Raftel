import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, Typography, Box, Button, IconButton, DialogActions, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const HuntDialog = ({mask, open, onClose, hunt, handleParticipate, onPrevious, onNext }) => {
    const navigate = useNavigate();
    const [confirmationOpen, setConfirmationOpen] = useState(false);

    const handleParticipateClick = () => {
        if (mask === "Untouched") {
            setConfirmationOpen(true);
        } else {
            handleNavigate();
        }
    };

    const handleNavigate = () => {
        if (mask === "Untouched") {
            handleParticipate(hunt._id); // Call handleParticipate with hunt ID
            mask = "Active";
        }
        const path = `/map/${hunt._id}`;
        navigate(path);
        setConfirmationOpen(false);
    };

    const handleConfirmationClose = () => {
        setConfirmationOpen(false);
    };

    useEffect(() => {}, [hunt]);

    const getButtonLabel = () => {
        if (mask === "Complete") return "View";
        if (mask === "Active") return "Join";
        return "Participate";
    };

    return (
        <>
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
                        padding: '0 20px',
                    },
                }}
            >
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

                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        color: 'white',
                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                        '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
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
                        maxWidth: '600px',
                        padding: '16px',
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
                        <Typography variant="h5" gutterBottom>
                            {hunt?.title}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            {hunt?.description}
                        </Typography>
                        <Typography variant="body2" mb={4}>
                            Players Completed: {hunt?.numberOfPlayersCompleted}
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleParticipateClick}
                            sx={{
                                bgcolor: 'white',
                                color: '#e74c3c',
                                '&:hover': { bgcolor: '#f5f5f5' },
                            }}
                        >
                            {getButtonLabel()}
                        </Button>
                    </DialogContent>
                </Box>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog
                open={confirmationOpen}
                onClose={handleConfirmationClose}
                aria-labelledby="confirmation-dialog-title"
                aria-describedby="confirmation-dialog-description"
            >
                <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to participate in this hunt?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmationClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleNavigate} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default HuntDialog;
