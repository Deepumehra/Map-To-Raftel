import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Modal, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { keyframes } from '@emotion/react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const pulse = keyframes`
    0% { transform: scale(0.9); }
    50% { transform: scale(1.1); }
    100% { transform: scale(0.9); }
`;

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
    textAlign: 'center',
};

export default function ClueSolvedModal({ open, onClose, onNextClue }) {
    const { width, height } = useWindowSize();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (open) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000); // Confetti lasts for 3 seconds
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            aria-labelledby="clue-solved-modal-title"
            aria-describedby="clue-solved-modal-description"
        >
            <Fade in={open}>
                <Box sx={modalStyle}>
                    {showConfetti && <Confetti width={width} height={height} recycle={false} />}
                    <CheckCircleIcon
                        sx={{
                            fontSize: 80,
                            color: 'success.main',
                            animation: `${pulse} 2s infinite ease-in-out`,
                            mb: 2,
                        }}
                    />
                    <Typography id="clue-solved-modal-title" variant="h4" gutterBottom>
                        Clue Solved!
                    </Typography>
                    <Typography id="clue-solved-modal-description" variant="body1" mb={2}>
                        Great job! You solved the clue.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onNextClue}
                        sx={{ mt: 2, fontWeight: 'bold' }}
                    >
                        Next Clue
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}
