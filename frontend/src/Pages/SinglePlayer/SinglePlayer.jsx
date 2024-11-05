import { AppBar, Box, Button, Grid, Toolbar, Typography, TextField, IconButton, MenuItem, Menu } from '@mui/material';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Map from '../../Components/CurrentMap/Map';
import Footer from '../../Components/Footer/Footer';
import Clue from '../../Components/Clue/Clue';
import SendIcon from '@mui/icons-material/Send';
import './SinglePlayer.css';

const SinglePlayer = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [points, setPoints] = useState(0);
    const [clueSolved, setClueSolved] = useState(0);
    const [currentClue, setCurrentClue] = useState({ clueID: 1, latitude: 29.2902040, longitude: 78.2857349, title: "First Clue", message: "Find the tallest tree in the park.", points: 100 });
    const [anchorElNav, setAnchorElNav] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const success = (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            };
            navigator.geolocation.watchPosition(success);
        }
    }, []);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // Helper function to calculate distance between two coordinates in meters
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180;
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // distance in meters
    };

    // Function to check location
    const handleCheckLocation = () => {
        const userLatitude = location.latitude;
        const userLongitude = location.longitude;

        // Replace with the actual latitude and longitude of the current clue
        const clueLatitude = currentClue.latitude; 
        const clueLongitude = currentClue.longitude;

        if (userLatitude !== null && userLongitude !== null) {
            const distance = calculateDistance(userLatitude, userLongitude, clueLatitude, clueLongitude);

            if (distance <= 10) {
                // put some fantastic animation
                handleClueSolved();
            } else {
                // put some discouragement animation
                console.log(location.latitude + " " + location.longitude)
                console.log("Not here!")
            }
        }
    };

    // Mock implementation of handleClueSolved
    const handleClueSolved = () => {
        setClueSolved(clueSolved + 1);
        setPoints(points + currentClue.points);

        // fetch next clue
        // add the current clue to the solvedClueList
        // setCurrentClue(the thing fetched above);

        console.log("Congratulations! You've solved the clue.");
    };


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Treasure Hunt
                    </Typography>
                    <Box sx={{display: {md: 'flex', xs: 'none'}}}>
                        <Typography variant="h6" sx={{ flexGrow: 1, m: 2}}>
                            Clues Solved: {clueSolved}
                        </Typography>
                        <Typography variant="h6" sx={{ flexGrow: 1, m: 2}}>
                            Points: {points}
                        </Typography>
                    </Box>
                    <Box sx={{display: {md: 'none', xs: 'flex'}}}>
                    <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem key="clue-solved">
                                <Typography sx={{ textAlign: 'center' }}>Clues Solved: {clueSolved} </Typography>
                            </MenuItem>
                            <MenuItem key="point">
                                <Typography sx={{ textAlign: 'center' }}>Points: {points} </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            
            <Grid container spacing={3} sx={{ mt: 3, paddingBottom: 2 }}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, height: '70vh' }}>
                        <Map mask='single' myLocation={location} />
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Clue clueID={currentClue.clueID} title={currentClue.title} message={currentClue.message} />
                    </Box>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        <Button variant='contained' onClick={handleCheckLocation}>Check Location</Button>
                    </Box>
                </Grid>
            </Grid>

            <Footer />
        </div>
    );
};

export default SinglePlayer;
