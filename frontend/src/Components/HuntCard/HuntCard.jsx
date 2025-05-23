import React from 'react';
import { Grid, Card, Typography, CardContent, Button} from '@mui/material';

// Hunt Card Component
const HuntCard = ({ hunt, mask, handleCardClicked, color }) => (
    <Grid onClick={() => handleCardClicked(hunt, mask)} item xs={12} sm={6} md={4} lg={3}>
        <Card sx={{ borderRadius: 2, boxShadow: 3, borderLeft: `6px solid ${color}`, height: '100%' }}>
            <CardContent>
            {/* <img src={hunt.image} alt="Clue" style={{ width: 'auto', height: 'auto', maxHeight: '50px', maxWidth: '200px', borderRadius: '4px', marginBottom: 2 }} /> */}
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {hunt.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {hunt.description}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
);

export default HuntCard;