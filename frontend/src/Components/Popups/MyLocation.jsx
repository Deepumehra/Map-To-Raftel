// Components/Popups/MyLocationPopup.js

import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import avatarImage from '../Assists/avatar.jpeg';

const MyLocationPopup = ({ name }) => {
    return (
        <Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <Avatar src={avatarImage} alt="My Profile" sx={{ width: 60, height: 60, mb: 1 }} />
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2" color="textSecondary">
                    My Location
                </Typography>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <Avatar src={avatarImage} alt="My Profile" sx={{ width: 25, height: 25, mb: 1 }} />
                <Typography variant="h6" fontSize='15px'>{name}</Typography>
                <Typography variant="body2" color="textSecondary" fontSize='10px'>
                    My Location
                </Typography>
            </Box>
        </Box>
    );
};

export default MyLocationPopup;
