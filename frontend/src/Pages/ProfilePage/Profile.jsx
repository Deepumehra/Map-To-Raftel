/* eslint-disable react/prop-types */
import BadgeIcon from '@mui/icons-material/Badge';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Drawer,
    Grid,
    IconButton,
    List, ListItem, ListItemText,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import './Profile.css';

const ProfilePage = ({ userData }) => {
    const [user, setUser] = useState({
        name: '',
        phone: '',
        bio: '',
        points: 0,
        globalRank: 0,
        badges: ["Top Solver", "Explorer", "Team Player"],
        activeHunts: ["Treasure Hunt at Museum", "Outdoor Park Adventure"],
        completedHunts: 10,
        isNewUser: true,
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [sidePaneOpen, setSidePaneOpen] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        if (userData) {
            setUser({ ...userData, isNewUser: false });
        }
    }, [userData]);

    useEffect(() => {
        setIsFormValid(!!user.name && !!user.phone);
    }, [user.name, user.phone]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSave = () => {
        console.log("User Data Saved:", user);
        setUser((prevUser) => ({ ...prevUser, isNewUser: false }));
    };

    // Handle Profile Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result);
                setUploadDialogOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const confirmImageUpload = () => {
        setProfileImage(previewImage);
        setUploadDialogOpen(false);
    };

    return (
        <Container sx={{ mt: 3, p: 3 }}>
            {/* Header Section with Avatar and Bio */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={profileImage || "/path/to/default-avatar.jpg"} sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h6">{user.name || "Your Name"}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rank: {user.globalRank} | Points: {user.points}
                        </Typography>
                    </Box>
                    <IconButton component="label" size="small">
                        <PhotoCamera />
                        <input hidden type="file" onChange={handleImageUpload} />
                    </IconButton>
                </Box>
                <Button onClick={() => setSidePaneOpen(true)}>View Hunts & Achievements</Button>
            </Box>

            {/* Bio Section */}
            <Box sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="About Me"
                    name="bio"
                    value={user.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us a little about yourself..."
                />
            </Box>

            {/* Mandatory Fields for New Users */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        required
                        error={!user.name && !isFormValid}
                        helperText={!user.name && !isFormValid ? "Name is required" : ""}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                        error={!user.phone && !isFormValid}
                        helperText={!user.phone && !isFormValid ? "Phone number is required" : ""}
                    />
                </Grid>
            </Grid>

            {/* Statistics and Achievements */}
            <Box display="flex" gap={2} sx={{ mt: 3 }}>
                <Card sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <LeaderboardIcon color="primary" />
                    <Typography variant="h6">Total Hunts</Typography>
                    <Typography variant="h4">{user.completedHunts}</Typography>
                </Card>
                <Card sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <BadgeIcon color="secondary" />
                    <Typography variant="h6">Badges</Typography>
                    <Typography variant="h4">{user.badges.length}</Typography>
                </Card>
            </Box>

            {/* Save Button */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    disabled={!isFormValid}
                >
                    Save Profile
                </Button>
            </Box>

            {/* Image Upload Preview Dialog */}
            <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
                <DialogContent>
                    <Avatar src={previewImage} sx={{ width: 120, height: 120, mx: 'auto', borderRadius: '50%' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
                    <Button onClick={confirmImageUpload} color="primary">Confirm</Button>
                </DialogActions>
            </Dialog>

            {/* Side Drawer for Active Hunts and Achievements */}
            <Drawer anchor="right" open={sidePaneOpen} onClose={() => setSidePaneOpen(false)}>
                <Box width={250} p={2}>
                    <Typography variant="h6">Active Hunts</Typography>
                    <List>
                        {user.activeHunts.map((hunt, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={hunt} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>Achievements</Typography>
                    <List>
                        {user.badges.map((badge, index) => (
                            <ListItem key={index}>
                                <BadgeIcon sx={{ color: '#ff9800', fontSize: 20, mr: 1 }} />
                                <ListItemText primary={badge} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Container>
    );
};

export default ProfilePage;
