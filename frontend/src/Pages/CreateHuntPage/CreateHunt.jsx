/*
    This is the page where a user creates a hunt
        * The hunt is given a new random huntID
        * The hunt has its set of clues
        * The map component helps users to place unlocked clues on map along with the treasure.
        * It also has a recycler view part which shows all the clues and user can reorder them as he needed.
        * Each clue would have a destination selected by the user.
    User selects two points on the map like the start where the clue appears 
    and the destination where the clue takes him to and where the next clue 
    is unlocked.
        * The clues should be lined up properly so as to take player to treasure.
        * The clues in the recycler view are ordered in this way.
        * Reordering the clues means changing its start to point the previous clue destination and its destionation is the next clue's start.
        * The destination of a clue should be fixed and only the start should be changed in reordering.
        * The first clue would not need any start location, as the player gets the it with the start of a hunt.
        * The last location is treasure and would not provide any clue. It will make the player win.
    When clicked on map for adding a clue, the create clue form opens up, it asks you to select the 
    destination on map, and a title and a message which is the clue, the form has its own Map component.
    After adding the clue, the destination becomes the treasure, if another clue is added, then this treasure 
    location becomes the start for that clue and that clue's destination becomes the treasure location.
    The Map component of this page show all the destinations with the clues whose start is that destination.
    The map will not show the start clue, the start clue would be shown on a different component on the page.
*/

import React, { useState } from 'react';
import { Container, Box, Grid, Button, Typography, AppBar, Toolbar, Dialog, DialogContent, TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { v4 as uuidv4 } from 'uuid';

const CreateHuntPage = () => {
    const [huntId] = useState(uuidv4());  // Unique ID for the hunt
    const [clues, setClues] = useState([]);
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClue, setNewClue] = useState({ title: '', message: '' });

    // Handle map clicks to select start and destination points
    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                if (!selectedStart) {
                    setSelectedStart(e.latlng);
                } else {
                    setSelectedDestination(e.latlng);
                    setIsModalOpen(true);  // Open form when both points are selected
                }
            },
        });
        return null;
    };

    // Handle input changes in the modal form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewClue((prev) => ({ ...prev, [name]: value }));
    };

    // Handle adding a new clue
    const handleAddClue = () => {
        const clue = {
            start: selectedStart,
            destination: selectedDestination,
            title: newClue.title,
            message: newClue.message,
        };
        setClues((prevClues) => [...prevClues, clue]);
        setSelectedStart(selectedDestination);  // Set the destination as the next start point
        setSelectedDestination(null);
        setNewClue({ title: '', message: '' });
        setIsModalOpen(false);
    };

    return (
        <Container maxWidth="lg">
            {/* Page Header */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Create New Hunt - {huntId}
                    </Typography>
                </Toolbar>
            </AppBar>

            <Grid container spacing={3} sx={{ mt: 3 }}>
                {/* Map Section */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ borderRadius: 2, overflow: 'hidden', height: { xs: '50vh', md: '70vh' } }}>
                        <MapContainer center={[25.492, 81.863]} zoom={15} style={{ height: '100%', width: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MapClickHandler />
                            {clues.map((clue, index) => (
                                <Marker
                                    key={index}
                                    position={[clue.destination.lat, clue.destination.lng]}
                                    icon={L.icon({ iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
                                />
                            ))}
                        </MapContainer>
                    </Box>
                </Grid>

                {/* Clues Recycler View */}
                <Grid item xs={12} md={4}>
                    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, maxHeight: '70vh', overflowY: 'auto' }}>
                        <Typography variant="h6" gutterBottom>Clues</Typography>
                        {clues.map((clue, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                <Typography variant="subtitle1">Clue {index + 1}</Typography>
                                <Typography variant="body2"><strong>Title:</strong> {clue.title}</Typography>
                                <Typography variant="body2"><strong>Message:</strong> {clue.message}</Typography>
                                <Typography variant="body2"><strong>Destination:</strong> {`Lat: ${clue.destination.lat}, Lng: ${clue.destination.lng}`}</Typography>
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {/* Clue Form Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>Add New Clue</Typography>
                    <TextField
                        label="Clue Title"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={newClue.title}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Clue Message"
                        variant="outlined"
                        fullWidth
                        name="message"
                        value={newClue.message}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleAddClue}
                        disabled={!newClue.title || !newClue.message || !selectedDestination}
                    >
                        Save Clue
                    </Button>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default CreateHuntPage;
