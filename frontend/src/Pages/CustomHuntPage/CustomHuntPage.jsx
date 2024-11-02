import { useState } from 'react';
import { Box, Button, Grid, Typography, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const CustomHuntPage = () => {
    const [hunts, setHunts] = useState([
        { id: 1, name: "City Park Challenge", teamSize: 4 },
        { id: 2, name: "Downtown Adventure", teamSize: 3 },
    ]);
    const [friends, setFriends] = useState(["Friend1", "Friend2", "Friend3"]);
    const [selectedHunt, setSelectedHunt] = useState(null);
    const [team, setTeam] = useState([]);

    const handleAddToTeam = (friend) => {
        if (team.length < selectedHunt.teamSize && !team.includes(friend)) {
            setTeam([...team, friend]);
        }
    };

    const handleSelectHunt = (hunt) => {
        setSelectedHunt(hunt);
        setTeam([]);
    };

    return (
        <Box p={3}>
            <Typography variant="h4">Custom Hunts</Typography>
            <Grid container spacing={3} mt={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6">Available Hunts</Typography>
                    <List>
                        {hunts.map(hunt => (
                            <ListItem key={hunt.id} button onClick={() => handleSelectHunt(hunt)}>
                                <ListItemText primary={`${hunt.name} (Team Size: ${hunt.teamSize})`} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    {selectedHunt && (
                        <>
                            <Typography variant="h6">Form a Team for {selectedHunt.name}</Typography>
                            <Typography variant="body1">Team Members (Max {selectedHunt.teamSize}):</Typography>
                            <List>
                                {team.map((member, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={member} />
                                    </ListItem>
                                ))}
                            </List>

                            <Typography variant="body1">Add Friends to Team:</Typography>
                            <List>
                                {friends.map((friend, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemText primary={friend} />
                                        <IconButton onClick={() => handleAddToTeam(friend)} disabled={team.length >= selectedHunt.teamSize}>
                                            <AddIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                            <Button variant="contained" disabled={team.length !== selectedHunt.teamSize}>
                                Start Hunt
                            </Button>
                        </>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomHuntPage;
