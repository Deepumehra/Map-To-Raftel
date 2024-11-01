/* 
    this is the page where user will see : -
        * his location
        * his team members location
        * current clue
        * current points
        * current clue
    
    import these comoponents from src/Components
        * map (where positions are shown)
        * clue (which shows the current clue)
        * checkLocation (which checks the current location and matches it with the location clue is poinnting)
        * lets see
*/

import { AppBar, Box, Container, CssBaseline, Grid, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
// Import components
import './MapPage.css';
import Map from '../../Components/CurrentMap/Map';
import Footer from '../../Components/Footer/Footer';
import Clue from '../../Components/Clue/Clue';
// import CheckLocation from '../Components/checkLocation';

const MapPage = () => {

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }
        
        const success = (position) => {
            setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        };

        const error = () => {
            console.log("Geolocation is not supported by your browser");
            setError("Unable to retrieve your location");
        };

        navigator.geolocation.getCurrentPosition(success, error);
    }, []);

    return (
        <Container>
            {/* <CssBaseline /> */}
            
            {/* Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Treasure Hunt
                    </Typography>
                </Toolbar>
            </AppBar>
            
            {/* Main Content */}
            <Grid container spacing={3} sx={{ mt: 3 }}>
                
                {/* Map Section */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, height: { xs: '50vh', md: '70vh' } }}>
                        {/* // <Map /> */}
                        <Map
                            liveLocationMarkers={[
                                { latitude: 25.4921, longitude: 81.8635, userID: 'User1', profilePicUrl: '' },
                                { latitude: 25.4923, longitude: 81.8640, userID: 'User2', profilePicUrl: '' },
                            ]}
                            clueMarkers={[
                                { latitude: 25.4925, longitude: 81.8645 },
                                { latitude: 25.4927, longitude: 81.8647 },
                            ]}
                            myLocation = {{latitude:location.latitude, longitude:location.longitude}}
                        />

                    </Box>
                </Grid>
                
                {/* Clue and Points Section */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ mb: 3, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        {/* <Clue/> */}
                        <Clue clueID={1} title="First Clue" message="Find the tallest tree in the park." />
                    </Box>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                        {/* <CheckLocation/> */}
                    </Box>
                </Grid>
                
            </Grid>
            
            {/* Footer */}
            <Footer/>
        </Container>
    );
}

export default MapPage;
