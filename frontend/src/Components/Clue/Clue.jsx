import React, { useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import './Clue.css';
import justClueImage from '../Assists/justClue.png';

const Clue = ({ clueID, title, message }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <Box onClick={handleFlip} sx={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
            <Card className='clue-card' sx={{ width: '100%', height: '200px', textEmphasis: 'none' }}>
                {!isFlipped? 
                /* Front of the card */
                <Box className="clue-card-front" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={justClueImage} alt="Clue" style={{ height: 'inherit', width: 'inherit', objectFit: 'cover', borderRadius: '4px' }} />
                </Box>
                :
                /* Back of the card */
                <CardContent className="clue-card-back" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
                    <Typography variant="h6" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {message}
                    </Typography>
                </CardContent>}
            </Card>
        </Box>
    );
};

export default Clue;
