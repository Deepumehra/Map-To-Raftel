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
    const [teamLocations, setTeamLocations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(0);
    const [clueSolved, setClueSolved] = useState(0);
    const [currentClue, setCurrentClue] = useState({ clueID: 1, title: "First Clue", message: "Find the tallest tree in the park." });
    const [anchorElNav, setAnchorElNav] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            const success = (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                socket.emit('share-location', { latitude, longitude });
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

    const handleCheckLocation = () => {
        socket.emit('check-location', location, (response) => {
            if (response.success) {
                console.log("Location matched! Clue solved.");
            }
        });
    };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('send-chat-message', message);
            setMessage('');
        }
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
                        <Map mask='single' liveLocationMarkers={teamLocations} myLocation={location} />
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
