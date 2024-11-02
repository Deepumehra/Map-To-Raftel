import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [userID, setUserID] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogin = () => {
        navigate('/login')
    };

    const handleHuntClicked = () => {
        // take user to pre-defined hunt page where he can participate in a hunt
        navigate('/hunts');
        handleCloseNavMenu();
    };

    const handleCreateClicked = () => {
        // take user to the page where he can create a new hunt
        handleCloseNavMenu();
    };

    const handleCustomeClicked = () => {
        // take user to the page where he can participate in a custom hunt
        handleCloseNavMenu();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RAFTEL
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            <MenuItem key={"hunt"} onClick={handleHuntClicked}>
                                <Typography sx={{ textAlign: 'center' }}>Hunt</Typography>
                            </MenuItem>
                            <MenuItem key={"create"} onClick={handleCreateClicked}>
                                <Typography sx={{ textAlign: 'center' }}>Create</Typography>
                            </MenuItem>
                            <MenuItem key={"custom"} onClick={handleCustomeClicked}>
                                <Typography sx={{ textAlign: 'center' }}>Custom</Typography>
                            </MenuItem>

                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        RAFTEL
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            key={"hunt"}
                            onClick={handleHuntClicked}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Hunt
                        </Button>
                        <Button
                            key={"create"}
                            onClick={handleCreateClicked}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Create
                        </Button>
                        <Button
                            key={"custom"}
                            onClick={handleCustomeClicked}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Custom
                        </Button>
                    </Box>
                    {userID != null? (<Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key={Profile} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                            </MenuItem>
                            <MenuItem key={Leaderboard} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>Leaderboard</Typography>
                            </MenuItem>
                            <MenuItem key={Logout} onClick={handleCloseUserMenu}>
                                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
                            
                        </Menu>
                    </Box>) :

                    <Box>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            sx={{
                                textAlign: 'center',
                                display: 'flex',
                                justifyContent: 'center', 
                            }}
                            onClick={handleLogin}
                        >
                            <Typography variant="button" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                                Login
                            </Typography>
                        </Button>
                    </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
