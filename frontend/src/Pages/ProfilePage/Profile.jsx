/* eslint-disable react/prop-types */
import BadgeIcon from '@mui/icons-material/Badge';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import {
    Avatar,
    Box,
    Button,
    Card,
    Container,
    Drawer,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import A1 from '../../Components/Avatars/A1.jpeg';
import A10 from '../../Components/Avatars/A10.jpeg';
import A2 from '../../Components/Avatars/A2.jpeg';
import A3 from '../../Components/Avatars/A3.jpeg';
import A4 from '../../Components/Avatars/A4.jpeg';
import A5 from '../../Components/Avatars/A5.jpeg';
import A6 from '../../Components/Avatars/A6.jpeg';
import A7 from '../../Components/Avatars/A7.jpeg';
import A8 from '../../Components/Avatars/A8.jpeg';
import A9 from '../../Components/Avatars/A9.jpeg';
import AvatarSelectDialog from '../../Components/ProfileAvatarDialogue/ProfileAvatarDialogue';
import { saveProfile } from '../../State/Authentication/Action';
import './Profile.css';
const avatars = [
    A1, A2, A3, A4, A5, A6, A7, A8, A9, A10
];

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
    avatarIndex: Yup.number().optional(),
});

const ProfilePage = ({ userData }) => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [sidePaneOpen, setSidePaneOpen] = useState(false);
    const [openAvatarDialogue, setOpenAvatarDialogue] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(1);

    const handleSelectAvatar = (index) => {
        setSelectedAvatar(index);
        setOpenAvatarDialogue(false);
    }
    // Formik setup
    const formik = useFormik({
        initialValues: {
            username: '',
            phone: '',
            bio: '',
            points: 0,
            globalRank: 0,
            badges: ["Top Solver", "Explorer", "Team Player"],
            activeHunts: [],
            completedHunts:[],
            numberOfCompletedHunts: 10,
            avatarIndex: 0,
        },
        validationSchema,
        onSubmit: (values) => {
            console.log("User Data Saved:", values);
            dispatch(saveProfile(values));
            navigate('/');
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        if (userData) {
            formik.setValues({ ...userData });
        }
    }, [userData]);

    return (
        <Container sx={{ mt: 3, p: 3 }}>
            {/* Header Section with Avatar and Bio */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" gap={2}>
                    <Avatar onClick={()=>{setOpenAvatarDialogue(true)}} src={avatars[selectedAvatar-1]} sx={{ width: 80, height: 80 }} />
                    <Box>
                        <Typography variant="h6">{formik.values.name || "Your Name"}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Rank: {formik.values.globalRank} | Points: {formik.values.points}
                        </Typography>
                    </Box>
                </Box>
                <Button onClick={() => setSidePaneOpen(true)}>View Hunts & Achievements</Button>
            </Box>
            {/* Dialogue for avatar selection */}
            <AvatarSelectDialog open={openAvatarDialogue} onClose={()=> {setOpenAvatarDialogue(false)}} onSelect={handleSelectAvatar} />
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
