import { AppBar, Box, Button, Grid, Toolbar, Typography, TextField, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import {io} from 'socket.io-client';
import Map from '../../Components/CurrentMap/Map';
import Footer from '../../Components/Footer/Footer';
import Clue from '../../Components/Clue/Clue';
import SendIcon from '@mui/icons-material/Send';
import './MapPage.css';

const socket = io('http://your-socket-server-url');

const MapPage = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [teamLocations, setTeamLocations] = useState([]);
    const [chatMessages, setChatMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(0);
    const [currentClue, setCurrentClue] = useState({ clueID: 1, title: "First Clue", message: "Find the tallest tree in the park." });

    useEffect(() => {
        socket.connect();

        socket.on('team-location-update', (locations) => {
            setTeamLocations(locations);
        });

        socket.on('new-chat-message', (msg) => {
            setChatMessages(prevMessages => [...prevMessages, msg]);
        });

        socket.on('clue-update', (newClue) => {
            setCurrentClue(newClue);
            setPoints(prevPoints => prevPoints + 1);
        });

        return () => socket.disconnect();
    }, []);

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
                </Toolbar>
            </AppBar>
            
            <Grid container spacing={3} sx={{ mt: 3, paddingBottom: 2 }}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, height: '70vh' }}>
                        <Map liveLocationMarkers={teamLocations} myLocation={location} />
                    </Box>
                    <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 2, maxHeight: '50vh', overflowY: 'auto' }}>
                        <Typography variant="h6">Team Chat</Typography>
                        <Box>
                            {chatMessages.map((msg, index) => (
                                <Box key={index} sx={{ mb: 1, p: 1, bgcolor: '#f1f1f1', borderRadius: 2 }}>
                                    <Typography variant="body2">{msg}</Typography>
                                </Box>
                            ))}
                        </Box>
                        <Box display="flex" mt={1}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                            />
                            <IconButton color="primary" onClick={sendMessage}>
                                <SendIcon />
                            </IconButton>
                        </Box>
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

export default MapPage;
