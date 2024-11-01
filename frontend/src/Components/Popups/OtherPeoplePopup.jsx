// Components/Popups/OtherPeoplePopup.js

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const OtherPeoplePopup = ({ userID, profilePicUrl }) => {
    return (
        <Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <Avatar src={profilePicUrl} alt="Profile" sx={{ width: 60, height: 60, mb: 1 }} />
                <Typography variant="h6">{userID}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Other User's Location
                </Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <Avatar src={profilePicUrl} alt="Profile" sx={{ width: 25, height: 25, mb: 1 }} />
                <Typography variant="h6" fontSize='15px' >{userID}</Typography>
                <Typography variant="body2" color="textSecondary" fontSize='10px' >
                    Other User's Location
                </Typography>
            </Box>
        </Box>
    );
};

export default OtherPeoplePopup;
