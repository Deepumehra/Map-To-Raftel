import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent } from '@mui/material';

const MainPageBody = () => {
    return (
        <Box sx={{ backgroundColor: '#0d0d1e', color: 'white', paddingBottom: 8 }}>
            {/* Hero Section */}
            <Box sx={{ textAlign: 'center', paddingY: 6, position: 'relative' }}>
                <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                    A Long Way To Go
                </Typography>
                <Typography variant="subtitle1" sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}>
                    Join a global learning community on a treasure hunt to solve the greatest mysteries at landmark locations!
                </Typography>
                <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                    Join the Hunt
                </Button>
                <Button variant="outlined" color="primary">
                    Explore Clues
                </Button>
            </Box>

            {/* Features Section */}
            <Box sx={{ textAlign: 'center', paddingY: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Key Features
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {[['Exclusive Clues', 'Listen carefully to the wind whisper unscramble the letters to find the treasures litter'], ['Teams & Collaboration', 'Each Member Holds a Piece Assemble The Puzzle To Proceed'], ['Real-Time Updates', 'Update!!! New Obstacles To Overcome Alert!!! Time-Sensitive Challenge Ahead'], ['Global Leaderboard', 'Rankings Refreshed              Leaderboard Shake-Up         Treasure Hunt Standings']].map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ backgroundColor: '#1b1b2f', color: 'white', height: '100%' }}>
                                <CardContent>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {feature[0]}
                                    </Typography>
                                    <Typography variant="body2">
                                        {feature[1]}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* About Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingY: 6 }}>
                <Box sx={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                        About Us
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Creating a lifelong learning community through challenging treasure hunts that combine fun with education.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mr: 2 }}>
                        Learn More
                    </Button>
                    <Button variant="outlined" color="primary">
                        Contact Us
                    </Button>
                </Box>
            </Box>

            {/* Categories Section */}
            <Box sx={{ textAlign: 'center', paddingY: 6 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
                    Popular Treasure Hunts
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {['Ancient Landmarks', 'Mystery Locations', 'Historic Sites', 'Famous Trails'].map((category, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{ backgroundColor: '#1b1b2f', color: 'white' }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                                        {category}
                                    </Typography>
                                    <Typography variant="body2">
                                        Join us to explore famous {category.toLowerCase()} with your team.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default MainPageBody;
