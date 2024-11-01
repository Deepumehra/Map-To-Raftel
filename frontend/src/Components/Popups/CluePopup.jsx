// Components/Popups/CluePopup.js

import React from 'react';
import { Box, Typography } from '@mui/material';
import clueImage from '../Assists/poneglyph.png';

const CluePopup = () => {
    return (
        <Box>
            <Box sx={{ textAlign: 'center', padding: 1, display: { xs: 'none', md: 'flex' } }}>
                <img src={clueImage} alt="Clue" style={{ width: '100px', height: 'auto', borderRadius: '4px', marginBottom: 2 }} />
                <Typography variant="body1">This is the clue message. Follow it to find your next landmark!</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', padding: 1, display: { xs: 'flex', md: 'none' }, height: '100px', width: '100px' }}>
                <img src={clueImage} alt="Clue" style={{ width: '50px', height: 'auto', borderRadius: '4px', marginBottom: 2 }} />
                <Typography variant="body1" fontSize={10}>This is the clue message. Follow it to find your next landmark!</Typography>
            </Box>
        </Box>
    );
};

export default CluePopup;
