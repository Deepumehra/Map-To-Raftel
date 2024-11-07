import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Clue from '../../Components/Clue/Clue';
import Map from '../../Components/CurrentMap/Map';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { fetchClueById, fetchHuntById, solveClue } from '../../State/Hunts/Action';
import './SinglePlayer.css';

const SinglePlayer = () => {
    const dispatch=useDispatch();
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [points, setPoints] = useState(0);
    const [clueSolved, setClueSolved] = useState(0);
    const [anchorElNav, setAnchorElNav] = useState(null);
    const { huntId } = useParams();
    const {auth,hunt}=useSelector((state)=>state);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [totalPoints, setTotalPoints] = useState(0);
    const [currentClue, setCurrentClue] = useState({});
    const [cluesSolved, setCluesSolved] = useState(0);

    useEffect(() => {
        dispatch(fetchHuntById(huntId));
        console.log("Current Hunt details :",hunt);
        setCurrentClue(hunt.currentHunt.startClueId);
        dispatch(fetchClueById(currentClue));
        console.log("Current clue details :",currentClue)        
    }, [dispatch]);

    useEffect(() => {
        if (navigator.geolocation) {
            const success = (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
            };
            navigator.geolocation.watchPosition(success);
            if(location) {
                console.log(location);
            }
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

    useEffect(() => {
        if (currentHunt) {
            setTitle(currentHunt.title || '');
            setDescription(currentHunt.description || '');
            setTotalPoints(currentHunt.totalPoints || 0);
            setCurrentClue(currentHunt.currentClue || {});
            setCluesSolved(currentHunt.cluesSolved || 0);
        }
    }, [currentHunt]);

    // Mock implementation of handleClueSolved
    const handleClueSolved = () => {
        const profileId=auth.profile._id;
        const currentClueId=hunt.clue._id;
        const nextClueId=hunt.clue.nextClueId;
        setClueSolved(clueSolved + 1);
        setPoints(points + currentClue.points);
        dispatch(solveClue({profileId,huntId,currentClueId,nextClueId,points}));
        // fetch next clue
        // add the current clue to the solvedClueList
        // setCurrentClue(the thing fetched above);
        console.log("Congratulations! You've solved the clue.");
    };
    return (
        <div>
            <Header />
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
