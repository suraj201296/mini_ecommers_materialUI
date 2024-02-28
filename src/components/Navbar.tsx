
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Tab,
  Tabs,
  Divider,
  Badge,
} from '@mui/material';

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../state/hooks';
import { logoutUser } from '../slices/userSlice';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

type Props = {
  onLogout: () => void;
};

const pages = ['home', 'clothes', 'shoes', 'sunglasses', 'makeup','users'];
const settings = ['Profile', 'Wishlist','Logout'];

export default function Navbar({ onLogout }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    onLogout();
  };

  const handleSetting = (event: React.MouseEvent<HTMLElement>) => {
    let choice = event.currentTarget.innerText;
    switch (choice) {
      case 'Logout':
          handleLogout();
        break;
      case 'Profile':
          navigate('/viewProfile');
        break;
      default:
        break;
    }
  };

  // =======================================================================

  // const [activeTab, setActiveTab] = useState();
  return (
    <AppBar position="sticky" sx={{ backgroundColor : 'darkblue'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Big screen logo start */}
          <LocalGroceryStoreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
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
            <Link to={"/"} style={{ color : 'white'}}>MiAz</Link>
          </Typography>
          {/* Big screen logo end */}

          {/* Big screen menu items start */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Button
                key={index}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link style={{ textDecoration : "none" , color : 'white', padding : 2 , textTransform : 'capitalize' }}
                to={page === 'home' ? '/' : `/${page}`}>
                      {page}
                    </Link>
              </Button>
            ))}
          </Box>
          {/* Big screen menu items end */}

          {/* small screen menu items start */}
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <div key={index}>
                  <MenuItem onClick={handleCloseNavMenu} sx={{ width : '180px', marginLeft : '20px'}}>
                    <Typography textAlign="center">
                      <Link  style={{ textDecoration : "none" , color : 'black' , textTransform : 'capitalize'  }} to={page === 'home' ? '/' : `/${page}`}>
                        {page}
                      </Link>
                    </Typography>
                  </MenuItem>
                  {index != (pages.length - 1) && <Divider key={`divider-${index}`}/>}
                </div>
              ))}
            </Menu>
          </Box>
          {/* small screen menu items end */}

          {/* small screen icon and logo start */}
          <LocalGroceryStoreIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
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
            <Link to={"/"} style={{ color : 'white'}}>MiAz</Link>
          </Typography>
          {/* small screen icon and logo end */}

          {/* profile and logout setting button start */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Cart Items">
              <IconButton sx={{ marginRight : '20px'}}>
                <Badge
                  badgeContent={5}
                  color="error"
                  sx={{ position: 'absolute', top: '-4px', right: '0px' }}
                >
                  <ShoppingCartIcon sx={{ color: 'white'}} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/images/suraj.jpeg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px'}}
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
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu} sx={{ width : '100px'}}>
                  <Typography textAlign="center">
                    <span onClick={handleSetting}>{setting}</span>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* profile and logout setting button end */}

        </Toolbar>
      </Container>
    </AppBar>

    // <AppBar position='sticky' sx={{ backgroundColor: 'transparent' }}>
    //   <Toolbar>
    //     <AdbIcon
    //       sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'black' }}
    //     />
    //     <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
    //       {pages.map((page, index) => (
    //         <Tab
    //           component={Link}
    //           to={`/${page}`}
    //           key={index}
    //           label={page}
    //           sx={{
    //             textDecoration: 'none',
    //             ':hover': {
    //               textDecoration: 'underline',
    //               textUnderlineOffset: '18px',
    //               color: 'grey',
    //             },
    //           }}
    //         ></Tab>
    //       ))}
    //     </Tabs>
    //   </Toolbar>
    // </AppBar>
  );
}
