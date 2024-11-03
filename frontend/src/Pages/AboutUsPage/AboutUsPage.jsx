import React from "react";
import {
    Box,
    Typography,
    Grid,
    Container,
    Card,
    CardContent,
    Button,
    Avatar,
    Divider,
    Link,
} from "@mui/material";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const AboutUs = () => {
    const teamMembers = [
        {
            name: "Jonathan Warner",
            title: "CEO",
            img: "https://via.placeholder.com/80",
        },
        {
            name: "Tammy Johnson",
            title: "CTO",
            img: "https://via.placeholder.com/80",
        },
        {
            name: "David Hackett",
            title: "COO",
            img: "https://via.placeholder.com/80",
        },
        {
            name: "Pamela Wagner",
            title: "CFO",
            img: "https://via.placeholder.com/80",
        },
    ];

    const jobOpenings = [
        { title: "Product Designer", locations: "New York, Dallas, Los Angeles" },
        { title: "Account Director", locations: "Hong Kong" },
        { title: "DMP Data Engineer", locations: "San Francisco" },
        { title: "Account Manager", locations: "Hong Kong" },
    ];

    return (
        <Box>
            {/* Header Section */}
            <Header/>
            {/* Hero Section */}
            <Box sx={{ py: 6, textAlign: "center", bgcolor: "grey.100" }}>
                <Container>
                    <Typography variant="h3" gutterBottom>
                        About Us
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        maxWidth="sm"
                        mx="auto"
                    >
                        Welcome to Treasure Hunt! Discover the thrill of finding hidden
                        clues across exciting locations.
                    </Typography>
                </Container>
            </Box>

            {/* Mission Section */}
            <Box sx={{ py: 6 }}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" color="textSecondary" maxWidth="md">
                        Our mission is to create an engaging and interactive way for people
                        to explore and learn about new places.
                    </Typography>
                    <Grid container spacing={2} mt={4}>
                        <Grid item xs={12} sm={4}>
                            <Box bgcolor="grey.200" height="150px" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box bgcolor="grey.200" height="150px" />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box bgcolor="grey.200" height="150px" />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Meet Our Team Section */}
            <Box sx={{ py: 6, bgcolor: "grey.100" }}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        Meet Our Leaders
                    </Typography>
                    <Typography variant="body1" color="textSecondary" maxWidth="md">
                        Our leaders inspire and guide us to achieve great things in treasure
                        hunting.
                    </Typography>
                    <Grid container spacing={4} justifyContent="center" mt={4}>
                        {teamMembers.map((member, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card sx={{ textAlign: "center", p: 2 }}>
                                    <Avatar
                                        src={member.img}
                                        alt={member.name}
                                        sx={{ width: 80, height: 80, mx: "auto", mb: 2 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h6">{member.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            {member.title}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Box textAlign="center" mt={4}>
                        <Button variant="outlined">View the team</Button>
                    </Box>
                </Container>
            </Box>

            {/* Job Openings Section */}
            <Box sx={{ py: 6 }}>
                <Container>
                    <Typography variant="h4" gutterBottom>
                        We’re Hiring!
                    </Typography>
                    <Typography variant="body1" color="textSecondary" maxWidth="md">
                        Join our team and help us create unforgettable experiences.
                    </Typography>
                    <Grid container spacing={3} mt={4}>
                        {jobOpenings.map((job, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Card
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h6">{job.title}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Locations: {job.locations}
                                        </Typography>
                                    </Box>
                                    <Button variant="contained">Apply</Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Footer Section */}
            <Footer/>
        </Box>
    );
};

export default AboutUs;
