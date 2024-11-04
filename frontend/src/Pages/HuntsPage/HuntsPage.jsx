/* 
    This is the page which shows the app hunts, its divided into four sections: -
        * Completed Hunts
        * Untouched Hunts
        * Active Hunts (Partially Completed Hunts)
        * Daily Hunts
    The hunts this pages shows can only be created by the administrator.
    Clues solved from this section are only considered for leaderboard.
*/

// src/components/HuntPage.js

import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Grid, IconButton, TextField, Typography, Container } from '@mui/material';
import React, {useState} from 'react';
import bullet from '../../Components/Assists/bullet.png';
import roger from '../../Components/Assists/roger.jpeg';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import HuntCard from '../../Components/HuntCard/HuntCard';
import HuntDialog from '../../Components/HuntDialogue/HuntDialogue';
// import { useSelector } from 'react-redux';

const HuntPage = () => {
    // Mock data to display if Redux states are null or empty
    const exampleData = [
        { id: 0, image: bullet, title: "Haunted Manor Hunt", description: "Explore the mysterious manor and uncover its secrets." },
        { id: 1, image: roger, title: "Lost City Adventure", description: "Embark on a journey to find the hidden treasures of the ancient city." },
        { id: 2, title: "Forest Quest", description: "Navigate through the enchanted forest and solve the puzzles along the way." },
        { id: 3, title: "Desert Mirage", description: "Find your way through the desert and discover the oasis of knowledge." },
        { id: 4, title: "hello", description: "Find your way through the"}
    ];

    // Use the actual Redux state if available, otherwise fall back to example data
    // const completedHunts = useSelector(state => state.hunts.completedHunts || exampleData);
    // const untouchedHunts = useSelector(state => state.hunts.untouchedHunts || exampleData);
    // const activeHunts = useSelector(state => state.hunts.activeHunts || exampleData);
    // const dailyHunts = useSelector(state => state.hunts.dailyHunts || exampleData);

    const completedHunts = exampleData;
    const activeHunts = exampleData;
    const dailyHunts = exampleData;
    const untouchedHunts = exampleData;

    const [dialogueOpen, setDialogueOpen] = useState(false);
    const [currentHuntMask, setCurrentHuntMask] = useState(null);
    const [currentHuntIndex, setCurrentHuntIndex] = useState(null);
    const [currentHunt, setCurrentHunt] = useState(null);

    const handleCardClicked = (hunt, mask) => {
        setCurrentHuntIndex(hunt.id);
        setCurrentHuntMask(mask);
        if(currentHuntMask === "Complete") {
            setCurrentHunt(completedHunts[currentHuntIndex]);
        } else if(currentHuntMask === "Active") {
            setCurrentHunt(activeHunts[currentHuntIndex]);
        } else if(currentHuntMask === "Daily") {
            setCurrentHunt(dailyHunts[currentHuntIndex]);
        } else if(currentHuntMask === "Untouched") {
            setCurrentHunt(untouchedHunts[currentHuntIndex]);
        }
        setDialogueOpen(true);
    };

    const handleDialogueClose = () => {
        setCurrentHuntIndex(null);
        setCurrentHuntMask(null);
        setCurrentHunt(null);
        setDialogueOpen(false);
    };

    // Inside your handleNextClicked and handlePreviousClicked functions, update the currentHunt immediately after updating the currentHuntIndex

    const handleNextClicked = () => {
        let newIndex;
        if (currentHuntMask === "Complete") {
            newIndex = (currentHuntIndex + 1) % completedHunts.length;
        } else if (currentHuntMask === "Active") {
            newIndex = (currentHuntIndex + 1) % activeHunts.length;
        } else if (currentHuntMask === "Daily") {
            newIndex = (currentHuntIndex + 1) % dailyHunts.length;
        } else if (currentHuntMask === "Untouched") {
            newIndex = (currentHuntIndex + 1) % untouchedHunts.length;
        }

        setCurrentHuntIndex(newIndex);
        setCurrentHunt((currentHuntMask === "Complete") ? completedHunts[newIndex] :
                    (currentHuntMask === "Active") ? activeHunts[newIndex] :
                    (currentHuntMask === "Daily") ? dailyHunts[newIndex] :
                    untouchedHunts[newIndex]);
    };

    const handlePreviousClicked = () => {
        let newIndex;
        if (currentHuntMask === "Complete") {
            newIndex = (currentHuntIndex - 1 + completedHunts.length) % completedHunts.length;
        } else if (currentHuntMask === "Active") {
            newIndex = (currentHuntIndex - 1 + activeHunts.length) % activeHunts.length;
        } else if (currentHuntMask === "Daily") {
            newIndex = (currentHuntIndex - 1 + dailyHunts.length) % dailyHunts.length;
        } else if (currentHuntMask === "Untouched") {
            newIndex = (currentHuntIndex - 1 + untouchedHunts.length) % untouchedHunts.length;
        }

        setCurrentHuntIndex(newIndex);
        setCurrentHunt((currentHuntMask === "Complete") ? completedHunts[newIndex] :
                    (currentHuntMask === "Active") ? activeHunts[newIndex] :
                    (currentHuntMask === "Daily") ? dailyHunts[newIndex] :
                    untouchedHunts[newIndex]);
    };


    return (
        <div>
            <Header/>
            <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Available Hunts
                </Typography>

                {/* Optional Search/Filter Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
                    <TextField
                        placeholder="Search hunts..."
                        variant="outlined"
                        size="small"
                        sx={{ width: { xs: '100%', sm: '60%', md: '40%' }, mr: 1 }}
                    />
                    <IconButton color="primary">
                        <SearchIcon />
                    </IconButton>
                </Box>

                {/* Sections */}
                <Grid container spacing={3}>
                    {/* Completed Hunts */}
                    <Grid item xs={12}>
                        <SectionHeader title="Completed Hunts" />
                        <Grid container spacing={2}>
                            {completedHunts.map((hunt) => (
                                <HuntCard key={hunt.id} mask='Complete' handleCardClicked={handleCardClicked} hunt={hunt} color="success" />
                            ))}
                        </Grid>
                    </Grid>

                    {/* Untouched Hunts */}
                    <Grid item xs={12}>
                        <SectionHeader title="Untouched Hunts" />
                        <Grid container spacing={2}>
                            {untouchedHunts.map((hunt) => (
                                <HuntCard key={hunt.id} mask='Untouched' handleCardClicked={handleCardClicked} hunt={hunt} color="info" />
                            ))}
                        </Grid>
                    </Grid>

                    {/* Active Hunts */}
                    <Grid item xs={12}>
                        <SectionHeader title="Active Hunts" />
                        <Grid container spacing={2}>
                            {activeHunts.map((hunt) => (
                                <HuntCard key={hunt.id} mask='Active' handleCardClicked={handleCardClicked} hunt={hunt} color="warning" />
                            ))}
                        </Grid>
                    </Grid>

                    {/* Daily Hunts */}
                    <Grid item xs={12}>
                        <SectionHeader title="Daily Hunts" />
                        <Grid container spacing={2}>
                            {dailyHunts.map((hunt) => (
                                <HuntCard key={hunt.id} mask='Daily' handleCardClicked={handleCardClicked} hunt={hunt} color="primary" />
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                {/* HuntDialog */}
                {dialogueOpen && currentHunt? (
                    <Container sx={{display: {xs: 'none', md: 'flex'}}}>
                        <HuntDialog
                            mask={currentHuntMask}
                            open={dialogueOpen}
                            onClose={handleDialogueClose}
                            hunt={currentHunt}
                            onPrevious={handlePreviousClicked}
                            onNext={handleNextClicked}
                        />
                    </Container>
                ) : (<div></div>)}
            </Box>
            <Footer/>
        </div>
    );
};

// Component to display section headers
const SectionHeader = ({ title }) => (
    <>
        <Typography variant="h5" sx={{ mt: 3, mb: 1, fontWeight: 'bold', color: 'text.primary' }}>
            {title}
        </Typography>
        <Divider />
    </>
);

export default HuntPage;
