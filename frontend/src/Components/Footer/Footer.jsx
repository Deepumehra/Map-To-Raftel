import React from 'react';
import { Box, Grid, Typography, TextField, Button, Link, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: '#2C2E43', color: '#ffffff', mt: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    
                    {/* Logo and About Section */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>CompanyName</Typography>
                        <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                            Nulla quis lorem ut libero malesuada feugiat.
                        </Typography>
                    </Grid>
                    
                    {/* Quick Links Section */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Quick Links</Typography>
                        <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                            Home
                        </Link>
                        <Link href="/about" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                            About Us
                        </Link>
                        <Link href="/services" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                            Services
                        </Link>
                        <Link href="/contact" color="inherit" underline="hover" sx={{ display: 'block', mb: 1 }}>
                            Contact Us
                        </Link>
                    </Grid>

                    {/* Contact Information Section */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Contact</Typography>
                        <Typography variant="body2">123 Main Street, City, Country</Typography>
                        <Typography variant="body2">Email: info@company.com</Typography>
                        <Typography variant="body2">Phone: +1 234 567 890</Typography>
                    </Grid>

                    {/* Newsletter Subscription Section */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom>Subscribe to our Newsletter</Typography>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <TextField 
                                variant="filled" 
                                label="Enter your email" 
                                size="small" 
                                sx={{
                                    bgcolor: '#ffffff', 
                                    borderRadius: '4px',
                                }} 
                                InputLabelProps={{
                                    sx: { color: 'text.secondary' },
                                }}
                            />
                            <Button variant="contained" color="primary">Subscribe</Button>
                        </Box>
                    </Grid>
                </Grid>
                
                {/* Social Media Icons and Copyright */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <FacebookIcon fontSize="large" />
                        <TwitterIcon fontSize="large" />
                        <InstagramIcon fontSize="large" />
                        <LinkedInIcon fontSize="large" />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} CompanyName. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
