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
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import './Profile.css';

// Validation schema using Yup based on Mongoose schema
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('User Name is required')
        .min(5, 'User Name must be at least 5 characters'),
    phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be a 10-digit number.'),
    bio: Yup.string().optional(),
    points: Yup.number().optional(),
    globalRank: Yup.number().optional(),
    activeHunts: Yup.array()
        .of(Yup.string())
        .optional(),
    badges: Yup.array().of(Yup.string()).optional(),
    image: Yup.string().optional(), // Optional image validation
});

const ProfilePage = ({ userData }) => {
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [sidePaneOpen, setSidePaneOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const jwt = localStorage.getItem('JWT');
    console.log("JWT :", jwt);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            bio: '',
            points: 0,
            globalRank: 0,
            badges: ["Top Solver", "Explorer", "Team Player"],
            activeHunts: ["Treasure Hunt at Museum", "Outdoor Park Adventure"],
            completedHunts: 10,
            image: null, // Include image in initial values
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("User Data Saved:", values);
            // Save the profile image to localStorage
            if (values.image) {
                localStorage.setItem('image', values.image); // Store image in localStorage
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        // Load existing image from localStorage on mount
        const storedImage = localStorage.getItem('image'); 
        if (storedImage) {
            setPreviewImage(storedImage); // Set the preview image to what is in localStorage
            formik.setFieldValue('image', storedImage); // Set the field value for image in Formik
        }
    }, []);

    useEffect(() => {
        if (userData) {
            formik.setValues({ ...userData });
        }
    }, [userData]);

    // Profile Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // Set the preview image
                formik.setFieldValue('image', reader.result); // Set the image in formik
                setUploadDialogOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const confirmImageUpload = () => {
        setUploadDialogOpen(false);
    };

    return (
        <Container sx={{ mt: 3, p: 3 }}>
            {/* Header Section with Avatar and Bio */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar src={previewImage || "/path/to/default-avatar.jpg"} sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h6">{formik.values.name || "Your Name"}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rank: {formik.values.globalRank} | Points: {formik.values.points}
                        </Typography>
                    </Box>
                    <IconButton component="label" size="small">
                        <PhotoCamera />
                        <input hidden type="file" accept="image/*" onChange={handleImageUpload} />
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
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    placeholder="Tell us a little about yourself..."
                />
            </Box>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="User Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        required
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        required
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>
            </Grid>

            {/* Statistics and Achievements */}
            <Box display="flex" gap={2} sx={{ mt: 3 }}>
                <Card sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <LeaderboardIcon color="primary" />
                    <Typography variant="h6">Total Hunts</Typography>
                    <Typography variant="h4">{formik.values.completedHunts}</Typography>
                </Card>
                <Card sx={{ flex: 1, p: 2, textAlign: 'center' }}>
                    <BadgeIcon color="secondary" />
                    <Typography variant="h6">Badges</Typography>
                    <Typography variant="h4">{formik.values.badges.length}</Typography>
                </Card>
            </Box>

            {/* Save Button */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={formik.handleSubmit}
                    disabled={!formik.isValid}
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
                        {formik.values.activeHunts.map((hunt, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={hunt} />
                            </ListItem>
                        ))}
                    </List>
                    <Typography variant="h6" sx={{ mt: 2 }}>Achievements</Typography>
                    <List>
                        {formik.values.badges.map((badge, index) => (
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
